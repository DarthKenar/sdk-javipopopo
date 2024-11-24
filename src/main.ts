import { getAuthRequestMetaData } from "./utils/auth";
import { MethodsHttp } from "./types";

export interface SDKRequestType {
  <T>(
    requestUrl: RequestInfo,
    options?: RequestInit,
    urlPath?: string,
    errorHandler?: () => void
  ): Promise<T>;
}

/**
 * Generic request handler
 *
 * @param requestUrl string url for request the api endpoint
 * @param options options for specify the request parameters
 * @returns the resolved promise of the request in json format
 * @throws Generic error
 */
export const sdkRequest: SDKRequestType = async <T>(
  requestUrl: RequestInfo,
  options?: RequestInit,
  urlPath?: string
): Promise<T> => {
  let response: Response;
  try {
    const url = `${urlPath}/${requestUrl}`;
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
    requestUrl: RequestInfo,
    options?: RequestInit,
    token?: string,
    urlPath?: string,
    errorHandler?: () => void
  ): Promise<T>;
}

export const sdkNoAuthRequest = sdkRequest;

export const sdkAuthRequest: SDKAuthRequestType = async (
  requestUrl,
  options,
  token,
  urlPath,
  errorHandler
) =>
  sdkRequest(
    requestUrl,
    await getAuthRequestMetaData(options, token),
    urlPath,
    errorHandler
  );

module.exports = {
  sdkNoAuthRequest,
  sdkAuthRequest,
  MethodsHttp,
};
