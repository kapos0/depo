import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { categories, recipes, Recipe } from "../data/recipes";
import { useAppStore } from "../context/AppContext";
import { ProfilePanel } from "../components/ProfilePanel";
import { AIChefPanel } from "../components/AIChefPanel";

type Tab = "home" | "favorites" | "menu" | "profile";

const colors = {
  ink: "#242321",
  muted: "#77736d",
  cream: "#FBF8F3",
  orange: "#F26A3D",
  pale: "#FFF0E8",
  line: "#EAE4DC",
  white: "#FFFFFF",
};

function Logo() {
  return (
    <View style={styles.logoRow}>
      <View style={styles.logoMark}><Text style={styles.logoMarkText}>✦</Text></View>
      <Text style={styles.logoText}>lezizo</Text>
      <Text style={styles.logoDot}>.</Text>
    </View>
  );
}

function RecipeCard({ recipe, horizontal = false, favorite, onFavorite }: {
  recipe: Recipe;
  horizontal?: boolean;
  favorite: boolean;
  onFavorite: () => void;
}) {
  return (
    <Pressable
      style={[styles.card, horizontal && styles.horizontalCard]}
      onPress={() => router.push({ pathname: "/recipe/[id]", params: { id: recipe.id } })}
    >
      <View>
        <Image source={{ uri: recipe.image }} style={[styles.cardImage, horizontal && styles.horizontalImage]} />
        <Pressable style={styles.heartButton} onPress={onFavorite}>
          <Text style={[styles.heart, favorite && styles.heartActive]}>{favorite ? "♥" : "♡"}</Text>
        </Pressable>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardCategory}>{recipe.category.toUpperCase()}</Text>
        <Text style={styles.cardTitle} numberOfLines={1}>{recipe.name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>◷ {recipe.time}</Text>
          <Text style={styles.meta}>• {recipe.difficulty}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function BottomNav({ tab, setTab }: { tab: Tab; setTab: (tab: Tab) => void }) {
  return (
    <View style={styles.bottomNav}>
      {([
        ["home", "⌂", "Keşfet"],
        ["favorites", "♡", "Favoriler"],
        ["menu", "▤", "Menüm"],
        ["profile", "●", "Profil"],
      ] as const).map(([key, icon, label]) => (
        <Pressable key={key} style={styles.navItem} onPress={() => setTab(key)}>
          <Text style={[styles.navIcon, tab === key && styles.navActive]}>{icon}</Text>
          <Text style={[styles.navLabel, tab === key && styles.navActive]}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tümü");
  const { favorites, menu, toggleFavorite, removeFromMenu } = useAppStore();

  const filteredRecipes = useMemo(() => recipes.filter((recipe) => {
    const normalized = query.toLocaleLowerCase("tr-TR").trim();
    const matchesQuery = !normalized || [recipe.name, recipe.description, ...recipe.ingredients, ...recipe.tags]
      .join(" ").toLocaleLowerCase("tr-TR").includes(normalized);
    return matchesQuery && (category === "Tümü" || recipe.category === category);
  }), [category, query]);

  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));
  const menuSections = Object.entries(menu);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Logo />
          <View style={styles.headerPill}><Text style={styles.headerPillText}>Afiyet olsun!</Text></View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {tab === "home" && (
            <>
              <View style={styles.hero}>
                <View style={styles.heroCopy}>
                  <Text style={styles.eyebrow}>BUGÜN NE PİŞİRSEK?</Text>
                  <Text style={styles.heroTitle}>Lezzetli fikirler,{"\n"}mutlu sofralar.</Text>
                  <Text style={styles.heroText}>Aradığın tarifi keşfet, menünü kolayca oluştur.</Text>
                </View>
                <Text style={styles.heroEmoji}>🍅</Text>
              </View>
              <View style={styles.searchBox}>
                <Text style={styles.searchIcon}>⌕</Text>
                <TextInput value={query} onChangeText={setQuery} placeholder="Tarif veya malzeme ara..." placeholderTextColor="#A49D95" style={styles.searchInput} />
                {query.length > 0 && <Pressable onPress={() => setQuery("")}><Text style={styles.clear}>×</Text></Pressable>}
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
                {categories.map((item) => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipSelected]}><Text style={[styles.chipText, category === item && styles.chipTextSelected]}>{item}</Text></Pressable>)}
              </ScrollView>
              <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>{query || category !== "Tümü" ? "Arama sonuçları" : "Popüler tarifler"}</Text><Text style={styles.resultCount}>{filteredRecipes.length} tarif</Text></View>
              <View style={styles.grid}>{filteredRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} favorite={favorites.includes(recipe.id)} onFavorite={() => toggleFavorite(recipe.id)} />)}</View>
              {filteredRecipes.length === 0 && <View style={styles.empty}><Text style={styles.emptyEmoji}>🍽️</Text><Text style={styles.emptyTitle}>Tarif bulunamadı</Text><Text style={styles.emptyText}>Başka bir isim veya malzeme deneyebilirsin.</Text></View>}
              <AIChefPanel />
            </>
          )}
          {tab === "favorites" && (
            <>
              <Text style={styles.pageEyebrow}>KAYDETTİKLERİM</Text><Text style={styles.pageTitle}>Favori tariflerim</Text><Text style={styles.pageText}>Sofrana ilham verecek tarifler burada.</Text>
              {favoriteRecipes.length > 0 ? <View style={styles.list}>{favoriteRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} horizontal favorite onFavorite={() => toggleFavorite(recipe.id)} />)}</View> : <View style={styles.empty}><Text style={styles.emptyEmoji}>♡</Text><Text style={styles.emptyTitle}>Henüz favorin yok</Text><Text style={styles.emptyText}>Beğendiğin tarifleri kalp ikonuna dokunarak kaydet.</Text></View>}
            </>
          )}
          {tab === "menu" && (
            <>
              <Text style={styles.pageEyebrow}>HAFTALIK PLAN</Text><Text style={styles.pageTitle}>Menüm</Text><Text style={styles.pageText}>Tarif detayından öğünlerine ekleyerek kendi menünü oluştur.</Text>
              <View style={styles.menuCard}>{menuSections.map(([meal, ids]) => <View key={meal} style={styles.menuSection}><Text style={styles.menuTitle}>{meal}</Text>{ids.length === 0 ? <Text style={styles.menuEmpty}>Henüz tarif eklenmedi</Text> : ids.map((id) => { const recipe = recipes.find((item) => item.id === id); return recipe ? <View key={id} style={styles.menuRow}><Text style={styles.menuRecipe}>{recipe.name}</Text><Pressable onPress={() => removeFromMenu(id, meal)}><Text style={styles.remove}>Kaldır</Text></Pressable></View> : null; })}</View>)}</View>
            </>
          )}
          {tab === "profile" && (
            <>
              <Text style={styles.pageEyebrow}>LEZİZO HESABI</Text>
              <Text style={styles.pageTitle}>Profil</Text>
              <Text style={styles.pageText}>Kendi tarif koleksiyonunu her yerde yanında taşı.</Text>
              <ProfilePanel />
            </>
          )}
        </ScrollView>
        <BottomNav tab={tab} setTab={setTab} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  container: { flex: 1, backgroundColor: colors.cream },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 22, paddingTop: 16, paddingBottom: 10 },
  logoRow: { flexDirection: "row", alignItems: "center" },
  logoMark: { width: 28, height: 28, borderRadius: 9, backgroundColor: colors.orange, alignItems: "center", justifyContent: "center", transform: [{ rotate: "12deg" }] },
  logoMarkText: { color: colors.white, fontSize: 17, transform: [{ rotate: "-12deg" }] },
  logoText: { color: colors.ink, fontSize: 22, fontWeight: "800", letterSpacing: -1, marginLeft: 8 },
  logoDot: { color: colors.orange, fontSize: 25, fontWeight: "900" },
  headerPill: { backgroundColor: colors.pale, borderRadius: 18, paddingHorizontal: 13, paddingVertical: 8 },
  headerPillText: { color: colors.orange, fontSize: 11, fontWeight: "700" },
  content: { paddingHorizontal: 22, paddingBottom: 110 },
  hero: { backgroundColor: colors.ink, minHeight: 180, borderRadius: 25, padding: 22, marginTop: 8, overflow: "hidden", flexDirection: "row", alignItems: "center" },
  heroCopy: { flex: 1 },
  eyebrow: { color: "#FFB28F", fontSize: 10, fontWeight: "800", letterSpacing: 1.6, marginBottom: 10 },
  heroTitle: { color: colors.white, fontSize: 28, fontWeight: "800", lineHeight: 32, letterSpacing: -1 },
  heroText: { color: "#C9C4BD", fontSize: 12, lineHeight: 18, marginTop: 12, maxWidth: 210 },
  heroEmoji: { fontSize: 83, transform: [{ rotate: "-15deg" }], marginRight: -10 },
  searchBox: { backgroundColor: colors.white, borderColor: colors.line, borderWidth: 1, borderRadius: 16, flexDirection: "row", alignItems: "center", paddingHorizontal: 14, marginTop: 18, height: 52 },
  searchIcon: { fontSize: 25, color: colors.orange, marginRight: 8, lineHeight: 28 },
  searchInput: { flex: 1, color: colors.ink, fontSize: 14 },
  clear: { fontSize: 24, color: colors.muted },
  chips: { gap: 8, paddingVertical: 16 },
  chip: { borderRadius: 18, backgroundColor: colors.white, paddingHorizontal: 15, paddingVertical: 9, borderWidth: 1, borderColor: colors.line },
  chipSelected: { backgroundColor: colors.orange, borderColor: colors.orange },
  chipText: { color: colors.muted, fontSize: 12, fontWeight: "600" },
  chipTextSelected: { color: colors.white },
  sectionHeading: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 13, marginTop: 2 },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: "800", letterSpacing: -0.5 },
  resultCount: { color: colors.muted, fontSize: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 16 },
  card: { backgroundColor: colors.white, borderRadius: 18, overflow: "hidden", width: "48.2%", borderWidth: 1, borderColor: colors.line },
  cardImage: { width: "100%", height: 138, backgroundColor: "#E6E0D9" },
  cardBody: { padding: 11 },
  cardCategory: { color: colors.orange, fontSize: 9, fontWeight: "800", letterSpacing: 0.8, marginBottom: 5 },
  cardTitle: { color: colors.ink, fontSize: 15, fontWeight: "800" },
  metaRow: { flexDirection: "row", gap: 7, marginTop: 8 },
  meta: { color: colors.muted, fontSize: 10 },
  heartButton: { position: "absolute", right: 9, top: 9, width: 31, height: 31, backgroundColor: "rgba(255,255,255,0.93)", borderRadius: 16, alignItems: "center", justifyContent: "center" },
  heart: { color: colors.ink, fontSize: 20, lineHeight: 23 },
  heartActive: { color: colors.orange },
  bottomNav: { height: 78, backgroundColor: colors.white, borderTopColor: colors.line, borderTopWidth: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingBottom: 7 },
  navItem: { alignItems: "center", minWidth: 70 },
  navIcon: { color: "#AAA39B", fontSize: 24, lineHeight: 28 },
  navLabel: { color: "#AAA39B", fontSize: 10, fontWeight: "600", marginTop: 3 },
  navActive: { color: colors.orange, fontWeight: "800" },
  pageEyebrow: { color: colors.orange, fontSize: 10, fontWeight: "800", letterSpacing: 1.6, marginTop: 28 },
  pageTitle: { color: colors.ink, fontSize: 30, fontWeight: "800", letterSpacing: -1, marginTop: 7 },
  pageText: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 7, marginBottom: 20 },
  list: { gap: 13 },
  horizontalCard: { width: "100%", flexDirection: "row", height: 112 },
  horizontalImage: { width: 120, height: 112 },
  menuCard: { backgroundColor: colors.white, borderRadius: 20, borderWidth: 1, borderColor: colors.line, overflow: "hidden" },
  menuSection: { padding: 16, borderBottomWidth: 1, borderBottomColor: colors.line },
  menuTitle: { fontSize: 18, fontWeight: "800", color: colors.ink, marginBottom: 11 },
  menuEmpty: { color: "#AAA39B", fontSize: 12, fontStyle: "italic" },
  menuRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#F3EFEA" },
  menuRecipe: { color: colors.ink, fontSize: 13, flex: 1 },
  remove: { color: colors.orange, fontSize: 11, fontWeight: "700" },
  empty: { alignItems: "center", paddingVertical: 60 },
  emptyEmoji: { fontSize: 44, color: colors.orange, marginBottom: 12 },
  emptyTitle: { color: colors.ink, fontSize: 18, fontWeight: "800" },
  emptyText: { color: colors.muted, fontSize: 13, marginTop: 7, textAlign: "center" },
});
