import express from "express";
import { router } from "./router";
import {prisma} from "./prisma";

const app = express();

try {
  prisma.$connect();
} catch (e) {
  console.log(e);
}

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
