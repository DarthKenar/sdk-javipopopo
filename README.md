# sdk-javipopopo v2.0.2

![Javipopopo](https://static.vecteezy.com/system/resources/previews/021/172/338/non_2x/cute-cow-with-crown-cartoon-illustration-for-kids-vector.jpg)

## About

A lightweight SDK for making HTTP requests with or without authentication tokens. Optimized for speed and ease of use.

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

### Making authenticated requests

```js
import { sdkAuthRequest, MethodsHttp } from "sdk-javipopopo";

// Using environment variables (recommended)
const BASE_URL = process.env.API_BASE_URL || "https://api.example.com/api/v2";
const token = process.env.API_TOKEN;

// Example GET request with authentication
const getResponse = await sdkAuthRequest(
  BASE_URL,
  "users/profile",
  { method: MethodsHttp.GET, cache: "no-store" },
  token
);

// Example POST request with authentication and body
const postResponse = await sdkAuthRequest(
  BASE_URL,
  "products",
  {
    method: MethodsHttp.POST,
    body: JSON.stringify({ name: "New Product", price: 19.99 }),
    headers: { 'Content-Type': 'application/json' }
  },
  token
);
```

### Making requests without authentication

```js
import { sdkRequest, MethodsHttp } from "sdk-javipopopo";

const BASE_URL = "https://api.example.com/api/v2";

const response = await sdkRequest(
  BASE_URL,
  "public/data",
  { method: MethodsHttp.GET }
);
```

### Available HTTP methods

```js
import { MethodsHttp } from "sdk-javipopopo";

// Available methods
MethodsHttp.GET     // GET request
MethodsHttp.POST    // POST request
MethodsHttp.PUT     // PUT request
MethodsHttp.DELETE  // DELETE request
MethodsHttp.PATCH   // PATCH request
```

## Changelog

### v2.0.2

- Improved error handling
- Better TypeScript support
- Performance optimizations
- Added support for custom headers

## License

MIT © all rights to Master Javi
[repository](https://github.com/DarthKenar)
