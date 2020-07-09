const headers = new Headers({
    "Accept": "application/json",
  "Content-Type": "application/json"
});

function get(url) {
  return fetch(url, {
    method: "GET",
    headers: headers
  }).then(response => {
      return handleResponse(url, response);
    }).catch(err => {
      console.error(`Request failed. Url = ${url}. Message=${err}`);
      return Promise.reject({ error: { message: "Request failed." } });
    });
}

function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: headers,
    body: data
  }).then(response => {
      return handleResponse(url, response);
    }).catch(err => {
      console.error(`Request failed. Url = ${url}. Message=${err}`);
      return Promise.reject({ error: { message: "Request failed." } });
    });
}

function handleResponse(url, response) {
  if (response.status === 200) {
    return response.json();
  } else {
    console.error(`Request failed. Url = ${url}`);
    return Promise.reject({
      error: { message: "Request failed due to server error" }
    });
  }
}


// 原文链接：https://blog.csdn.net/zuggs_/article/details/80775455

// require('es6-promise').polyfill();
// require('isomorphic-fetch');

// export default function request(method, url, body) {
//     method = method.toUpperCase();
//     if (method === 'GET') {
//         body = undefined;
//     } else {
//         body = body && JSON.stringify(body);
//     }

//     return fetch(url, {
//         method,
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body
//     }).then((res) => {
//         if (res.status >= 200 && res.status < 300) {
//             return res;
//         } else {
//             return Promise.reject('请求失败！');
//         }
//     })
// }

// export const get = path => request('GET', path);
// export const post = (path, body) => request('POST', path, body);
// export const put = (path, body) => request('PUT', path, body);
// export const del = (path, body) => request('DELETE', path, body);




export { get, post };
