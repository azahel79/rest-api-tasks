const App = require("./config/App/task");

const taskApi = new App();

taskApi.conectedDB();
taskApi.controllers();
taskApi.middlewares();
taskApi.routes();
taskApi.listen();   




