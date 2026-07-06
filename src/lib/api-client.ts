const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

/**
 * Fetches a fresh better-auth JWT from the same-origin auth server.
 * This call is same-origin, so the session cookie is sent automatically and
 * the returned JWT can then be forwarded to the cross-domain API.
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/token", { credentials: "include" });
    if (!res.ok) return null;
    const data = (await res.json()) as { token?: string };
    return data.token ?? null;
  } catch {
    return null;
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await getAuthToken();
  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      // Don't force Content-Type for FormData (browser sets the boundary).
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
