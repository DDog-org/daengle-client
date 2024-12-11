export const ROUTES = {
  LOGIN: '/login',
  ONBOARDING: '/onboarding',
  ONBOARDING_USER_INFO: '/onboarding?step=user-info',
  ONBOARDING_SEARCH_ADDRESS: '/onboarding?step=search-address',
  ONBOARDING_PET_INFO: '/onboarding?step=pet-info',

  HOME: '/',
  SEARCH: '/search',
  SEARCH_RESULT: (keyword: string) => `/search?keyword=${keyword}`,

  // Estimates
  ESTIMATE_LIST: '/estimate',
  ESTIMATE_DETAIL: (estimateId: number) => `/estimate/${estimateId}`,
  ESTIMATE_FORM_COMPLETE: '/estimate/complete',

  // Groomers
  GROOMER_DETAIL: (groomerId: number) => `/groomers/${groomerId}`,
  GROOMER_REVIEW: (groomerId: number) => `/groomers/${groomerId}/reviews`,
  GROOMER_ESTIMATE_FORM: '/groomers/estimate-form',
  GROOMER_REVIEW_FORM: (reservationId: number) => `/groomers/review/${reservationId}`,
  GROOMER_REVIEW_FORM_EDIT: (reveiwId: number) => `/groomers/review/${reveiwId}/edit`,

  // Vets
  VET_DETAIL: (vetId: number) => `/vets/${vetId}`,
  VET_REVIEW: (vetId: number) => `/vets/${vetId}/reviews`,
  VET_ESTIMATE_FORM: '/vets/estimate-form',
  VET_REVIEW_FORM: (reservationId: number) => `/vet/review/${reservationId}`,
  VET_REVIEW_FORM_EDIT: (reviewId: number) => `/vet/review/${reviewId}/edit`,

  RESERVATION_PAYMENT: '/reservations/payment',
  RESERVATION_PAYMENT_COMPLETE: '/reservations/payment/complete',
  RESERVATION_PAYMENT_FAILURE: '/reservations/payment/failure',
  RESERVATIONS: '/reservations',
  PAYMENTS: '/payments',

  // Messages
  MESSAGES: '/messages',
  MESSAGES_DETAIL: (messageId: number) => `/messages/${messageId}`,

  // Mypage
  MYPAGE: '/mypage',
  MYPAGE_USER_INFO: '/mypage/user-profile',
  MYPAGE_USER_INFO_EDIT: '/mypage/user-profile/edit',
  MYPAGE_PET_PROFILE: '/mypage/pet-profile',
  MYPAGE_PET_PROFILE_EDIT: '/mypage/pet-profile/edit',
  MYPAGE_REVIEWS: '/mypage/reviews',
  MYPAGE_FAVORITES: '/mypage/favorites',
} as const;
