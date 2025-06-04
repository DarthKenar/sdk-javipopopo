import { MethodsHttp } from "./types/methods";
export interface SDKRequestType {
    <T>(baseURL: string, requestUrl: string, options?: RequestInit, errorHandler?: () => void): Promise<T>;
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
export declare const sdkRequest: SDKRequestType;
interface SDKAuthRequestType {
    <T>(urlPath: string, requestUrl: string, options?: RequestInit, token?: string, errorHandler?: () => void): Promise<T>;
}
declare const sdkNoAuthRequest: SDKRequestType;
declare const sdkAuthRequest: SDKAuthRequestType;
export { sdkNoAuthRequest, sdkAuthRequest, MethodsHttp };
