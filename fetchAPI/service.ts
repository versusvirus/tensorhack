/**
 * Функция вызывает GET метод, возвращает обещание,
 * обещание вовзвращает готовые данные в случае успеха, объект ошибки в случае неудачи
 * @param serviceMethod {String}
 * @param query
 * @returns {Promise<any>}
 */
export async function get(serviceMethod: string, query?: any = {}, param?: string) {
    const fetchResponse = await fetch(`/${serviceMethod}${param ? `/${param}` : ''}${query ? `?${getQueryString(query)}` : ''}`);

    if (fetchResponse.ok) {
        return await fetchResponse.json();
    } else {
        throw new Error(`Service did't return response`);
    }

    function getQueryString(queryObj: any): string {
        return Object.keys(queryObj).map((key) => `${key}=${JSON.stringify(queryObj[key])}`).join('&');
    }
}

/**
 * Функция зовет метод post
 * @param serviceMethod {String}
 * @param body
 * @returns {Promise<any>}
 */
export async function post(serviceMethod: string, body: any) {
    try {
        const fetchResponse = await fetch(`/${serviceMethod}`, {
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });

        if (fetchResponse.ok) {
            return await fetchResponse.json();
        } else {
            throw new Error(`Service did't return response`);
        }
    } catch (err) {
        throw new Error(`Service did't return response -  ${err.toString()}`);
    }
}

/**
 * Функция зовет метод delete
 * @param serviceMethod {String}
 * @param body
 * @returns {Promise<any>}
 */
export async function deleteCall(serviceMethod: string, body: any, param: string) {
    try {
        const fetchResponse = await fetch(`/${serviceMethod}${param ? `/${param}` : ''}`, {
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });

        if (fetchResponse.ok) {
            return await fetchResponse.json();
        } else {
            throw new Error(`Service did't return response`);
        }
    } catch (err) {
        throw new Error(`Service did't return response -  ${err.toString()}`);
    }
}

export async function put(serviceMethod: string, body: any, param: string) {
    try {
        const fetchResponse = await fetch(`/${serviceMethod}${param ? `/${param}` : ''}`, {
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        });

        if (fetchResponse.ok) {
            return await fetchResponse.json();
        } else {
            throw new Error(`Service did't return response`);
        }
    } catch (err) {
        throw new Error(`Service did't return response -  ${err.toString()}`);
    }
}
