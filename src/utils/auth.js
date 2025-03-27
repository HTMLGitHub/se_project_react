const baseURL = "http://localhost:3001";

export const register = ({name, avatar, email, password}) => {
    return fetch(`${baseURL}/signup`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({name, avatar, email, password}),
    })
        .then((res) => {
            res.ok ? res.json() : Promise.reject(`Registration Error: ${res.status}`);
        });
    };

export const login = ({email, password}) => {
    return fetch(`${baseURL}/signin`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
    })
        .then((res) => {
        res.ok ? res.json() : Promise.reject(`Login Error: ${res.status}`);
        });
    };

export const checkToken = (token) => {
    return fetch(`${baseURL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    })
        .then((res) => {
            res.ok ? res.json() : Promise.reject(`Token Error: ${res.status}`);
        });
    }