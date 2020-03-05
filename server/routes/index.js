const taskController = require("../controllers").tasks;
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../../swagger.json");

module.exports = (app) => {
  app.use("/api/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  app.post("/api/tasks", taskController.create);
  app.get("/api/tasks", taskController.list);
  app.get("/api/tasks/:taskId", taskController.get);
  app.put("/api/tasks/:taskId", taskController.update);
  app.delete("/api/tasks/:taskId", taskController.delete);
};
