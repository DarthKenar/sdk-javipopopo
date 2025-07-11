# sdk-javipopopo v3.0.1

![Javipopopo](https://static.vecteezy.com/system/resources/previews/021/172/338/non_2x/cute-cow-with-crown-cartoon-illustration-for-kids-vector.jpg)

## About

A comprehensive SDK for making HTTP requests with support for authentication, file operations, and query parameter building. Optimized for speed, ease of use, and TypeScript support.

Our thanks to Master Javi

## Installation

```bash
npm install sdk-javipopopo
```

or

```bash
yarn add sdk-javipopopo
```

## Usage

### 1. Basic HTTP Requests (No Authentication)

```js
import { sdkRequest, MethodsHttp } from "sdk-javipopopo";

const BASE_URL = "https://api.example.com/api/v2";

// GET request
const users = await sdkRequest(
  BASE_URL,
  "users",
  { method: MethodsHttp.GET }
);

// POST request
const newUser = await sdkRequest(
  BASE_URL,
  "users",
  {
    method: MethodsHttp.POST,
    body: JSON.stringify({ name: "John Doe", email: "john@example.com" }),
    headers: { 'Content-Type': 'application/json' }
  }
);
```

### 2. Authenticated HTTP Requests

```js
import { sdkAuthRequest, MethodsHttp } from "sdk-javipopopo";

const BASE_URL = process.env.API_BASE_URL || "https://api.example.com/api/v2";
const token = process.env.API_TOKEN;

// GET request with authentication
const profile = await sdkAuthRequest(
  BASE_URL,
  "users/profile",
  { method: MethodsHttp.GET, cache: "no-store" },
  token
);

// POST request with authentication
const product = await sdkAuthRequest(
  BASE_URL,
  "products",
  {
    method: MethodsHttp.POST,
    body: JSON.stringify({ name: "New Product", price: 19.99 }),
    headers: { 'Content-Type': 'application/json' }
  },
  token
);

// PUT request with authentication
const updatedUser = await sdkAuthRequest(
  BASE_URL,
  "users/123",
  {
    method: MethodsHttp.PUT,
    body: JSON.stringify({ name: "Updated Name" }),
    headers: { 'Content-Type': 'application/json' }
  },
  token
);

// DELETE request with authentication
const deleted = await sdkAuthRequest(
  BASE_URL,
  "users/123",
  { method: MethodsHttp.DELETE },
  token
);
```

### 3. File Operations (Upload/Download)

```js
import { sdkFileRequest } from "sdk-javipopopo";

const BASE_URL = "https://api.example.com";
const token = "your-auth-token";

// Upload file with progress tracking
const uploadResult = await sdkFileRequest('upload', {
  baseURL: BASE_URL,
  path: '/upload-file',
  file: fileInput.files[0],
  token: token,
  onProgress: (progress, onCancel) => {
    console.log(`Upload progress: ${progress}%`);
    
    // Cancel upload if needed
    if (progress > 50) {
      onCancel();
    }
  }
});

// Download file with progress tracking
const downloadUrl = await sdkFileRequest('download', {
  baseURL: BASE_URL,
  path: '/download',
  url: 'https://example.com/file-to-download.pdf',
  token: token,
  onProgress: (progress, onCancel) => {
    console.log(`Download progress: ${progress}%`);
  }
});

// Use the downloaded file URL
const link = document.createElement('a');
link.href = downloadUrl;
link.download = 'downloaded-file.pdf';
link.click();
```

### 4. File Operations with Abort Signal

```js
import { sdkFileRequest } from "sdk-javipopopo";

// Create abort controller for cancellation
const controller = new AbortController();

// Download with abort signal
const downloadPromise = sdkFileRequest('download', {
  baseURL: 'https://api.example.com',
  path: '/download',
  url: 'large-file-url',
  token: 'your-token',
  signal: controller.signal,
  onProgress: (progress, onCancel) => {
    console.log(`Download: ${progress}%`);
  }
});

// Cancel download after 5 seconds
setTimeout(() => {
  controller.abort();
}, 5000);

try {
  const result = await downloadPromise;
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Download cancelled');
  }
}
```

### 5. Query Parameter Building

```js
import { buildQueryParams } from "sdk-javipopopo";

// Build query parameters
const params = buildQueryParams({
  page: 1,
  limit: 10,
  search: "john doe",
  active: true,
  categories: ["tech", "science"]
});

console.log(params); // "?page=1&limit=10&search=john%20doe&active=true&categories=tech&categories=science"

// Use with requests
const users = await sdkRequest(
  BASE_URL,
  `users${params}`,
  { method: MethodsHttp.GET }
);
```

### 6. Available HTTP Methods

```js
import { MethodsHttp } from "sdk-javipopopo";

// Available methods
MethodsHttp.GET     // GET request
MethodsHttp.POST    // POST request
MethodsHttp.PUT     // PUT request
MethodsHttp.DELETE  // DELETE request
MethodsHttp.PATCH   // PATCH request
```

## API Reference

### `sdkRequest<T>(baseURL, requestURL, options?): Promise<T>`

Makes a basic HTTP request without authentication.

**Parameters:**
- `baseURL` (string): Base URL for the API
- `requestURL` (string): Endpoint path
- `options` (RequestInit, optional): Fetch options

**Returns:** Promise resolving to the response data

### `sdkAuthRequest<T>(baseURL, requestURL, options?, token?, errorHandler?): Promise<T>`

Makes an authenticated HTTP request.

**Parameters:**
- `baseURL` (string): Base URL for the API
- `requestURL` (string): Endpoint path
- `options` (RequestInit, optional): Fetch options
- `token` (string, optional): Authentication token
- `errorHandler` (function, optional): Error handling function

**Returns:** Promise resolving to the response data

### `sdkFileRequest<T>(operation, config): Promise<T>`

Handles file upload/download operations with progress tracking.

**Parameters:**
- `operation` ('upload' | 'download'): Type of operation
- `config` (object): Configuration object with operation-specific parameters

**Upload Configuration:**
- `baseURL` (string): Base URL for the API
- `path` (string): Upload endpoint path
- `file` (File): File to upload
- `token` (string, optional): Authentication token
- `onProgress` (function, optional): Progress callback
- `signal` (AbortSignal, optional): Abort signal

**Download Configuration:**
- `baseURL` (string): Base URL for the API
- `path` (string): Download endpoint path
- `url` (string): URL of file to download
- `token` (string, optional): Authentication token
- `onProgress` (function, optional): Progress callback
- `signal` (AbortSignal, optional): Abort signal

**Returns:** 
- Upload: Promise resolving to server response
- Download: Promise resolving to blob URL

### `buildQueryParams(params): string`

Builds query parameter string from object.

**Parameters:**
- `params` (object): Object with key-value pairs

**Returns:** Query string with leading '?'

## Error Handling

The SDK provides comprehensive error handling:

```js
try {
  const response = await sdkAuthRequest(BASE_URL, "users", { method: MethodsHttp.GET }, token);
} catch (error) {
  if (error.type === 'API_ERROR') {
    console.error('API Error:', error.message);
  } else {
    console.error('Network Error:', error);
  }
}
```

## TypeScript Support

The SDK is fully typed with TypeScript. All functions provide proper type inference:

```typescript
import { sdkRequest, sdkAuthRequest, sdkFileRequest, MethodsHttp } from "sdk-javipopopo";

// Type is automatically inferred
const users: User[] = await sdkRequest<User[]>(BASE_URL, "users", { method: MethodsHttp.GET });

// File operations have smart type inference based on operation
const uploadResult = await sdkFileRequest('upload', {
  // TypeScript knows this needs file, baseURL, path, etc.
});

const downloadUrl = await sdkFileRequest('download', {
  // TypeScript knows this needs url, baseURL, path, etc.
});
```

## Changelog

### v2.1.0

- Added `sdkFileRequest` for file upload/download operations
- Added support for progress tracking in file operations
- Added support for AbortSignal in file operations
- Improved TypeScript type inference
- Added comprehensive error handling for file operations

### v2.0.2

- Improved error handling
- Better TypeScript support
- Performance optimizations
- Added support for custom headers

## License

MIT © all rights to Master Javi
[repository](https://github.com/DarthKenar)
