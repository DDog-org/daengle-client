import { useRouter } from 'next/router';
import { AppBar, Layout } from '@daengle/design-system';
import { ROUTES } from '~/constants/commons';

export default function GroomerInfo() {
  const router = useRouter();

  return (
    <Layout>
      <AppBar onBackClick={router.back} onHomeClick={() => router.push(ROUTES.HOME)} />
      미용샵 상세정보
    </Layout>
  );
}
