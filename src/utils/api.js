const baseURL = "http://localhost:3001/items";

async function apiRequest(url, options={}) {
  const res = await fetch(url, options);
  return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
}

export async function getItems() {
  return await apiRequest(`${baseURL}`);
}

export async function addItem({_id, name, weather, imageUrl}, token) {
  return await apiRequest(`${baseURL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({_id, name, weather, imageUrl}),
  });
}

export async function deleteItem(id, token) {
  return await apiRequest(`${baseURL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateUserProfile({name, avatar}, token) {
  return await apiRequest(`${baseURL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({name, avatar}),
  });
}