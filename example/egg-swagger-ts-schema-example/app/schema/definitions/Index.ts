export type Index = string;
export type Id = string;
export type No = string;

export interface CommonResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}
