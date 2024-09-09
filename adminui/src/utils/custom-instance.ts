// https://orval.dev/guides/custom-client
// https://orval.dev/reference/configuration/output
// custom-instance.ts
import Axios, { AxiosError, AxiosRequestConfig } from "axios";

// TODO: don't hardcode
let apiURL = import.meta.env.DEV
  ? "http://localhost:9000"
  : "https://prod.api.play.commonfate.io";

export const customInstance = async <T>(
  config: AxiosRequestConfig,
  runtimeConfig?: AxiosRequestConfig
): Promise<T> => {
  const instance = Axios.create();

  const baseURL = apiURL;

  const promise = instance({
    baseURL,
    headers: {
      ...config.headers,
    },
    ...config,
    ...runtimeConfig,
  }).then(({ data }) => data);

  return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;
// In case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
