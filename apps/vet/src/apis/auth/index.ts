import axios from 'axios';
import { api } from '~/apis';
import {
  PostKakaoRequestBody,
  PostKakaoResponse,
  PostVetJoinRequestBody,
  PostVetJoinResponse,
} from '~/models/auth';

export const postOauthToken = async (code: string) => {
  return await axios.post('https://kauth.kakao.com/oauth/token', null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_REST_API_KEY,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      code: code,
    },
  });
};

export const postKakao = async (body: PostKakaoRequestBody) => {
  return await api.post<PostKakaoResponse>('/user/kakao', body);
};

export const postVetJoin = async (body: PostVetJoinRequestBody) => {
  return await api.post<PostVetJoinResponse>('/vet/join', body);
};
