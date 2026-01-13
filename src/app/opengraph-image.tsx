import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Silver Spring - Assessment Platform';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  try {
    const logoData = await readFile(join(process.cwd(), 'public/silverspring_logo.jpeg'), 'base64');
    const logoSrc = `data:image/jpeg;base64,${logoData}`;

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <img
              src={logoSrc}
              height="180"
              style={{
                borderRadius: '20px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              }}
            />
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Silver Spring
          </div>
          <div
            style={{
              fontSize: 36,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            Assessment Platform
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Silver Spring
          </div>
          <div
            style={{
              fontSize: 36,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            Assessment Platform
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
