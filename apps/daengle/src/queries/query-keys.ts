const AUTH_QUERY_KEYS = {
  POST_KAKAO: ['POST_KAKAO'],
  POST_KAKAO_OAUTH: ['POST_KAKAO_OAUTH'],
  POST_OAUTH_KAKAO: ['POST_OAUTH_KAKAO'],
  POST_JOIN_WITHOUT_PET: ['POST_JOIN_WITHOUT_PET'],
  POST_AVAILABLE_NICKNAME: ['POST_AVAILABLE_NICKNAME'],
  GET_BREED_LIST: ['GET_BREED_LIST'],
  POST_JOIN_WITH_PET: ['POST_JOIN_WITH_PET'],
  GET_USER_PET_INFO: ['GET_USER_PET_INFO'],
  POST_USER_PET: ['POST_USER_PET'],
  POST_USER_PET_INFO: ['POST_USER_PET_INFO'],
  DELETE_USER_PET: ['DELETE_USER_PET'],
  GET_USER_VALIDATE: ['GET_USER_VALIDATE'],
  GET_USER_MYPAGE: ['GET_USER_MYPAGE'],
};

const ESTIMATE_QUERY_KEYS = {
  GET_USER_ESTIMATE_GENERAL_GROOMING_PETS: ['GET_USER_ESTIMATE_GENERAL_GROOMING_PETS'],
  GET_USER_ESTIMATE_GENERAL_GROOMING: ['GET_USER_ESTIMATE_GENERAL_GROOMING'],
  GET_USER_ESTIMATE_GENERAL_CARE_PETS: ['GET_USER_ESTIMATE_GENERAL_CARE_PETS'],
  GET_USER_ESTIMATE_GENERAL_CARE: ['GET_USER_ESTIMATE_GENERAL_CARE'],
  GET_USER_ESTIMATE_DESIGNATION_GROOMING_PETS: ['GET_USER_ESTIMATE_DESIGNATION_GROOMING_PETS'],
  GET_USER_ESTIMATE_DESIGNATION_GROOMING: ['GET_USER_ESTIMATE_DESIGNATION_GROOMING'],
  GET_USER_ESTIMATE_DESIGNATION_CARE_PETS: ['GET_USER_ESTIMATE_DESIGNATION_CARE_PETS'],
  GET_USER_ESTIMATE_DESIGNATION_CARE: ['GET_USER_ESTIMATE_DESIGNATION_CARE'],
  POST_ESTIMATE_GROOMER_USER_INFO: [' POST_USER_ESTIMATE_GROOMER_USER_INFO'],
  POST_ESTIMATE_GROOMING: ['POST_USER_ESTIMATE_GROOMING'],
  POST_USER_ESTIMATE_VET_USER_INFO: ['POST_USER_ESTIMATE_VET_USER_INFO'],
  POST_USER_ESTIMATE_CARE: ['POST_USER_ESTIMATE_CARE'],
  GET_USER_PROFILE_INFO: ['GET_USER_PROFILE_INFO'],
  POST_USER_PROFILE_INFO: ['POST_USER_PROFILE_INFO'],
  GET_USER_ESTIMATE_GROOMER_DETAIL: ['GET_USER_ESTIMATE_GROOMER_DETAIL'],
  GET_USER_ESTIMATE_VET_DETAIL: ['GET_USER_ESTIMATE_VET_DETAIL'],
  GET_USER_ESTIMATE_REQUEST_GROOMING: ['GET_USER_ESTIMATE_REQUEST_GROOMING'],
  GET_USER_ESTIMATE_REQUEST_CARE: ['GET_USER_ESTIMATE_REQUEST_CARE'],
  POST_ESTIMATE_CANCEL_GROOMING: ['POST_ESTIMATE_CANCEL_GROOMING'],
  POST_ESTIMATE_CANCEL_CARE: ['POST_ESTIMATE_CANCEL_CARE'],
};

