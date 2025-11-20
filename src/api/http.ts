export async function authFetch(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token");

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
}
