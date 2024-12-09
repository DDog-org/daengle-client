import { GroomingEstimateList } from '~/interfaces/estimate';

export interface GetGroomerEstimateListResponse {
  allEstimates: GroomingEstimateList[];
  designationEstimates: GroomingEstimateList[];
}

export interface GetGroomerEstimateDetailResponse {
  userImage: string;
  nickname: string;
  proposal: 'GENERAL' | 'DESIGNATION';
  address: string;
  reservedDate: string;
  id: number;
  petImage: string;
  name: string;
  age: number;
  weight: 'SMALL' | 'MEDIUM' | 'LARGE';
  significant: string | null;
  desiredStyle: string;
  requirements: string;
  overallOpinion?: string;
}

export interface GetGroomerEstimateDetailParams {
  id: number;
}

export interface PostGroomerEstimateBody {
  id: number;
  reservedDate: string;
  overallOpinion: string;
}

export interface PostGroomerEstimateResponse {
  isRegistered: boolean;
}
