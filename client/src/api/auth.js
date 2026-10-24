
const API_URL = "http://localhost:5000/api";

export async function signupUser(userData) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to create your account.");
  }

  return data;
}

export async function loginUser(userData) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to log in.");
  }

  return data;
}

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/auth/me`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to verify your session.");
  }

  return data;
}

export async function logoutUser() {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to log out.");
  }

  return data;
}
