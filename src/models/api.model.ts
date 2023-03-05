export enum ResponseStatus {
  SUCCESS = 'SUCESS',
  ERROR = 'ERROR',
  PROCESSING = 'PROCESSING',
}

export interface StatusResponse{
  status: ResponseStatus,
  message: string,
}
