import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'NoTimeMover — Move Anywhere. No Surprise Quotes.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#050505',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 96px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            left: '-100px',
            top: '-100px',
            background: 'radial-gradient(circle, rgba(107,58,31,0.35) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            right: '-200px',
            bottom: '-200px',
            background: 'radial-gradient(circle, rgba(75,46,30,0.25) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '36px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#8B5230',
            }}
          />
          <span
            style={{
              fontSize: '13px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'sans-serif',
              fontWeight: 500,
            }}
          >
            Massachusetts Moving
          </span>
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontSize: '86px',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: '#ffffff',
            fontFamily: 'sans-serif',
            marginBottom: '28px',
          }}
        >
          NoTimeMover
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '32px',
            color: 'rgba(255,255,255,0.45)',
            fontFamily: 'sans-serif',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
          }}
        >
          Move Anywhere.{' '}
          <span style={{ color: '#8B5230' }}>No Surprise Quotes.</span>
        </div>

        {/* Bottom pill */}
        <div
          style={{
            position: 'absolute',
            bottom: '72px',
            left: '96px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '999px',
            padding: '12px 24px',
          }}
        >
          <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif' }}>
            notimemover.com
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
