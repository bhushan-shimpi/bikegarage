const isDev = (import.meta as any).env?.DEV;
const API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL ||
  (isDev ? 'http://localhost:5000' : 'https://bikegarage-yr7m.vercel.app');

// Automatic Keep-Alive: Calls /api/health every 5 minutes so server and Supabase never sleep
const KEEP_ALIVE_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

export const pingServerHealth = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      console.log('💚 [Keep-Alive 5-min Ping] Health check OK:', data.timestamp || new Date().toISOString());
      return true;
    }
  } catch (err: any) {
    console.warn('⚠️ [Keep-Alive Ping] Notice:', err.message);
  }
  return false;
};

// Start automatic 5-minute heartbeat in the browser
if (typeof window !== 'undefined') {
  pingServerHealth();
  setInterval(pingServerHealth, KEEP_ALIVE_INTERVAL_MS);

  // Instant wakeup ping when user switches back to the tab
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      pingServerHealth();
    }
  });
}

class ApiClient {
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('chaudhari_auto_auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error! status: ${res.status}`);
    }

    return res.json();
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error! status: ${res.status}`);
    }

    return res.json();
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error! status: ${res.status}`);
    }

    return res.json();
  }

  async patch<T>(endpoint: string, body: any): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error! status: ${res.status}`);
    }

    return res.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error! status: ${res.status}`);
    }

    return res.json();
  }
}

export const apiClient = new ApiClient();
export const API_URL = API_BASE_URL;
