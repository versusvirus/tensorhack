const host = 'https://tensorhack.herokuapp.com';
/**
 * Функция вызывает GET метод, возвращает обещание,
 * обещание вовзвращает готовые данные в случае успеха, объект ошибки в случае неудачи
 * @param serviceMethod {String}
 * @param query
 * @param param
 * @returns {Promise<any>}
 */
export async function get(serviceMethod, query, param) {
    const fetchResponse = await fetch(`${host}/${serviceMethod}${param ? `/${param}` : ''}${query ? `?${getQueryString(query)}` : ''}`);

    if (fetchResponse.ok) {
        return await fetchResponse.json();
    } else {
        throw new Error(`Service did't return response`);
    }

    function getQueryString(queryObj) {
        return Object.keys(queryObj).map((key) => `${key}=${queryObj[key].toString()}`).join('&');
    }
}

/**
 * Функция зовет метод post
 * @param serviceMethod {String}
 * @param body
 * @returns {Promise<any>}
 */
export async function post(serviceMethod, body) {
    try {
        const fetchResponse = await fetch(`${host}/${serviceMethod}`, {
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
export async function deleteCall(serviceMethod, body, param) {
    try {
        const fetchResponse = await fetch(`${host}/${serviceMethod}${param ? `/${param}` : ''}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });

        if (fetchResponse.ok) {
            return true;
        } else {
            throw new Error(`Service did't return response`);
        }
    } catch (err) {
        throw new Error(`Service did't return response -  ${err.toString()}`);
    }
}

export async function put(serviceMethod, body, param) {
    try {
        const fetchResponse = await fetch(`${host}/${serviceMethod}${param ? `/${param}` : ''}`, {
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
