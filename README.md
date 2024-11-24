# sdk-javipopopo

![Javipopopo](https://static.vecteezy.com/system/resources/previews/021/172/338/non_2x/cute-cow-with-crown-cartoon-illustration-for-kids-vector.jpg)

## About

no dependencies, only fetch with or without auth

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

```js
import { sdkAuthRequest, MethodsHttp } from "sdk-javipopopo";

// considering use environment variables
// const BASE_URL = process.env.BASE_URL;
const BASE_URL = "https://api.javipopopo.com/api/v1"; //your base url
const urlRequest = "login"; //your url request
const token = "token"; //your auth token

const response: DefaultResponse = await sdkAuthRequest(
  urlRequest,
  { method: MethodsHttp.GET, cache: "no-store" },
  token,
  BASE_URL
);
```

## License

MIT © all rights to Master Javi
[repository](https://github.com/DarthKenar)
