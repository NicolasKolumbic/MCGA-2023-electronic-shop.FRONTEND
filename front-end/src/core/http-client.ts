"use client";
export const httpClient = () => {
    const baseUrl = 'http://localhost:3005/api/v1/';
    const get = async (url: string, options?: any) => {
        const result = await fetch(`${baseUrl}${url}`).then((res) => res.json());
        return result;
    }

    return {
        get: function<T>(url: string, options?: any){ return get(url, options) as T}
    }
}