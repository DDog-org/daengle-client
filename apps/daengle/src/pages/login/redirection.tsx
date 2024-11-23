import { useEffect } from 'react';
import styles from './index.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Redirection() {
  const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const router = useRouter();
  const { code } = router.query || {};
  console.log('Authorization Code:', code);

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (!code) return;

      try {
        const response = await axios.post('https://kauth.kakao.com/oauth/token', null, {
          params: {
            grant_type: 'authorization_code',
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const { access_token } = response.data;
        console.log('access_token=>>', access_token);

        // 액세스 토큰 백엔드한테 보내주기
        const serverResponse = await axios.post('https://dev-api.daengle.com/api/oauth/kakao', {
          kakaoAccessToken: access_token,
          loginType: 'GROOMER',
        });
        console.log('serverResponse 나와라 ! ', serverResponse);
      } catch (error) {
        console.error('카카오 로그인 실패:', error);
        alert('로그인 실패. 다시 시도해주세요.');
      }
    };

    fetchAccessToken();
  }, [code]);

  return (
    <div className={styles.wrapper}>
      <p>Loading...</p>
    </div>
  );
}
