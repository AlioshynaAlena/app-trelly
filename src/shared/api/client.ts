import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema";


export const client = createClient<paths>({ baseUrl: "https://trelly.it-incubator.app/api/1.0/" });

// client.GET('/boards/tasks')

const myMiddleware: Middleware = {
    async onRequest({ request }) {
        request.headers.set("API-KEY", "");
        return request;
    }
};


client.use( myMiddleware )
