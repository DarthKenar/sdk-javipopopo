import { getAuthRequestMetaData } from "./utils/auth";
import { MethodsHttp } from "./types/methods";
import { combineUrl } from "./utils/combinePath";
import { buildQueryParams } from "./utils/exported-utils/buildQueryParams";

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

//Aquí armaremos el XML object

// File operation types
type FileOperationType = 'upload' | 'download';

// Base configuration interface
interface FileOperationConfig {
  baseURL: string;
  path: string;
  token?: string;
  onProgress?: (progress: number, onCancel: () => void) => void;
  signal?: AbortSignal;
}

// Upload specific configuration
interface UploadConfig extends FileOperationConfig {
  file: File;
}

// Download specific configuration
interface DownloadConfig extends FileOperationConfig {
  url: string;
}

// Response types
interface ResponseCreateDocument {
  [key: string]: any;
}

// Generic file operation function type
interface FileOperationFunction {
  <T extends FileOperationType>(
    operation: T,
    config: T extends 'upload' ? UploadConfig : DownloadConfig
  ): Promise<T extends 'upload' ? ResponseCreateDocument : string>;
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
const sdkFileRequest: FileOperationFunction = async <T extends FileOperationType>(
  operation: T,
  config: T extends 'upload' ? UploadConfig : DownloadConfig
): Promise<T extends 'upload' ? ResponseCreateDocument : string> => {
  const xhr = new XMLHttpRequest();
  const fullUrl = combineUrl(config.baseURL, config.path);

  return new Promise<T extends 'upload' ? ResponseCreateDocument : string>((resolve, reject) => {
    // Handle AbortSignal if provided
    if (config.signal) {
      config.signal.addEventListener('abort', () => {
        xhr.abort();
        reject(new DOMException('Request cancelled', 'AbortError'));
      });

      if (config.signal.aborted) {
        reject(new DOMException('Request cancelled', 'AbortError'));
        return;
      }
    }

    // Configure request
    xhr.open('POST', fullUrl, true);
    
    // Set authorization header
    if (config.token) {
      xhr.setRequestHeader('Authorization', `Bearer ${config.token}`);
    }

    // Configure based on operation type
    if (operation === 'upload') {
      const uploadConfig = config as UploadConfig;
      
      // Progress tracking for upload
      xhr.upload.onprogress = (event) => {
        const onCancel = () => xhr.abort();
        
        if (event.lengthComputable && config.onProgress) {
          const percent = Math.round((event.loaded * 100) / event.total);
          config.onProgress(percent, onCancel);
        }
      };

      // Handle upload response
      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const responseJson = JSON.parse(xhr.responseText || '{}');
            resolve(responseJson as T extends 'upload' ? ResponseCreateDocument : string);
          } catch (error) {
            reject(new Error('Error parsing server response'));
          }
        } else {
          reject(new Error(`Upload error: ${xhr.statusText}`));
        }
      };

      // Send file as FormData
      const formData = new FormData();
      formData.append('file', uploadConfig.file);
      xhr.send(formData);

    } else {
      const downloadConfig = config as DownloadConfig;
      
      // Configure for download
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.responseType = 'blob';
      
      // Progress tracking for download
      xhr.onprogress = (event) => {
        const onCancel = () => xhr.abort();
        
        if (event.lengthComputable && config.onProgress) {
          const percent = Math.round((event.loaded * 100) / event.total);
          config.onProgress(percent, onCancel);
        }
      };

      // Handle download response
      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const receivedBlob = xhr.response;
            const pdfBlob = new Blob([receivedBlob], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(pdfBlob);
            resolve(blobUrl as T extends 'upload' ? ResponseCreateDocument : string);
          } catch (error) {
            reject(new Error('Error parsing server response'));
          }
        } else {
          reject(new Error(`Download error: ${xhr.statusText}`));
        }
      };

      // Send download request
      xhr.send(JSON.stringify({ url: downloadConfig.url }));
    }

    // Common error handlers
    xhr.onerror = () => reject(new Error('Connection error with server'));
    xhr.onabort = () => reject(new Error(`${operation} cancelled by user`));
  });
};

export { 
  sdkNoAuthRequest, 
  sdkAuthRequest, 
  MethodsHttp, 
  buildQueryParams,
  sdkFileRequest
};
