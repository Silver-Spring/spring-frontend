import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Token name constant - must match the one used in auth hooks
const TOKEN_NAME = 'authToken';

export default async function RootPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME);

  if (token?.value) {
    redirect('/assessment');
  } else {
    redirect('/auth/login');
  }
}
