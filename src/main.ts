import { getAuthRequestMetaData } from "./utils/auth";
import { MethodsHttp } from "./types/methods";
import { combineUrl } from "./utils/combinePath";
export interface SDKRequestType {
  <T>(
    baseURL: string,
    requestUrl: string,
    options?: RequestInit,
    errorHandler?: () => void
  ): Promise<T>;
}

/**
 * Generic request handler
 *
 * @param baseURL base url for the api endpoint
 * @param requestURL string url for request the api endpoint
 * @param options options for specify the request parameters
 * @returns the resolved promise of the request in json format
 * @throws Generic error
 */
export const sdkRequest: SDKRequestType = async <T>(
  baseURL: string,
  requestURL: string,
  options?: RequestInit,
): Promise<T> => {
  let response: Response;
  try {
    const url = combineUrl(baseURL || '', requestURL);
    response = await (options ? fetch(url, options) : fetch(url));

    if (!response.ok) {
      try {
        console.log("Error", url);
        const errorLog = await response.json();
        return Promise.reject(errorLog);
      } catch {
        return Promise.reject("General Error");
      }
    }

    return await response.json();
  } catch (error) {
    console.log("Error", error);
    return Promise.reject({
      type: "API_ERROR",
      status: 1,
      message: "Server error",
      error: error,
    });
  }
};

interface SDKAuthRequestType {
  <T>(
    urlPath: string,
    requestUrl: string,
    options?: RequestInit,
    token?: string,
    errorHandler?: () => void
  ): Promise<T>;
}

const sdkNoAuthRequest = sdkRequest;

const sdkAuthRequest: SDKAuthRequestType = async (
  baseURL,
  requestUrl,
  options,
  token,
  errorHandler
) =>
  sdkRequest(
    baseURL,
    requestUrl,
    await getAuthRequestMetaData(options, token),
    errorHandler
  );

export { sdkNoAuthRequest, sdkAuthRequest, MethodsHttp };
