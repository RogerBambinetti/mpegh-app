import fastify from "fastify";
import multipart from '@fastify/multipart'

import Routes from "./src/http/routes";

const app = fastify();

app.register(multipart, {
    limits: {
        fileSize: Number.MAX_SAFE_INTEGER,
        files: 1
    }
});
app.register(Routes);

const serverPort = Number(process.env.PORT) || 3000;

app.listen({ port: serverPort }).then(() => {
    console.log("Server is running on port 3000");
});