import fastify from "fastify";
import { exec } from "child_process";

let app = fastify();

let host = process.env.HOST || "0.0.0.0";
let port = process.env.PORT || 3000;

app.listen({ host, port }, (e, a) => {
  e && err(e) && process.exit(1);
  console.log(`Coinos CI server listening on ${a}`);
});

app.post("/hook", async (req, res) => {
  console.log(req.headers)
  exec("sh deploy", (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });

  res.send({});
});
