import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";
import multipart from '@fastify/multipart'

import Routes from "./src/http/routes";

const app = fastify();

const fiftyMBInBytes = 100 * 1024 * 1024;

app.register(cors, { origin: "*" });
app.register(multipart, {
    limits: {
        fileSize: fiftyMBInBytes,
        files: 10
    }
});
app.register(Routes);

const serverPort = Number(process.env.HTTP_PORT);

app.listen({ port: serverPort }).then(() => {
    console.log("Server is running on port", serverPort);
});