// import { useEffect, useRef, useState } from "react";

// type QueryStatus = 'pending' | 'success' | 'loading'
// type Options<T> = {
//     queryStatusDefault?: QueryStatus,
//     queryKeys: string[],
//     queryFn: () => Promise<T>,
//     skip?: boolean,
// }

// //  queryFn:
// // Возвращает Promise - асинхронную операцию
// // Выполняет API-запрос к серверу
// // Преобразует ответ в нужный формат
// // Возвращает данные типа T

// //parametr object
// export function useQuery<T>(options: Options<T>) {
//    const [queryStatus, setQueryStatus] = useState<QueryStatus>(options.queryStatusDefault ?? "loading") //FSM
//    const [data, setData] = useState<T | null>(null);

//    const abortControllerRef = useRef<null | AbortController>(null)


//    useEffect( () => {
//     abortControllerRef.current?.abort()


//      if (options.skip) {
//             setQueryStatus('pending');
//             setData(null);
//             return;
//         }
   
//    abortControllerRef.current = new AbortController();
//    setQueryStatus('loading')

//    options.queryFn().then(json => {
//     setData(json)
//     setQueryStatus('success')
//    })
   
//     }, options.queryKeys)


//    return {status: queryStatus, data } 
// }



import {useEffect, useRef, useState} from "react";
import type { Entry, QueryFnParams, QueryKey } from "../../query-client";
import { queryClient } from "../../query-client-instance";



type Options<T> = {
    queryFn: (params: QueryFnParams) => Promise<T>
    enabled?: boolean
    queryKey: QueryKey
}

export function useQuery<D>(options: Options<D>) {
    const {
        queryFn,
        enabled = true,
        queryKey
    } = options;

    if (!queryKey) { // invariants checking
        throw new Error('queryKey is required')
    }

    const initEntry = queryClient.initEntry(queryKey, enabled);

    // const [status, setStatus] = useState<'pending' | 'success' | 'loading'>('loading') // FSM
    // const [data, setData] = useState<D | null>(null)

    const [entry, setEntry] = useState<Entry>(initEntry)

    useEffect(() => {
        setEntry(initEntry);
    }, [initEntry])

    const abortControllerRef = useRef<AbortController>(null)


    useEffect(() => {

        abortControllerRef.current?.abort('Abort because new request')

        // if (queryKey.some(k => k === null)) {
        //     //if (!queryKey.every(k => k !== null)){
        //     // setStatus('pending')
        //     // setData(null)
        //     return
        // }

        if (!enabled) {
            return
        }


        abortControllerRef.current = new AbortController()

        const subscriber = () => {
            setEntry({...queryClient.get(queryKey)});
        }

        let unsubscribe: () => void;

        queryClient.fetch(queryFn, queryKey, abortControllerRef.current.signal)
            .then((e) => {
                unsubscribe = queryClient.subscribe(queryKey, subscriber)
                setEntry({...e})
            });

        return () => {
            unsubscribe?.();
        }
    }, queryKey)

    return {
        data: entry?.data, status: entry?.status ?? 'loading'
    }
}
