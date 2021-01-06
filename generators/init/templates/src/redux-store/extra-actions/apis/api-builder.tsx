import {
  ActionCreatorWithPreparedPayload,
  createAction,
  PayloadActionCreator,
  PrepareAction,
} from "@reduxjs/toolkit";
import { Action } from "redux";

export enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

interface ApiRequestPayloadBuilderParams {
  path: string;
  method: HttpMethod;
  body?: any;
  query?: any;
}

export interface ApiRequestPayloadBuilderOptions {
  requestDelay: number;
}

export interface ApiRequestPayloadType {
  params: ApiRequestPayloadBuilderParams;
  options?: ApiRequestPayloadBuilderOptions;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiRequestPayloadBuilder = (
  params: ApiRequestPayloadBuilderParams,
  options?: ApiRequestPayloadBuilderOptions
): ApiRequestPayloadType => ({
  params,
  options,
});

export interface ApiRequestAction extends Action<string> {
  payload: ApiRequestPayloadType;
  retry?: boolean;
}

interface ApiActionRequest<Args extends unknown[]>
  extends ActionCreatorWithPreparedPayload<Args, ApiRequestPayloadType> {}

interface ApiSuccessData<T> {
  status: number;
  data: T;
}

export type ApiSuccessAction<T> = PayloadActionCreator<ApiSuccessData<T>>

export interface ApiFailAction extends Action {
  payload: {
    status: number;
    message: string;
  };
}

export const apiActionBuilder = <ApiRequestParams, ApiResponseAction>(
  api: string,
  prepare: PrepareAction<ApiRequestPayloadType>
) => ({
  api,
  request: createAction(`${api}/request`, prepare) as ApiActionRequest<
    [ApiRequestParams, ApiRequestPayloadBuilderOptions?]
  >,
  success: createAction(
    `${api}/success`,
    (payload) => ({
      payload,
    })
  ) as unknown as ApiResponseAction,
  fail: createAction(`${api}/fail`, (payload) => ({
    payload,
  })) as unknown as ApiFailAction,
  cancel: createAction(`${api}/cancel`),
});
