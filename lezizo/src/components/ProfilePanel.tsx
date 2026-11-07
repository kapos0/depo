import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { signIn, signUp } from "../services/api";

export function ProfilePanel() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signUp");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setMessage("");
    try {
      await (mode === "signUp" ? signUp(email, password, name) : signIn(email, password));
      setMessage(mode === "signUp" ? "Profilin oluşturuldu. Hoş geldin!" : "Giriş başarılı. Hoş geldin!");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return <View style={styles.panel}>
    <Text style={styles.eyebrow}>KİŞİSEL HESABIN</Text>
    <Text style={styles.title}>{mode === "signUp" ? "Profilini oluştur" : "Tekrar hoş geldin"}</Text>
    <Text style={styles.subtitle}>Favorilerini ve menünü cihazlar arasında sakla.</Text>
    {mode === "signUp" && <TextInput value={name} onChangeText={setName} placeholder="Adın" placeholderTextColor="#A49D95" style={styles.input} />}
    <TextInput value={email} onChangeText={setEmail} placeholder="E-posta" placeholderTextColor="#A49D95" autoCapitalize="none" keyboardType="email-address" style={styles.input} />
    <TextInput value={password} onChangeText={setPassword} placeholder="Şifre" placeholderTextColor="#A49D95" secureTextEntry style={styles.input} />
    <Pressable onPress={submit} disabled={loading} style={styles.primary}><Text style={styles.primaryText}>{loading ? "Bekle..." : mode === "signUp" ? "Profil oluştur" : "Giriş yap"}</Text></Pressable>
    <Pressable onPress={() => setMode(mode === "signUp" ? "signIn" : "signUp")}><Text style={styles.switch}>{mode === "signUp" ? "Zaten hesabın var mı? Giriş yap" : "Yeni profil oluştur"}</Text></Pressable>
    {!!message && <Text style={styles.message}>{message}</Text>}
  </View>;
}

const styles = StyleSheet.create({
  panel: { backgroundColor: "#FFF", borderRadius: 20, padding: 18, borderWidth: 1, borderColor: "#EAE4DC" },
  eyebrow: { color: "#F26A3D", fontSize: 10, fontWeight: "800", letterSpacing: 1.5 },
  title: { color: "#242321", fontSize: 24, fontWeight: "800", marginTop: 7 },
  subtitle: { color: "#77736D", fontSize: 13, lineHeight: 19, marginTop: 6, marginBottom: 15 },
  input: { height: 48, borderRadius: 12, borderWidth: 1, borderColor: "#EAE4DC", color: "#242321", paddingHorizontal: 13, marginBottom: 10 },
  primary: { backgroundColor: "#F26A3D", borderRadius: 12, alignItems: "center", paddingVertical: 14, marginTop: 3 },
  primaryText: { color: "#FFF", fontSize: 13, fontWeight: "800" },
  switch: { color: "#F26A3D", textAlign: "center", fontSize: 12, fontWeight: "700", marginTop: 15 },
  message: { color: "#397347", backgroundColor: "#EAF6EC", borderRadius: 8, padding: 10, fontSize: 12, marginTop: 13 },
});
