export function formatDate(date) {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export const baseUrl = `${import.meta.env.VITE_APP_URL}/api`;
