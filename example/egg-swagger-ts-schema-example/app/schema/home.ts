import {No, CommonResponse, Id} from './definitions';

export interface HomeRes {
  name: string;
  address: string;
  no: No;
}

export type HomeError = CommonResponse<{
  name: string;
  id: Id;
}>;
