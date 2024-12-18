const AUTH_QUERY_KEYS = {
  POST_KAKAO: ['POST_KAKAO'],
  POST_JOIN: ['POST_JOIN'],
  GET_GROOMER_MODIFY_PAGE: ['GET_GROOMER_MODIFY_PAGE'],
  PATCH_GROOMER_INFO: ['PATCH_GROOMER_INFO'],
  GET_GROOMER_INFO: ['GET_GROOMER_INFO'],
  GET_GROOMER_WITHDRAW_INFO: ['GET_GROOMER_WITHDRAW_INFO'],
  DELETE_GROOMER: ['DELETE_GROOMER'],
  GET_GROOMER_VALIDATE: ['GET_GROOMER_VALIDATE'],
};

const ESTIMATE_QUERY_KEYS = {
  POST_GROOMER_ESTIMATE: ['POST_GROOMER_ESTIMATES_DETAIL'],
  GET_GROOMER_ESTIMATES_DETAIL: ['GET_GROOMER_ESTIMATES_DETAIL'],
  GET_GROOMER_ESTIMATE_DESIGNATION_LIST: ['GET_GROOMER_ESTIMATE_DESIGNATION_LIST'],
  GET_GROOMER_ESTIMATE_GENERAL_LIST: ['GET_GROOMER_ESTIMATE_GENERAL_LIST'],
};

const NOTIFICATION_QUERY_KEYS = {
  GET_GROOMER_SCHEDULE: ['GET_GROOMER_SCHEDULE'],
};

const CHAT_QUERY_KEYS = {
  GET_CHAT_GROOMER_LIST: ['GET_CHAT_GROOMER_LIST'],
  GET_CHAT_USER_VET_LIST: ['GET_CHAT_USER_VET_LIST'],
  GET_CHAT_WITH: ['GET_CHAT_WITH'],
  POST_CHAT_MESSAGES: ['POST_CHAT_MESSAGES'],
  DELETE_CHAT_DELETE: ['DELETE_CHAT_DELETE'],
};

const REVIEW_QUERY_KEYS = {
  GET_GROOMING_REVIEW_LIST: ['GET_GROOMING_REVIEW_LIST'],
  GET_GROOMING_REVIEW_REPORT_LIST: ['GET_GROOMING_REVIEW_REPORT_LIST'],
  GET_GROOMER_REVIEW_REPORT: ['GET_GROOMER_REVIEW_REPORT'],
  POST_GROOMER_REVIEW_REPORT: ['POST_GROOMER_REVIEW_REPORT'],
};

export const QUERY_KEYS = {
  ...AUTH_QUERY_KEYS,
  ...ESTIMATE_QUERY_KEYS,
  ...NOTIFICATION_QUERY_KEYS,
  ...CHAT_QUERY_KEYS,
  ...REVIEW_QUERY_KEYS,
  GET_GROOMER_MYPAGE_SHOP: ['GET_GROOMER_MYPAGE_SHOP'],
} as const;
