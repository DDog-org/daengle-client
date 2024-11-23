// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { API_DOMAIN } from '../apis/api';

// const CLIENT_ID = '4e8bf4afe34797b1bf901625a0a4aa47'; // 카카오 앱 키
// const REDIRECT_URI = 'http://localhost:3000/auth/callback';

// const AuthCallback = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getToken = async () => {
//       const params = new URLSearchParams(window.location.search);
//       const code = params.get('code');

//       if (code) {
//         try {
//           const response = await axios.post('https://kauth.kakao.com/oauth/token', null, {
//             params: {
//               grant_type: 'authorization_code',
//               client_id: CLIENT_ID,
//               redirect_uri: REDIRECT_URI,
//               code: code,
//             },
//           });

//           const { access_token } = response.data;

//           const serverResponse = await axios.post(`${API_DOMAIN}/oauth/kakao`, {
//             kakaoAccessToken: access_token,
//             loginType: 'USER',
//           });
//           const { accessToken, refreshToken, role } = serverResponse.data.response;

//           localStorage.setItem('accessToken', accessToken);

//           if (role === 'ADMIN') {
//             navigate('/admin'); // 관리자 페이지로
//           } else {
//             navigate('/profiles');
//           }
//         } catch (error) {
//           console.error('Error during token retrieval:', error);
//         }
//       }
//     };

//     getToken();
//   }, []);

//   return <div>로그인 처리 중...</div>;
// };

// export default AuthCallback;
