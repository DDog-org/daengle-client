import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFetchKakaoAccessToken, usePostApiOauthKakao } from '~/queries/oauth';

export default function Callback() {
  const router = useRouter();
  const { code } = router.query || {};

  const fetchKakaoAccessToken = useFetchKakaoAccessToken();
  const postApiOauthKakao = usePostApiOauthKakao();

  useEffect(() => {
    const handleAuthentication = async () => {
      if (!code) return;

      try {
        const accessToken = await fetchKakaoAccessToken(code as string);

        // 액세스 토큰 백엔드한테 보내주기
        await postApiOauthKakao(accessToken, 'GROOMER');

        alert('로그인 성공!');
        router.push('/home'); // 로그인 성공 시 홈으로 이동
      } catch (error) {
        alert('로그인 실패. 다시 시도해주세요.');
      }
    };

    handleAuthentication();
  }, [code, fetchKakaoAccessToken, postApiOauthKakao, router]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
