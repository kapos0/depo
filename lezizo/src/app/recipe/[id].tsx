import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { recipes } from "../../data/recipes";
import { useAppStore } from "../../context/AppContext";

const orange = "#F26A3D";
const ink = "#242321";
const muted = "#77736D";
const cream = "#FBF8F3";

export default function RecipeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = recipes.find((item) => item.id === id) || recipes[0];
  const { favorites, toggleFavorite, addToMenu } = useAppStore();
  const saved = favorites.includes(recipe.id);
  const [tab, setTab] = useState<"about" | "ingredients">("about");
  const [meal, setMeal] = useState<string | null>(null);
  const nutrition = [
    { label: "Kalori", value: recipe.nutrition.calories, unit: "kcal", color: "#F26A3D" },
    { label: "Protein", value: recipe.nutrition.protein, unit: "g", color: "#F4A261" },
    { label: "Karbonhidrat", value: recipe.nutrition.carbs, unit: "g", color: "#E9C46A" },
    { label: "Yağ", value: recipe.nutrition.fat, unit: "g", color: "#7FB685" },
  ];
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.topbar}><Pressable onPress={() => router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.topbarTitle}>Tarif detayı</Text><Pressable onPress={() => toggleFavorite(recipe.id)} style={styles.save}><Text style={[styles.saveText, saved && styles.saved]}>{saved ? "♥" : "♡"}</Text></Pressable></View>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <View style={styles.titleRow}><View style={{ flex: 1 }}><Text style={styles.category}>{recipe.category.toUpperCase()}</Text><Text style={styles.title}>{recipe.name}</Text></View><View style={styles.rating}><Text style={styles.star}>★</Text><Text style={styles.ratingText}>4.9</Text></View></View>
        <View style={styles.infoRow}><Text style={styles.info}>◷ {recipe.time}</Text><Text style={styles.info}>◉ {recipe.difficulty}</Text><Text style={styles.info}>♨ 4 kişilik</Text></View>
        <Text style={styles.description}>{recipe.description}</Text>
        <View style={styles.tabs}><Pressable onPress={() => setTab("about")} style={[styles.tab, tab === "about" && styles.tabActive]}><Text style={[styles.tabText, tab === "about" && styles.tabTextActive]}>Besin değerleri</Text></Pressable><Pressable onPress={() => setTab("ingredients")} style={[styles.tab, tab === "ingredients" && styles.tabActive]}><Text style={[styles.tabText, tab === "ingredients" && styles.tabTextActive]}>Malzemeler</Text></Pressable></View>
        {tab === "about" ? <View style={styles.nutritionCard}><Text style={styles.cardTitle}>Porsiyon başına</Text><View style={styles.bars}>{nutrition.map((item) => <View key={item.label} style={styles.barRow}><Text style={styles.barLabel}>{item.label}</Text><View style={styles.track}><View style={[styles.fill, { width: `${Math.min(100, (item.value / (item.label === "Kalori" ? 700 : 50)) * 100)}%`, backgroundColor: item.color }]} /></View><Text style={styles.barValue}>{item.value}{item.unit}</Text></View>)}</View><Text style={styles.disclaimer}>Değerler yaklaşık olarak hesaplanmıştır.</Text></View> : <View style={styles.ingredientsCard}>{recipe.ingredients.map((item) => <View key={item} style={styles.ingredient}><Text style={styles.bullet}>•</Text><Text style={styles.ingredientText}>{item}</Text></View>)}</View>}
        <Text style={styles.planTitle}>Menüne ekle</Text>
        <View style={styles.mealRow}>{["Kahvaltı", "Öğle", "Akşam"].map((item) => <Pressable key={item} onPress={() => { setMeal(item); addToMenu(recipe.id, item); }} style={[styles.mealButton, meal === item && styles.mealButtonActive]}><Text style={[styles.mealText, meal === item && styles.mealTextActive]}>{item}</Text></Pressable>)}</View>
        {meal && <View style={styles.confirm}><Text style={styles.confirmText}>✓ {recipe.name}, {meal.toLocaleLowerCase("tr-TR")} menüne eklendi.</Text></View>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cream },
  content: { paddingHorizontal: 22, paddingBottom: 35 },
  topbar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 62 },
  back: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFF", alignItems: "center", justifyContent: "center" },
  backText: { color: ink, fontSize: 34, lineHeight: 36, marginTop: -4 },
  topbarTitle: { color: ink, fontSize: 16, fontWeight: "800" },
  save: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFF", alignItems: "center", justifyContent: "center" },
  saveText: { fontSize: 24, color: ink },
  saved: { color: orange },
  image: { width: "100%", height: 245, borderRadius: 24, backgroundColor: "#E6E0D9" },
  titleRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 19 },
  category: { color: orange, fontWeight: "800", fontSize: 10, letterSpacing: 1.2, marginBottom: 5 },
  title: { color: ink, fontSize: 29, fontWeight: "800", letterSpacing: -1 },
  rating: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFF0E8", borderRadius: 16, paddingHorizontal: 10, paddingVertical: 8, marginTop: 4 },
  star: { color: orange, fontSize: 15, marginRight: 4 },
  ratingText: { color: ink, fontWeight: "800", fontSize: 12 },
  infoRow: { flexDirection: "row", gap: 17, marginTop: 11 },
  info: { color: muted, fontSize: 11 },
  description: { color: muted, lineHeight: 21, fontSize: 14, marginTop: 19 },
  tabs: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#E6DFD6", marginTop: 23 },
  tab: { paddingBottom: 11, marginRight: 24 },
  tabActive: { borderBottomWidth: 2, borderBottomColor: orange },
  tabText: { color: muted, fontSize: 13, fontWeight: "700" },
  tabTextActive: { color: ink },
  nutritionCard: { backgroundColor: "#FFF", borderRadius: 18, padding: 17, marginTop: 16, borderWidth: 1, borderColor: "#EDE7DF" },
  cardTitle: { color: ink, fontSize: 16, fontWeight: "800", marginBottom: 15 },
  bars: { gap: 14 },
  barRow: { flexDirection: "row", alignItems: "center" },
  barLabel: { color: muted, width: 82, fontSize: 11 },
  track: { flex: 1, height: 8, backgroundColor: "#F1ECE6", borderRadius: 8, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 8 },
  barValue: { color: ink, fontSize: 11, fontWeight: "800", width: 50, textAlign: "right" },
  disclaimer: { color: "#AAA39B", fontSize: 10, marginTop: 16 },
  ingredientsCard: { backgroundColor: "#FFF", borderRadius: 18, padding: 17, marginTop: 16, borderWidth: 1, borderColor: "#EDE7DF", gap: 13 },
  ingredient: { flexDirection: "row" },
  bullet: { color: orange, fontSize: 18, lineHeight: 18, marginRight: 9 },
  ingredientText: { color: ink, fontSize: 13, flex: 1, lineHeight: 18 },
  planTitle: { color: ink, fontSize: 17, fontWeight: "800", marginTop: 25, marginBottom: 12 },
  mealRow: { flexDirection: "row", gap: 8 },
  mealButton: { flex: 1, backgroundColor: "#FFF", borderWidth: 1, borderColor: "#E5DED5", borderRadius: 12, alignItems: "center", paddingVertical: 12 },
  mealButtonActive: { backgroundColor: orange, borderColor: orange },
  mealText: { color: muted, fontSize: 11, fontWeight: "700" },
  mealTextActive: { color: "#FFF" },
  confirm: { backgroundColor: "#EAF6EC", borderRadius: 10, padding: 12, marginTop: 12 },
  confirmText: { color: "#397347", fontSize: 12, fontWeight: "600" },
});
