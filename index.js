import express from "express";
import { PORT } from "./helpers/config-env.js";
import cors from "cors";
import route from "./routes/index.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routers
route(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})