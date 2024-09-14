const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('userdata.json');
const middlewares = jsonServer.defaults();

// 모든 도메인에서의 요청을 허용하는 CORS 설정
server.use(cors());
server.use(middlewares);
server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running on port 5000');
});
