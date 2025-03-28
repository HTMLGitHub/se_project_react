const baseURL = "http://localhost:3001";

export const register = ({name, avatar, email, password}) => 
    authRequest({
        endpoints: "/signup",
        method: "POST",
        body: {name, avatar, email, password},
    });

export const login = ({email, password}) => 
    authRequest({
        endpoints: "/signin",
        method: "POST",
        body: {email, password},
    });

export const checkToken = (token) => 
    authRequest({
        endpoints: "/users/me",
        method: "GET",
        token,
    });

const authRequest = ({endpoints, method = "GET", token = null, body = null}) => {
    const headers = {"Content-Type": "application/json",};
    if (token) headers.Authorization = `Bearer ${token}`;

    return fetch(`${baseURL}/${endpoints}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    }).then(handleResponse);
}

const handleResponse = (res, errorMessage) => {
    return res.ok ? res.json() : Promise.reject(`${errorMessage}: ${res.status}`);
};