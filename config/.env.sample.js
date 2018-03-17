const envBuild = {
  "rest-server": [
    "DEBUG=TRUE",
    "NODE_ENV=test",
    "PORT=3396",
    "LOCAL_USER=root",
    "LOCAL_HOST=localhost",
    "LOCAL_DATABASE=grandmaster",
    "LOCAL_PASSWORD=",
    "LOCAL_PORT=5432",
    "AWS_USER=",
    "AWS_HOST=",
    "AWS_DATABASE=",
    "AWS_PASSWORD=",
    "AWS_PORT=",
    "SALT_ROUNDS=10",
    "TOKEN_SECRET=grandmasterapi"
  ],
  "socket-server": [
    "NODE_ENV=DEVELOPMENT",
    "DEBUG=TRUE",
    "HOST=http://localhost",
    "PORT=4155",
    "REST_SERVER_URL=http://localhost:4990",
    "TOKEN_SECRET=grandmaster"
  ],
  "client/server": ["PORT=1337"],
  "client": [
    "NODE_ENV=DEVELOPMENT",
    "DEBUG=TRUE",
    "ENVPREFIX=REACT_APP_",
    "REST_SERVER_URL=http://localhost:4990",
    "SOCKET_SERVER_URL=http://localhost:4155",
    "REACT_APP_SOCKET_SERVER_URL=http://localhost:4155",
    "REACT_APP_REST_SERVER_URL=http://localhost:4990"
  ],
  "services/boardsolver": [
    "NODE_ENV=DEVELOPMENT",
    "DEBUG=TRUE",
    "HOST=http://localhost",
    "PORT=4000",
    "REST_SERVER_URL=http://localhost:3396",
    "SOCKET_SERVER_URL=http://localhost:4155"
  ],
};

module.exports = envBuild;
