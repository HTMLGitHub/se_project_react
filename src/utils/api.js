const baseURL = "http://localhost:3001";
const itemURL = `${baseURL}/items`;

export async function getItems() {
  const res = await fetch(`${baseURL}/items`);
  return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
}


export async function addItem({_id, name, weather, imageUrl}) {
  const res = await fetch(`${itemURL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({_id, name, weather, imageUrl}),
  });
  return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
}

export async function deleteItem(id) {
  const res = await fetch(`${itemURL}/${id}`, {
    method: "DELETE",
  });
  return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
}