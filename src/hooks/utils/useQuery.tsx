import { useEffect, useRef, useState } from "react";

type QueryStatus = 'pending' | 'success' | 'loading'
type Options<T> = {
    queryStatusDefault?: QueryStatus,
    queryKeys: string[],
    queryFn: () => Promise<T>,
    skip?: boolean,
}

//  queryFn:
// Возвращает Promise - асинхронную операцию
// Выполняет API-запрос к серверу
// Преобразует ответ в нужный формат
// Возвращает данные типа T

//parametr object
export function useQuery<T>(options: Options<T>) {
   const [queryStatus, setQueryStatus] = useState<QueryStatus>(options.queryStatusDefault ?? "loading") //FSM
   const [data, setData] = useState<T | null>(null);

   const abortControllerRef = useRef<null | AbortController>(null)


   useEffect( () => {
    abortControllerRef.current?.abort()


     if (options.skip) {
            setQueryStatus('pending');
            setData(null);
            return;
        }
   
   abortControllerRef.current = new AbortController();
   setQueryStatus('loading')

   options.queryFn().then(json => {
    setData(json)
    setQueryStatus('success')
   })
   
    }, options.queryKeys)


   return {status: queryStatus, data } 
}
