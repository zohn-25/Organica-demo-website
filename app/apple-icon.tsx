import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: '#141412',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F2B705',
          borderRadius: '36px',
          fontWeight: 900,
          border: '6px solid #2E5A36',
        }}
      >
        O
      </div>
    ),
    {
      ...size,
    }
  );
}
