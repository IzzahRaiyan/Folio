
const API_URL = "http://localhost:5000/api";

export async function getEntries() {
  const response = await fetch(`${API_URL}/entries`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load your entries.");
  }

  return data;
}

export async function createEntry(entryData) {
  const response = await fetch(`${API_URL}/entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(entryData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to save your entry.");
  }

  return data;
}

export async function deleteEntry(entryId) {
  const response = await fetch(`${API_URL}/entries/${entryId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Unable to delete your entry.");
  }

  return response.status === 204 ? null : response.json();
}


export async function updateEntry(entryId, entryData) {
  const response = await fetch(`${API_URL}/entries/${entryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(entryData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to update your entry.");
  }

  return data;
}
