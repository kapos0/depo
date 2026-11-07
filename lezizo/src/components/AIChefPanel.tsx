import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { suggestRecipe } from "../services/api";

export function AIChefPanel() {
  const [ingredients, setIngredients] = useState("");
  const [result, setResult] = useState<{ name: string; description: string; steps: string[] } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function askChef() {
    if (!ingredients.trim()) return;
    setLoading(true);
    setError("");
    try { setResult(await suggestRecipe(ingredients)); } catch (cause) { setError(cause instanceof Error ? cause.message : "AI önerisi alınamadı."); } finally { setLoading(false); }
  }

  return <View style={styles.panel}>
    <View style={styles.heading}><Text style={styles.chefIcon}>✦</Text><View><Text style={styles.eyebrow}>LEZİZO AI</Text><Text style={styles.title}>Elindeki malzemelerle ne pişirsek?</Text></View></View>
    <TextInput value={ingredients} onChangeText={setIngredients} placeholder="Örn: patates, yoğurt, nane" placeholderTextColor="#A49D95" style={styles.input} />
    <Pressable onPress={askChef} disabled={loading} style={styles.button}><Text style={styles.buttonText}>{loading ? "Düşünüyor..." : "Tarif öner"}</Text></Pressable>
    {result && <View style={styles.result}><Text style={styles.resultTitle}>{result.name}</Text><Text style={styles.description}>{result.description}</Text>{result.steps.map((step, index) => <Text key={step} style={styles.step}>{index + 1}. {step}</Text>)}</View>}
    {!!error && <Text style={styles.error}>{error}</Text>}
  </View>;
}

const styles = StyleSheet.create({
  panel: { backgroundColor: "#242321", borderRadius: 20, padding: 18, marginTop: 22 },
  heading: { flexDirection: "row", alignItems: "center", gap: 10 },
  chefIcon: { color: "#FFB28F", fontSize: 29 },
  eyebrow: { color: "#FFB28F", fontSize: 10, fontWeight: "800", letterSpacing: 1.5 },
  title: { color: "#FFF", fontSize: 17, fontWeight: "800", marginTop: 4 },
  input: { height: 46, borderRadius: 11, backgroundColor: "#3A3835", color: "#FFF", paddingHorizontal: 12, marginTop: 16 },
  button: { backgroundColor: "#F26A3D", borderRadius: 11, alignItems: "center", paddingVertical: 13, marginTop: 9 },
  buttonText: { color: "#FFF", fontSize: 12, fontWeight: "800" },
  result: { backgroundColor: "#FFF", borderRadius: 12, padding: 13, marginTop: 14 },
  resultTitle: { color: "#242321", fontSize: 16, fontWeight: "800" },
  description: { color: "#77736D", fontSize: 12, lineHeight: 18, marginTop: 5 },
  step: { color: "#242321", fontSize: 12, lineHeight: 18, marginTop: 5 },
  error: { color: "#FFB28F", fontSize: 12, marginTop: 10 },
});
