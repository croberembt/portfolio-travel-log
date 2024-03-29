const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:1337' : 'https://oberembt-travel-log-server.vercel.app'; 

console.log(API_URL); 

export async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`, {
    headers: {
      'content-type': 'application/json',
    },
  });

  return response.json(); 
}

export async function createLogEntry(entry) {
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(entry)
  });
  return response.json(); 
} 