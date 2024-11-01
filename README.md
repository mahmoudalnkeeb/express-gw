# express-gw

API Gateway using Node.js and Express.js, featuring rate-limiting, error handling, and service status monitoring.

## Features

- **Rate Limiting**: Restricts the number of requests a client can make within a set timeframe.
- **Service Status Monitoring**: Provides an endpoint to check the statuses of downstream services.
- **Proxy Routing**: Forwards API requests to different services based on configured routes.
- **Error Handling**: Custom middlewares for handling errors and 404 responses.

## Prerequisites

- **Node.js**: Ensure Node.js is installed (Node.js 20.18.0 recommended).
- **NPM**: Comes with Node.js and is used for dependency management.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mahmoudalnkeeb/express-gw.git
   cd express-gw
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment configuration**:
   Create a `.env` file in the project root and define environment variables:

   ```env
   PORT=8080
   ORIGINS=http://your-frontend-url.com
   NODE_ENV=development
   ```

4. **Configure services**:
   Define your services in `configs/services.config.js`. Example:

   ```javascript
   module.exports = {
     services: [
       { route: '/users', target: 'http://localhost:8081' },
       { route: '/posts', target: 'http://localhost:8082' },
       // Additional services...
     ],
   };
   ```

## Usage

1. **Start the Gateway**:

   ```bash
   npm start
   ```

   The gateway will start on the specified `PORT` (default: `8080`).

2. **Endpoints**:

   - **Proxied Endpoints**: Requests are routed based on the `route` configuration in `services.config.js`. For example:

     ```
     GET http://localhost:8080/users/123
     GET http://localhost:8080/posts/456
     ```

   - **Service Status Check**: Check the status of each service.

     ```
     GET http://localhost:8080/status
     ```

3. **Rate Limiting**:
   - Each route has a rate limit configured in `ratelimiterMw`. By default, `RPM` is set to `100` requests per minute.

## Error Handling

- **404 Middleware** (`notfound.mw.js`): Returns a 404 response for undefined routes.
- **Error Middleware** (`error.mw.js`): Handles errors globally, returning JSON error messages.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
