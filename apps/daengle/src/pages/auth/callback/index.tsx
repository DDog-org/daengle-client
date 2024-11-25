import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFetchKakaoAccessToken, usePostApiOauthKakao } from '~/queries/oauth';

export default function AuthCallback() {
  const router = useRouter();
  const { code } = router.query || {};

  const { mutateAsync: postKakaoOauth } = useFetchKakaoAccessToken();

  const { mutateAsync: postOauthKakao } = usePostApiOauthKakao();

  useEffect(() => {
    const handleAuthentication = async () => {
      if (!code) return;
      try {
        const accessToken = await postKakaoOauth(code as string);
        // 액세스 토큰 백엔드한테 보내주기
        await postOauthKakao({ accessToken, loginType: 'GROOMER' });

        router.push('/home'); // 로그인 성공 시 홈으로 이동
      } catch (error) {
        throw new Error('로그인 실패');
      }
    };

    handleAuthentication();
  }, [code, postKakaoOauth, postOauthKakao, router]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
