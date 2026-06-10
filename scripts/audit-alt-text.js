#!/usr/bin/env node
/**
 * Alt-text audit for notimemover
 *
 * Scans all .tsx files in components/ and app/ for <img> and <Image> tags.
 * Reports any that are missing an alt attribute or have an empty alt string.
 *
 * Run manually:    npm run audit:alt-text
 * Runs on build:   npm run prebuild (warns only, never blocks the deploy)
 *
 * How to use when adding a new image:
 *   1. Add your <Image> or <img> tag with a descriptive alt attribute
 *   2. Run `npm run audit:alt-text` — it should pass clean
 *   3. If it flags something, fix the alt before committing
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const SEARCH_DIRS = ['components', 'app']

// Find all .tsx files recursively, skip node_modules and .next
function findTsxFiles(dir, found = []) {
  if (!fs.existsSync(dir)) return found
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name.startsWith('.')) continue
      findTsxFiles(full, found)
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      found.push(full)
    }
  }
  return found
}

// Given a block of text starting at an opening tag, extract the full tag (handles multi-line)
function extractTagBlock(lines, startLine, startCol) {
  let block = ''
  let depth = 0
  let inString = null
  let i = startLine
  let j = startCol

  while (i < lines.length) {
    const line = lines[i]
    while (j < line.length) {
      const ch = line[j]
      if (inString) {
        if (ch === inString) inString = null
      } else {
        if (ch === '"' || ch === "'") { inString = ch }
        else if (ch === '{') { depth++ }
        else if (ch === '}') { depth-- }
        else if (ch === '>' && depth === 0) {
          block += line.slice(startCol <= i ? (i === startLine ? startCol : 0) : 0, j + 1)
          return block
        }
      }
      block += ch
      j++
    }
    block += '\n'
    i++
    j = 0
  }
  return block
}

const issues = []

for (const dir of SEARCH_DIRS) {
  const files = findTsxFiles(path.join(ROOT, dir))

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8')
    const lines = content.split('\n')
    const rel = path.relative(ROOT, file)

    lines.forEach((line, idx) => {
      const lineNum = idx + 1

      // Match opening <img or <Image tags (case-sensitive for Image, insensitive for img)
      const imgMatch = /<img\s/i.test(line)
      const imageMatch = /<Image\s/.test(line)

      if (!imgMatch && !imageMatch) return

      const tag = imgMatch ? 'img' : 'Image'

      // Gather the tag block (may be multi-line)
      const tagStart = line.search(imgMatch ? /<img\s/i : /<Image\s/)
      const block = extractTagBlock(lines, idx, tagStart)

      const hasAlt = /\balt\s*=/.test(block)
      const emptyAlt = /\balt\s*=\s*(?:""|''|\{\s*(?:""|''|``)\s*\})/.test(block)

      if (!hasAlt) {
        issues.push({ file: rel, line: lineNum, tag, issue: 'missing alt attribute' })
      } else if (emptyAlt) {
        // Empty alt is valid for purely decorative images — flag as a warning to verify intent
        issues.push({ file: rel, line: lineNum, tag, issue: 'empty alt="" — OK only if decorative, verify intent' })
      }
    })
  }
}

const warnOnly = process.env.ALT_AUDIT_WARN_ONLY === '1'

if (issues.length === 0) {
  console.log('\n  Alt text audit passed — all images have alt attributes.\n')
  process.exit(0)
}

console.log(`\n  Alt text audit — ${issues.length} issue(s) found:\n`)
for (const issue of issues) {
  const prefix = issue.issue.includes('empty') ? '  ⚠' : '  ✗'
  console.log(`${prefix}  ${issue.file}:${issue.line}  [${issue.tag}]  ${issue.issue}`)
}
console.log()

if (warnOnly) {
  console.log('  (running in warn-only mode — build continues)\n')
  process.exit(0)
}

process.exit(1)
