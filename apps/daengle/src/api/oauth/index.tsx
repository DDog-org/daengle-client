import axios from 'axios';
import { api } from '../api';

const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY || '';
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI || '';
const KAKAO_OAUTH_TOKEN_URL = process.env.NEXT_PUBLIC_KAKAO_OAUTH_TOKEN_URL || '';

export const postKakaoOauth = async (code: string) => {
  const response = await axios.post(KAKAO_OAUTH_TOKEN_URL, null, {
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
  return response.data.access_token;
};

export const postOauthKakao = async (accessToken: string, loginType: string) => {
  await api.post('/api/oauth/kakao', {
    kakaoAccessToken: accessToken,
    loginType: loginType,
  });
};
