import axios from 'axios'

interface IParams {
    method: "GET" | "POST";
    url: string;
}

export function request(params: IParams) {
    return axios({
        method: params.method,
        url: params.url
    })
}