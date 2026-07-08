import fs from 'fs'
import path from 'path'
import PDFDocument from 'pdfkit'
import { checklistPhases, checklistTitle, checklistSubtitle } from '../lib/checklist-data'

const INK = '#0a0806'
const COFFEE = '#8B5230'
const COFFEE_DARK = '#4b2e1e'
const TEXT_DARK = '#1a1a1a'
const TEXT_MUTED = '#5a5a5a'

const outputPath = path.join(process.cwd(), 'public', 'notimemover-moving-checklist.pdf')

const doc = new PDFDocument({ size: 'LETTER', margins: { top: 60, bottom: 60, left: 56, right: 56 } })
doc.pipe(fs.createWriteStream(outputPath))

const pageWidth = doc.page.width - 56 * 2

// Cover
doc.rect(0, 0, doc.page.width, doc.page.height).fill(INK)
doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(11)
  .text('NoTime', 56, 70, { continued: true }).fillColor(COFFEE).text('Mover')

doc.fillColor(COFFEE).font('Helvetica-Bold').fontSize(11).text('FREE MOVING CHECKLIST', 56, 220, { characterSpacing: 2 })
doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(34).text(checklistTitle, 56, 245, { width: pageWidth })
doc.fillColor('rgba(255,255,255,0.6)').font('Helvetica').fontSize(12).text(checklistSubtitle, 56, doc.y + 18, { width: pageWidth * 0.85, lineGap: 4 })

doc.fillColor('rgba(255,255,255,0.35)').font('Helvetica').fontSize(9)
  .text('notimemover.com', 56, doc.page.height - 110, { lineBreak: false })
doc.fillColor('rgba(255,255,255,0.35)').font('Helvetica').fontSize(9)
  .text('Fully insured · Boston, MA · Set your budget, we work around it', 56, doc.page.height - 96, { lineBreak: false })

// Content pages
doc.addPage()

function ensureSpace(height: number) {
  if (doc.y + height > doc.page.height - 60) {
    doc.addPage()
  }
}

checklistPhases.forEach((phase) => {
  ensureSpace(70)
  doc.moveDown(0.5)
  doc.fillColor(COFFEE_DARK).font('Helvetica-Bold').fontSize(9).text(phase.phase.toUpperCase(), { characterSpacing: 1.5 })
  doc.moveTo(56, doc.y + 4).lineTo(56 + pageWidth, doc.y + 4).strokeColor('#e5ddd5').lineWidth(1).stroke()
  doc.moveDown(0.6)

  phase.items.forEach((item) => {
    ensureSpace(item.detail ? 46 : 28)
    const boxY = doc.y + 2
    doc.rect(56, boxY, 11, 11).lineWidth(1).strokeColor(COFFEE).stroke()

    doc.fillColor(TEXT_DARK).font('Helvetica-Bold').fontSize(11)
      .text(item.task, 76, boxY - 1, { width: pageWidth - 20 })

    if (item.detail) {
      doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(9.5)
        .text(item.detail, 76, doc.y + 2, { width: pageWidth - 20, lineGap: 2 })
    }
    doc.moveDown(0.6)
  })
  doc.moveDown(0.4)
})

// Footer CTA page element on last page
ensureSpace(100)
doc.moveDown(1)
const ctaY = doc.y
doc.rect(56, ctaY, pageWidth, 70).fill('#f4efe9')
doc.fillColor(COFFEE_DARK).font('Helvetica-Bold').fontSize(12).text('Ready to book your move?', 72, ctaY + 16, { width: pageWidth - 32 })
doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(10)
  .text('Set your budget at notimemover.com — fully insured, same-day response, no surprise fees.', 72, ctaY + 38, { width: pageWidth - 32 })

doc.end()

console.log(`Generated ${outputPath}`)
