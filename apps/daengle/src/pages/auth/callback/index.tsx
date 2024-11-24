import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchKakaoAccessToken, postApiOauthKakao } from '~/api/oauth';

export default function Callback() {
  const router = useRouter();
  const { code } = router.query || {};

  useEffect(() => {
    const handleAuthentication = async () => {
      if (!code) return;

      try {
        const accessToken = await fetchKakaoAccessToken(code as string);

        // 액세스 토큰 백엔드한테 보내주기
        await postApiOauthKakao(accessToken, 'GROOMER');
      } catch (error) {
        alert('로그인 실패. 다시 시도해주세요.');
      }
    };

    handleAuthentication();
  }, [code]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
