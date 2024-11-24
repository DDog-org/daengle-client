export const QUERY_KEYS = {
  FETCH_KAKAO_ACCESS_TOKEN: (code: string) => ['FETCH_KAKAO_ACCESS_TOKEN', { code }],
  POST_API_OAUTH_KAKAO: ['POST_API_OAUTH_KAKAO'],
} as const;
