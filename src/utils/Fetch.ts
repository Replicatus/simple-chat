const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
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
    data?: {},
    method: keyof typeof METHODS | Lowercase<keyof typeof METHODS>,
    timeout?: number,
    retries: number
}
class HTTPTransport {
    get = (url: string, options: Options) => {

        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    };
    post = (url: string, options: Options ) => {

        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };
    put = (url: string, options: Options ) => {

        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };
    delete = (url: string, options: Options ) => {

        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };
    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    request = (url: string, options: Options & {method :string}, timeout = 5000) => {
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

            xhr.onabort = handleError;
            xhr.onerror = handleError;
            xhr.ontimeout = handleError;
            if (['GET', 'DELETE'].includes(options.method))
                xhr.send();
            else
                xhr.send(JSON.stringify(options.data));
        })
    };
}
export default function fetchWithRetry(url: string, options: Options) {
    let { retries, method } = options;
    const transport = new HTTPTransport();
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
        const triesLeft = retries - 1;
        if(!triesLeft){
            throw err;
        }
        // @ts-ignore
        return transport[method.toLowerCase()](url, options).then(() => fetchWithRetry(url, options));
    }
    return fetch(url,options).catch(onError);
}