import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { config } from "dotenv";
import { animal } from "./routes/animals.js";
import { employe } from "./routes/employes.js";
import { cors } from "hono/cors";
import { enclosure } from "./routes/enclosures.js";
config();

const app = new Hono();
app.use("*", cors());

app.get("/", (c) => c.text("Hello Hono"));
app.route("/animals", animal);
app.route("/employes", employe);
app.route("/enclosures", enclosure);

serve(
  {
    fetch: app.fetch,
    port: 8080,
  },
  (info) => {
    console.log(`Server is running on http://${info.address}:${info.port}`);
  }
);
