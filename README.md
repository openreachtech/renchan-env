# renchan-env

## Overview

* This is a module to integrate and manage `process.env` and `.env` file.

* You can prepare `.env` files for each `NODE_ENV`.

## Usage

1. Write about npm config in `.npmrc`

  - [ ] Create `.npmrc` on application project root if not exeists.
  - [ ] Write contents below if it is not exists.
    ```
    @openreachtech:registry=https://npm.pkg.github.com
    ```
2. install for each application.

  - [ ] install rechan-env.

    ```
    npm install @openreachtech/renchan-env
    ```
3. create require files in application.

  - [ ] `[project root]/.env.development` (for `npm test` and `npm run dev`)
    ```
    API_HOST = openreach.tech
    API_KEY = hash-of-api-key
    ```
  - [ ] `[project root]/as/you/like/appEnv.js`

    ```
    const Environment = require('@openreachtech/renchan-env')

    module.exports = /** @type {{
      NODE_ENV: string,

      API_HOST: string,
      API_KEY: string,
    }} */ (Environment.createEnv())
    ```
4. call env from application code.

  * Sample code.

    ```sample.js
    const ApiClient = require('api/ApiClient')
    const env = require('as/you/like/appEnv')

    const client = new ApiClient({
      API_HOST: env.API_HOST,
      API_KEY: env.API_KEY,
    })

    console.log(env.NODE_ENV)
    ```

## Exceptions

### No .env file

* When can not open `.env` (or `.env.development`), throws as follows:

  ```
  ENOENT: no such file or directory, open [project root]/.env.development
  ```

### No key of environment variable

* If access to env instance with undefined key, throws as follows:

  ```
  environment variable is not defined [access key]
  ```

  ```sample.js
  const env = require('as/you/like/appEnv')

  console.log(env.UNKNOWN_KEY) // throws 'environment variable is not defined [UNKNOWN_KEY]'
  ```

## Copyright

© 2022 Open Reach Tech inc.
