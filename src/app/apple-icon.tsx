import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default async function AppleIcon() {
  try {
    const logoData = await readFile(join(process.cwd(), 'public/silverspring_logo.jpeg'), 'base64');
    const logoSrc = `data:image/jpeg;base64,${logoData}`;

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            borderRadius: '20px',
          }}
        >
          <img
            src={logoSrc}
            style={{
              width: '90%',
              height: '90%',
              objectFit: 'contain',
            }}
          />
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
            fontSize: 96,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '20px',
          }}
        >
          SS
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
