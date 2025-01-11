import fastify from "fastify";
import multipart from '@fastify/multipart'

import Routes from "./src/http/routes";

const app = fastify();

const fiftyMBInBytes = 100 * 1024 * 1024;

app.register(multipart, {
    limits: {
        fileSize: fiftyMBInBytes,
        files: 1
    }
});
app.register(Routes);

const serverPort = Number(process.env.PORT) || 3000;

app.listen({ port: serverPort }).then(() => {
    console.log("Server is running on port 3000");
});