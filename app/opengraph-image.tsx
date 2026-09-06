import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Organica — Clean Eating, Delivered Fresh in Guwahati';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#141412',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative Top Accent Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '12px',
            backgroundColor: '#2E5A36',
          }}
        />

        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              backgroundColor: '#2E5A36',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F2B705',
              fontSize: '32px',
              fontWeight: 900,
            }}
          >
            O
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '36px',
                fontWeight: 900,
                letterSpacing: '0.15em',
                color: '#FAF8F3',
                textTransform: 'uppercase',
              }}
            >
              Organica
            </span>
            <span
              style={{
                fontSize: '14px',
                letterSpacing: '0.25em',
                color: '#A6A295',
                textTransform: 'uppercase',
              }}
            >
              Guwahati • Beltola Tiniali
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
          <div
            style={{
              color: '#F2B705',
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            100% Organic • Zero Seed-Oils
          </div>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 900,
              color: '#FAF8F3',
              lineHeight: 1.15,
            }}
          >
            Mindful Clean Eating, Delivered Fresh.
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#D4CFC4',
              lineHeight: 1.4,
            }}
          >
            Chef-crafted harvest bowls, verified macro profiles, cooked strictly in cold-pressed virgin oils.
          </div>
        </div>

        {/* Footer Badges */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: '#242420',
              padding: '12px 24px',
              borderRadius: '9999px',
              color: '#FAF8F3',
              fontSize: '16px',
              fontWeight: 600,
              border: '1px solid #3E3D36',
            }}
          >
            ⚡ Accurate Macros
          </div>
          <div
            style={{
              backgroundColor: '#242420',
              padding: '12px 24px',
              borderRadius: '9999px',
              color: '#FAF8F3',
              fontSize: '16px',
              fontWeight: 600,
              border: '1px solid #3E3D36',
            }}
          >
            🌱 Zero Industrial Seed Oils
          </div>
          <div
            style={{
              backgroundColor: '#242420',
              padding: '12px 24px',
              borderRadius: '9999px',
              color: '#FAF8F3',
              fontSize: '16px',
              fontWeight: 600,
              border: '1px solid #3E3D36',
            }}
          >
            🥡 100% Compostable Bagasse
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
