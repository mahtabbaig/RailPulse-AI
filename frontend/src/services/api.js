const API_URL = "http://127.0.0.1:8000";

export async function checkBackend() {
  const response = await fetch(`${API_URL}/`);

  if (!response.ok) {
    throw new Error("Backend is not responding");
  }

  return response.json();
}

export async function getETA(trainNumber) {
  const response = await fetch(
    `${API_URL}/api/eta?train_number=${trainNumber}`
  );

  if (!response.ok) {
    throw new Error("ETA data could not be fetched");
  }

  return response.json();
}