const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
} as const;

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data : Record<string, any> | undefined | null) {
    if (!data) return '';
    const arr = Object.entries(data);
    const length = arr.length;
    if (!length)
        return '';
    return arr.reduce((res, el, index) => {
        return `${res}${el[0]}=${el[1]}${index !== (length - 1) ? '&' : ''}`
    }, '?');
}
type Options = {
    headers?: Record<string, any>,
    data?: Record<string, any>,
    method?: keyof typeof METHODS | Lowercase<keyof typeof METHODS>,
    timeout?: number,
    retries?: number
}
export class HTTPTransport {
    static API_URL = 'https://ya-praktikum.tech/api/v2';
    protected endpoint: string;
    protected defaultTimeout: number = 5000;
    constructor(endpoint: string) {
        this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
    }
    public get (path: string, options?: Options) : Promise<XMLHttpRequest> {

        return this.request(this.endpoint + path, { ...options, method: METHODS.GET }, options?.timeout ?? this.defaultTimeout);
    };
    public post  (path: string, options?: Options ) : Promise<XMLHttpRequest> {

        return this.request(this.endpoint + path, { ...options, method: METHODS.POST }, options?.timeout ?? this.defaultTimeout);
    };
    public put(path: string, options: Options ) : Promise<XMLHttpRequest>  {

        return this.request(this.endpoint + path, { ...options, method: METHODS.PUT }, options?.timeout ?? this.defaultTimeout);
    };
    public delete (path: string, options: Options ) : Promise<XMLHttpRequest>{

        return this.request(this.endpoint + path, { ...options, method: METHODS.DELETE }, options?.timeout ?? this.defaultTimeout);
    };

    private request (url: string, options: Options & {method :string}, timeout = 5000): Promise<XMLHttpRequest> {
        return new Promise((res, rej) => {
            const xhr = new XMLHttpRequest();
            setTimeout(() => {
                xhr.abort();
                rej(xhr);
            }, timeout);
            xhr.open(options.method, url + (['GET', 'DELETE'].includes(options.method) ? queryStringify(options.data) : ''));
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            if (options.headers && typeof options.headers === 'object')
                Object.entries(options.headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
            xhr.onload = () => {
                res(xhr);
            };

            const handleError = (err: any) => {
                throw new Error(err)
            };
            xhr.withCredentials = true;
            xhr.onabort = handleError;
            xhr.onerror = handleError;
            xhr.ontimeout = handleError;
            if (['GET', 'DELETE'].includes(options.method))
                xhr.send();
            else
                xhr.send(options.data instanceof FormData ? options.data: JSON.stringify(options.data));
        })
    };
}
export default function fetchWithRetry(url: string, options: Options) {
    let { retries, method } = options;
    const transport = new HTTPTransport(url);
    if (!retries)
        retries = 1;
    if (
        (Object.keys(METHODS) as (keyof typeof METHODS)[]).find((key) => {
            return METHODS[key] === options?.method?.toLowerCase();
        })
    )
    {
        method =  (Object.keys(METHODS) as (keyof typeof METHODS)[]).find((key) => {
            return METHODS[key] === options?.method?.toLowerCase();
        }) ?? 'GET';
    }
    else
        return;
    function onError(err: Error){
        const triesLeft = retries! - 1;
        if(!triesLeft){
            throw err;
        }
        // @ts-ignore
        return transport[method.toLowerCase()](url, options).then(() => fetchWithRetry(url, options));
    }
    return fetch(url,options).catch(onError);
}