module.exports = (apiNamePC, apiActionRoute, routePath, methodUC, urlParams) => `import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  HttpMethod
} from '../api-builder'

export interface ${apiNamePC}Params {${urlParams ? urlParams.map(p => `\n  ${p}: string,`).join('\n') + '\n' : ''}}
export interface ${apiNamePC}ResponseData {}
export default apiActionBuilder<
  ${apiNamePC}Params,
  ApiSuccessAction<${apiNamePC}ResponseData>
>(
  "${apiActionRoute}",
  (
    params: ${apiNamePC}Params,
    options?: ApiRequestPayloadBuilderOptions
  ) => ({
    payload: apiRequestPayloadBuilder(
      {
        path: ${routePath},
        method: HttpMethod.${methodUC},
      },
      options
    ),
  })
);
`
