import { MethodsHttp } from "./types/methods";
import { buildQueryParams } from "./utils/exported-utils/buildQueryParams";
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
declare type FileOperationType = 'upload' | 'download';
interface FileOperationConfig {
    baseURL: string;
    path: string;
    token?: string;
    onProgress?: (progress: number, onCancel: () => void) => void;
    signal?: AbortSignal;
}
interface UploadConfig extends FileOperationConfig {
    file: File;
}
interface DownloadConfig extends FileOperationConfig {
    url: string;
}
interface ResponseCreateDocument {
    [key: string]: any;
}
interface FileOperationFunction {
    <T extends FileOperationType>(operation: T, config: T extends 'upload' ? UploadConfig : DownloadConfig): Promise<T extends 'upload' ? ResponseCreateDocument : string>;
}
/**
 * Generic XMLHttpRequest handler for file operations (upload/download)
 *
 * @template T - The operation type ('upload' or 'download')
 * @param operation - The type of operation to perform
 * @param config - Configuration object containing operation-specific parameters
 * @returns Promise resolving to operation-specific response type
 *
 * @example
 * // Upload file
 * const uploadResult = await sdkFileOperation('upload', {
 *   baseURL: 'https://api.example.com',
 *   path: '/upload-file',
 *   file: fileInput.files[0],
 *   token: 'your-token',
 *   onProgress: (progress, onCancel) => console.log(`Upload: ${progress}%`)
 * });
 *
 * @example
 * // Download file
 * const downloadUrl = await sdkFileOperation('download', {
 *   baseURL: 'https://api.example.com',
 *   path: '/download',
 *   url: 'file-url-to-download',
 *   token: 'your-token',
 *   onProgress: (progress, onCancel) => console.log(`Download: ${progress}%`)
 * });
 */
declare const sdkFileRequest: FileOperationFunction;
export { sdkNoAuthRequest, sdkAuthRequest, MethodsHttp, buildQueryParams, sdkFileRequest };
