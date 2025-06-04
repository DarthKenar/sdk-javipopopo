var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAuthRequestMetaData } from "./utils/auth";
import { MethodsHttp } from "./types/methods";
import { combineUrl } from "./utils/combinePath";
/**
 * Generic request handler
 *
 * @param baseURL base url for the api endpoint
 * @param requestURL string url for request the api endpoint
 * @param options options for specify the request parameters
 * @returns the resolved promise of the request in json format
 * @throws Generic error
 */
export const sdkRequest = (baseURL, requestURL, options) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    try {
        const url = combineUrl(baseURL || '', requestURL);
        response = yield (options ? fetch(url, options) : fetch(url));
        if (!response.ok) {
            try {
                console.log("Error", url);
                const errorLog = yield response.json();
                return Promise.reject(errorLog);
            }
            catch (_a) {
                return Promise.reject("General Error");
            }
        }
        return yield response.json();
    }
    catch (error) {
        console.log("Error", error);
        return Promise.reject({
            type: "API_ERROR",
            status: 1,
            message: "Server error",
            error: error,
        });
    }
});
const sdkNoAuthRequest = sdkRequest;
const sdkAuthRequest = (baseURL, requestUrl, options, token, errorHandler) => __awaiter(void 0, void 0, void 0, function* () {
    return sdkRequest(baseURL, requestUrl, yield getAuthRequestMetaData(options, token), errorHandler);
});
export { sdkNoAuthRequest, sdkAuthRequest, MethodsHttp };
