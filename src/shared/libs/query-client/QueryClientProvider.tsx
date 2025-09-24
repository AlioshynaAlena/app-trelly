import {type PropsWithChildren} from "react";
import {QueryClientContext} from "./QueryClientContext.tsx";
import type { QueryClient } from "./query-client.ts";

type Props = {
    client: QueryClient
}
export const QueryClientProvider = ({client, children}: PropsWithChildren<Props>) => {
    return (
        <QueryClientContext value={client}>
            {children}
        </QueryClientContext>
    )
}
