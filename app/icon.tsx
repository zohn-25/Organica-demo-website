import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: '#141412',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F2B705',
          borderRadius: '8px',
          fontWeight: 900,
          border: '1.5px solid #2E5A36',
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
