import { UserReservationCareList, UserReservationGroomingList } from '~/interfaces/reservation';

export interface GetUserReservationGroomingListResponse {
  contents: UserReservationGroomingList[];
}

export interface GetUserReservationCareListResponse {
  contents: UserReservationCareList[];
}

export interface GetUserReservationGroomingDetailRequestParams {
  estimateId: number;
}

export interface GetUserReservationGroomingDetailResponse {
  reservationId: number;
  groomingEstimateId: number;
  groomerId: number;
  imageUrl: string;
  name: string;
  shopId: number;
  shopName: string;
  daengleMeter: number;
  keywords: string[];
  introduction: string;
  address: string;
  reservedDate: string;
  weight: 'SMALL' | 'MEDIUM' | 'LARGE';
  desiredStyle: string;
  overallOpinion: string;
}

export interface GetUserReservationCareDetailRequestParams {
  estimateId: number;
}

export interface GetUserReservationCareDetailResponse {
  reservationId: number;
  careEstimateId: number;
  vetId: number;
  imageUrl: string;
  name: string;
  daengleMeter: number;
  keywords: string[];
  introduction: string;
  address: string;
  reservedDate: string;
  diagnosis: string;
  cause: string;
  treatment: string;
}