const REVIEW_QUERY_KEYS = {
  GET_USER_GROOMING_MY_REVIEW_LIST: ['GET_USER_GROOMING_MY_REVIEW_LIST'],
  GET_USER_CARE_MY_REVIEW_LIST: ['GET_USER_CARE_MY_REVIEW_LIST'],
  DELETE_USER_CARE_REVIEW: ['DELETE_USER_CARE_REVIEW'],
  DELETE_USER_GROOMING_REVIEW: ['DELETE_USER_GROOMING_REVIEW'],
  GET_USER_GROOMER_REVIEW_LIST: ['GET_USER_GROOMER_REVIEW_LIST'],
  GET_USER_VET_REVIEW_LIST: ['GET_USER_VET_REVIEW_LIST'],
  GET_USER_RESERVATION_REVIEW: ['GET_USER_RESERVATION_REVIEW'],
  GET_USER_GROOMING_REVIEW: ['GET_USER_GROOMING_REVIEW'],
  POST_GROOMING_REVIEW: ['POST_GROOMING_REVIEW'],
  PATCH_GROOMING_REVIEW: ['PATCH_GROOMING_REVIEW'],
  GET_USER_CARE_REVIEW: ['GET_USER_CARE_REVIEW'],
  POST_CARE_REVIEW: ['POST_CARE_REVIEW'],
  PATCH_CARE_REVIEW: ['PATCH_CARE_REVIEW'],
};

const PAYMENT_QUERY_KEYS = {
  GET_PAYMENT_GROOMING_HISTORY_LIST: ['GET_PAYMENT_GROOMING_HISTORY_LIST'],
  GET_PAYMENT_CARE_HISTORY_LIST: ['GET_PAYMENT_CARE_HISTORY_LIST'],
  GET_PAYMENT_HISTORY_DETAIL: ['GET_PAYMENT_HISTORY_DETAIL'],
  POST_PAYMENT_ORDER: ['POST_PAYMENT_ORDER'],
  POST_PAYMENT_VALIDATE: ['POST_PAYMENT_VALIDATE'],
};

const RESERVATION_QUERY_KEYS = {
  GET_USER_RESERVATION_GROOMING_LIST: ['GET_USER_RESERVATION_GROOMING_LIST'],
  GET_USER_RESERVATION_CARE_LIST: ['GET_USER_RESERVATION_CARE_LIST'],
  GET_USER_RESERVATION_GROOMING_DETAIL: ['GET_USER_RESERVATION_GROOMING_DETAIL'],
  GET_USER_RESERVATION_CARE_DETAIL: ['GET_USER_RESERVATION_CARE_DETAIL'],
};

const CHAT_QUERY_KEYS = {
  GET_CHAT_USER_GROOMER_LIST: ['GET_CHAT_USER_GROOMER_LIST'],
  GET_CHAT_USER_VET_LIST: ['GET_CHAT_USER_VET_LIST'],
  GET_CHAT_WITH: ['GET_CHAT_WITH'],
  POST_CHAT_MESSAGES: ['POST_CHAT_MESSAGES'],
  DELETE_CHAT_DELETE: ['DELETE_CHAT_DELETE'],
};

const HOME_QUERY_KEYS = {
  GET_USER_SHOPS: ['GET_USER_SHOPS'],
  GET_USER_VETS: ['GET_USER_VETS'],
};
const SEARCH_QUERY_KEYS = {
  GET_USER_SEARCH_VET: ['GET_USER_SEARCH_VET'],
  GET_USER_SEARCH_GROOMER: ['GET_USER_SEARCH_GROOMER'],
};

export const QUERY_KEYS = {
  ...AUTH_QUERY_KEYS,
  ...ESTIMATE_QUERY_KEYS,
  ...REVIEW_QUERY_KEYS,
  ...PAYMENT_QUERY_KEYS,
  ...RESERVATION_QUERY_KEYS,
  ...CHAT_QUERY_KEYS,
  ...HOME_QUERY_KEYS,
  ...SEARCH_QUERY_KEYS,
} as const;
