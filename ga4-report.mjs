import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROPERTY_ID = '541211388'

const client = new BetaAnalyticsDataClient({
  keyFilename: resolve(__dirname, 'ga4-service-account.json'),
})

const DAYS = process.argv[2] ? parseInt(process.argv[2]) : 28

function bar(n, max, width = 18) {
  if (!max) return '░'.repeat(width)
  const filled = Math.round((n / max) * width)
  return '█'.repeat(filled) + '░'.repeat(width - filled)
}

function pct(n, denom) {
  if (!denom) return '  —  '
  return ((n / denom) * 100).toFixed(1).padStart(5) + '%'
}

async function query(params) {
  try {
    const [res] = await client.runReport({ property: `properties/${PROPERTY_ID}`, ...params })
    return res.rows ?? []
  } catch {
    return []
  }
}

async function run() {
  const dateRange = { startDate: `${DAYS}daysAgo`, endDate: 'today' }

  // ── All events ────────────────────────────────────────────────────────────
  const eventRows = await query({
    dateRanges: [dateRange],
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
  })

  const e = {}
  for (const row of eventRows) {
    e[row.dimensionValues[0].value] = {
      count: parseInt(row.metricValues[0].value),
      users: parseInt(row.metricValues[1].value),
    }
  }

  // ── step_viewed by step (NEW — shows step entry, not just completion) ────
  const stepViewedRows = await query({
    dateRanges: [dateRange],
    dimensions: [{ name: 'customEvent:step' }],
    metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
    dimensionFilter: {
      filter: { fieldName: 'eventName', stringFilter: { value: 'step_viewed' } },
    },
    orderBys: [{ dimension: { dimensionName: 'customEvent:step' } }],
  })

  const stepViewed = {}
  for (const row of stepViewedRows) {
    const s = row.dimensionValues[0].value
    stepViewed[s] = { count: parseInt(row.metricValues[0].value), users: parseInt(row.metricValues[1].value) }
  }

  // ── booking_step by step (fires on COMPLETION) ───────────────────────────
  const stepRows = await query({
    dateRanges: [dateRange],
    dimensions: [{ name: 'customEvent:step' }],
    metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
    dimensionFilter: {
      filter: { fieldName: 'eventName', stringFilter: { value: 'booking_step' } },
    },
    orderBys: [{ dimension: { dimensionName: 'customEvent:step' } }],
  })

  const steps = {}
  for (const row of stepRows) {
    const s = row.dimensionValues[0].value
    steps[s] = { count: parseInt(row.metricValues[0].value), users: parseInt(row.metricValues[1].value) }
  }

  // ── quote_abandoned by step ───────────────────────────────────────────────
  const abandonRows = await query({
    dateRanges: [dateRange],
    dimensions: [{ name: 'customEvent:step' }],
    metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
    dimensionFilter: {
      filter: { fieldName: 'eventName', stringFilter: { value: 'quote_abandoned' } },
    },
    orderBys: [{ dimension: { dimensionName: 'customEvent:step' } }],
  })

  const abandoned = {}
  for (const row of abandonRows) {
    const s = row.dimensionValues[0].value
    abandoned[s] = { count: parseInt(row.metricValues[0].value), users: parseInt(row.metricValues[1].value) }
  }

  // ── tier_selected by tier (NEW) ───────────────────────────────────────────
  const tierRows = await query({
    dateRanges: [dateRange],
    dimensions: [{ name: 'customEvent:tier' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: { fieldName: 'eventName', stringFilter: { value: 'tier_selected' } },
    },
  })

  const tiers = {}
  for (const row of tierRows) {
    tiers[row.dimensionValues[0].value] = parseInt(row.metricValues[0].value)
  }

  // ── location_selected split ───────────────────────────────────────────────
  const locationRows = await query({
    dateRanges: [dateRange],
    dimensions: [{ name: 'customEvent:value' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: { fieldName: 'eventName', stringFilter: { value: 'location_selected' } },
    },
  })

  const locations = {}
  for (const row of locationRows) {
    locations[row.dimensionValues[0].value] = parseInt(row.metricValues[0].value)
  }

  // ── Traffic sources ───────────────────────────────────────────────────────
  const trafficRows = await query({
    dateRanges: [dateRange],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 8,
  })

  // ── Top pages ─────────────────────────────────────────────────────────────
  const pageRows = await query({
    dateRanges: [dateRange],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 8,
  })

  // ── Print ─────────────────────────────────────────────────────────────────
  const visitors       = e['page_view']?.users      ?? 0
  const formStarts     = e['form_start']?.users     ?? 0
  const addrStarted    = e['address_started']?.users ?? 0
  const priceSeen      = e['price_seen']?.users     ?? 0
  const submitted      = e['quote_submitted']?.users ?? 0
  const oosSubmitted   = e['oos_submitted']?.users  ?? 0

  console.log(`\n${'═'.repeat(60)}`)
  console.log(`  NoTimeMover · GA4 Report · Last ${DAYS} days`)
  console.log(`${'═'.repeat(60)}\n`)

  // Funnel — step_viewed gives us TRUE entry counts per step
  const sv1 = stepViewed['1']?.users ?? formStarts
  const sv2 = stepViewed['2']?.users ?? 0
  const sv3 = stepViewed['3']?.users ?? 0
  const sv4 = stepViewed['4']?.users ?? 0
  const sv5 = stepViewed['5']?.users ?? 0

  console.log('CONVERSION FUNNEL (step_viewed = user ENTERED step)\n')
  const funnel = [
    ['Visitors',            visitors,     visitors],
    ['Opened form',         formStarts,   visitors],
    ['  Started typing',    addrStarted,  formStarts],
    ['  Viewed step 1',     sv1,          formStarts],
    ['  Viewed step 2',     sv2,          sv1 || formStarts],
    ['  Viewed step 3',     sv3,          sv2 || sv1 || formStarts],
    ['  Viewed step 4',     sv4,          sv3 || sv2 || formStarts],
    ['  Saw pricing',       priceSeen,    sv4 || formStarts],
    ['  Viewed step 5',     sv5,          sv4 || formStarts],
    ['Quote submitted',     submitted,    formStarts],
    ['OOS submitted',       oosSubmitted, formStarts],
  ]
  for (const [label, n, denom] of funnel) {
    console.log(`  ${label.padEnd(24)} ${String(n).padStart(4)}  ${bar(n, visitors)}  ${pct(n, denom)}`)
  }

  // Drop-off (step_viewed entries vs completions)
  if (Object.keys(stepViewed).length > 0 || Object.keys(steps).length > 0) {
    console.log('\nSTEP ENGAGEMENT (viewed → completed)\n')
    for (let s = 1; s <= 5; s++) {
      const viewed    = stepViewed[String(s)]?.users ?? 0
      const completed = steps[String(s + 1)]?.users ?? 0
      const label = `Step ${s}`
      const dropPct = viewed ? (((viewed - completed) / viewed) * 100).toFixed(0) + '% left' : '—'
      console.log(`  ${label.padEnd(10)} viewed: ${String(viewed).padStart(4)}  completed: ${String(completed).padStart(4)}  drop: ${dropPct}`)
    }
  }

  // Tier selection
  if (Object.keys(tiers).length > 0) {
    console.log('\nTIER SELECTION (step 4)\n')
    const tierTotal = Object.values(tiers).reduce((a, b) => a + b, 0)
    const tierMap = { yourPrice: 'Flexible', premium: 'Priority', save: 'Save' }
    for (const [key, n] of Object.entries(tiers)) {
      const label = (tierMap[key] || key).padEnd(12)
      console.log(`  ${label} ${String(n).padStart(4)}  ${bar(n, tierTotal)}  ${pct(n, tierTotal)}`)
    }
  }

  // Drop-off by step
  console.log('\nABANDON BY STEP (quote_abandoned)\n')
  if (Object.keys(abandoned).length === 0) {
    console.log('  No data yet — needs traffic after deploy.')
  } else {
    const maxAb = Math.max(...Object.values(abandoned).map(v => v.users), 1)
    for (const [s, v] of Object.entries(abandoned).sort()) {
      const label = `Abandoned step ${s}`
      console.log(`  ${label.padEnd(20)} ${String(v.users).padStart(4)}  ${bar(v.users, maxAb)}`)
    }
  }

  // Location split
  if (Object.keys(locations).length > 0) {
    console.log('\nLOCATION SPLIT (PreStep)\n')
    const locTotal = Object.values(locations).reduce((a, b) => a + b, 0)
    for (const [loc, n] of Object.entries(locations)) {
      const label = loc === 'instate' ? 'Within MA' : 'Out of state'
      console.log(`  ${label.padEnd(20)} ${String(n).padStart(4)}  ${bar(n, locTotal)}  ${pct(n, locTotal)}`)
    }
  }

  // Traffic sources
  console.log('\nTRAFFIC SOURCES\n')
  for (const row of trafficRows) {
    const ch = row.dimensionValues[0].value.padEnd(24)
    const s  = row.metricValues[0].value.padStart(5)
    const u  = row.metricValues[1].value.padStart(5)
    console.log(`  ${ch} ${s} sessions  ${u} users`)
  }

  // Top pages
  console.log('\nTOP PAGES\n')
  for (const row of pageRows) {
    const path   = row.dimensionValues[0].value.slice(0, 38).padEnd(40)
    const views  = row.metricValues[0].value.padStart(5)
    console.log(`  ${path} ${views} views`)
  }

  // Raw event counts
  console.log('\nALL EVENTS\n')
  for (const [name, v] of Object.entries(e)) {
    console.log(`  ${name.padEnd(28)} ${String(v.count).padStart(5)} events  ${String(v.users).padStart(4)} users`)
  }

  // GA4 setup checklist
  console.log('\nGA4 SETUP CHECKLIST\n')
  console.log('  Register these as Custom Dimensions in GA4 Admin → Custom definitions:')
  console.log('  ✦ step        (event param — for step_viewed, quote_abandoned, booking_step)')
  console.log('  ✦ tier        (event param — for tier_selected)')
  console.log('  ✦ size        (event param — for quote_submitted, price_seen)')
  console.log('  ✦ final_price (event param — for quote_submitted)')
  console.log('  ✦ value       (event param — for location_selected)')
  console.log('\n  Mark as Key Events in GA4 Admin → Events:')
  console.log('  ✦ quote_submitted  ✦ oos_submitted')

  console.log(`\n${'═'.repeat(60)}\n`)
}

run().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
