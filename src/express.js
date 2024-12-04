const express = require("express");
const cors = require('cors');
const userRouter = require("./routes/UserRouter");
const taskRouter = require("./routes/TaskRouter");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Rotas protegidas com autenticação
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
});
