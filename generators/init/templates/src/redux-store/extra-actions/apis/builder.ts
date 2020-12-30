import {
  ActionCreatorWithPreparedPayload,
  createAction,
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

export interface ApiSuccessAction<T> extends Action {
  payload: ApiSuccessData<T>;
}

interface ApiFailData {
  status: number;
  message: string;
}

export interface ApiFailAction extends Action {
  payload: ApiFailData;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiActionBuilder = <ApiRequestParams, ApiResponseData>(
  api: string,
  prepare: PrepareAction<ApiRequestPayloadType>
) => ({
  api,
  request: createAction(`${api}/request`, prepare) as ApiActionRequest<
    [ApiRequestParams, ApiRequestPayloadBuilderOptions?]
    >,
  success: createAction(
    `${api}/success`,
    (payload: ApiSuccessData<ApiResponseData>) => ({
      payload,
    })
  ),
  fail: createAction(`${api}/fail`, (payload: ApiFailData) => ({
    payload,
  })),
  cancel: createAction(`${api}/cancel`),
});
