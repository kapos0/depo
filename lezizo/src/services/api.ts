const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export async function signUp(email: string, password: string, name: string) {
  const response = await fetch(`${apiUrl}/api/auth/sign-up/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, displayName: name }),
  });
  if (!response.ok) throw new Error("Kayıt oluşturulamadı. Bilgilerini kontrol et.");
  return response.json();
}

export async function signIn(email: string, password: string) {
  const response = await fetch(`${apiUrl}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Giriş yapılamadı. E-posta veya şifre hatalı.");
  return response.json();
}

export async function suggestRecipe(ingredients: string) {
  const response = await fetch(`${apiUrl}/api/ai`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });
  if (!response.ok) throw new Error("AI önerisi alınamadı. Sunucunun çalıştığından emin ol.");
  return response.json() as Promise<{ name: string; description: string; steps: string[] }>;
}
