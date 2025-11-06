import { API_BASE_URL } from '../config';

async function handleJsonResponse(response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

export async function listComptes() {
  const response = await fetch(`${API_BASE_URL}/comptes`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  return handleJsonResponse(response);
}

export async function createCompte(payload) {
  const response = await fetch(`${API_BASE_URL}/comptes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  return handleJsonResponse(response);
}



