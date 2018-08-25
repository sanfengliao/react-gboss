import Axios from "axios"

Axios.defaults.withCredentials = true;

export default function ajax(url, data, type = 'GET') {
    if (type === 'GET') {
        let dataStr = '';
        if(data) {
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&';
            })
        }
        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
            url = url + '?' + dataStr;
        }
        return Axios.get(url);
    } else {
        return Axios.post(url, data);
    }
}