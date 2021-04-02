// Axios-type response
export type BaseResponse = {
  statusText: string;
  request: any;
  headers: any;
};

export type Response<T> = BaseResponse &
  (
    | {
        status: 200;
        data: T;
      }
    | {
        status: 404;
        data: null;
      }
  );
