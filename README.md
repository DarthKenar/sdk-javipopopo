# sdk-javipopopo

![Javipopopo](https://static.vecteezy.com/system/resources/previews/021/172/338/non_2x/cute-cow-with-crown-cartoon-illustration-for-kids-vector.jpg)

## About

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
import sdkAuthRequest from "sdk-javipopopo"; 
import { MethodsHttp } from '@/types'; //contain all the http methods

const BASE_URL = "https://api.javipopopo.com/api/v1";
const urlRequest = 'login';
const token = 'token';

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
