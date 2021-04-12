import { serializeFetchParameter } from '@apollo/client';
import { serialize } from 'object-to-formdata';

const options = {
    indices: true,
    allowEmptyArrays: true
};

function buildFormData(formData, data, parentKey) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach((key) => {
            buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
    } else {
        const value = data == null ? '' : data;

        formData.append(parentKey, value);
    }
}

function jsonToFormData(data) {
    const formData = new FormData();

    buildFormData(formData, data, '');

    return formData;
}

const fetcher = async (
    url: string,
    method: string,
    token?: string,
    data?: any,
    file?: boolean
): Promise<Object> => {
    let body: any;

    if (data) {
        if (file) {
            body = serialize(data);
        } else {
            body = JSON.stringify(data);
        }
    }

    let headers = {
        Authorization: token && `Bearer ${token}`
    };

    if (!file) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URI + url, {
        method,
        headers,
        body: body
    });

    return await response.json();
};

export default fetcher;
