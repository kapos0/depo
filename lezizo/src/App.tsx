import { useMemo, useState } from "react";
import { Sparkles, Utensils, Plus } from "lucide-react";
import "./styles.css";
import { authClient } from "./lib/auth-client";
import { recipes } from "./data/recipes";
import type { Recipe } from "./types/recipe";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import MenuPage from "./pages/MenuPage";
import ProfilePage from "./pages/ProfilePage";
import AddRecipeModal from "./components/modals/AddRecipeModal";
import ChefModal from "./components/modals/ChefModal";
import AuthModal from "./components/modals/AuthModal";
export default function App() {
  const [activeNav, setActiveNav] = useState("Keşfet"),
    [query, setQuery] = useState(""),
    [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null),
    [favorites, setFavorites] = useState<number[]>([2]),
    [addedRecipes, setAddedRecipes] = useState<Recipe[]>([]),
    [menu, setMenu] = useState<Record<string, number[]>>({
      Kahvaltı: [3],
      Öğle: [],
      Akşam: [1],
    }),
    [profileName, setProfileName] = useState("Ayşe Yılmaz"),
    [showAdd, setShowAdd] = useState(false),
    [showChef, setShowChef] = useState(false),
    [chefInput, setChefInput] = useState(""),
    [chefMessages, setChefMessages] = useState<string[]>([]),
    [showAuth, setShowAuth] = useState(false),
    [authMode, setAuthMode] = useState<"signIn" | "signUp">("signUp"),
    [authError, setAuthError] = useState("");
  const { data: session } = authClient.useSession();
  const all = useMemo(() => [...addedRecipes, ...recipes], [addedRecipes]);
  const menuCount = Object.values(menu).flat().length;
  const toggleFavorite = (id: number) =>
    setFavorites((c) =>
      c.includes(id) ? c.filter((x) => x !== id) : [...c, id],
    );
  const toggleMenu = (meal: string, id: number) =>
    setMenu((c) => ({
      ...c,
      [meal]: c[meal].includes(id)
        ? c[meal].filter((x) => x !== id)
        : [...c[meal], id],
    }));
  const sendChef = () => {
    if (!chefInput.trim()) return;
    setChefMessages((c) => [
      ...c,
      chefInput.trim(),
      "Harika seçim! Elindeki malzemelerle bu tarife biraz limon kabuğu ve taze kekik eklemeni öneririm. İstersen sana 15 dakikalık alternatif bir menü de hazırlayabilirim.",
    ]);
    setChefInput("");
  };
  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          className="brand"
          onClick={() => {
            setActiveNav("Keşfet");
            setSelectedRecipe(null);
          }}
        >
          <span className="brand-mark">
            <Utensils size={18} />
          </span>
          <span>
            lezizo<span className="brand-dot">.</span>
          </span>
        </button>
        <nav className="main-nav">
          {["Keşfet", "Favoriler", "Menüm"].map((n) => (
            <button
              key={n}
              className={activeNav === n ? "active" : ""}
              onClick={() => {
                setActiveNav(n);
                setSelectedRecipe(null);
              }}
            >
              {n}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="chef-trigger" onClick={() => setShowChef(true)}>
            <Sparkles size={16} /> AI Şef
          </button>
          <button
            className="avatar"
            onClick={() =>
              session
                ? (setActiveNav("Profil"), setSelectedRecipe(null))
                : setShowAuth(true)
            }
          >
            {session?.user.name?.slice(0, 1).toUpperCase() ?? "A"}
          </button>
        </div>
      </header>
      <main>
        {selectedRecipe ? (
          <RecipeDetailPage
            recipe={selectedRecipe}
            favorite={favorites.includes(selectedRecipe.id)}
            onBack={() => setSelectedRecipe(null)}
            onFavorite={() => toggleFavorite(selectedRecipe.id)}
          />
        ) : activeNav === "Favoriler" ? (
          <FavoritesPage
            recipes={all}
            favorites={favorites}
            onFavorite={toggleFavorite}
            onOpen={setSelectedRecipe}
          />
        ) : activeNav === "Menüm" ? (
          <MenuPage recipes={all} menu={menu} onToggle={toggleMenu} />
        ) : activeNav === "Profil" ? (
          <ProfilePage
            recipes={all}
            favorites={favorites}
            onFavorite={toggleFavorite}
            onOpen={setSelectedRecipe}
            name={profileName}
            sharedCount={addedRecipes.length}
            menuCount={menuCount}
            onViewFavorites={() => setActiveNav("Favoriler")}
            onEdit={() =>
              setProfileName(prompt("Profil adın", profileName) || profileName)
            }
          />
        ) : (
          <HomePage
            recipes={all}
            query={query}
            onQuery={setQuery}
            onOpen={setSelectedRecipe}
            favorites={favorites}
            onFavorite={toggleFavorite}
            onAdd={() => setShowAdd(true)}
          />
        )}
      </main>
      {showAdd && (
        <AddRecipeModal
          onClose={() => setShowAdd(false)}
          onAdd={(r) => {
            setAddedRecipes((c) => [r, ...c]);
            setShowAdd(false);
          }}
        />
      )}
      {showChef && (
        <ChefModal
          messages={chefMessages}
          input={chefInput}
          onInput={setChefInput}
          onSend={sendChef}
          onClose={() => setShowChef(false)}
        />
      )}
      {showAuth && (
        <AuthModal
          mode={authMode}
          onMode={() =>
            setAuthMode((m) => (m === "signUp" ? "signIn" : "signUp"))
          }
          onClose={() => setShowAuth(false)}
          error={authError}
          onError={setAuthError}
        />
      )}
      <button className="mobile-add" onClick={() => setShowAdd(true)}>
        <Plus size={22} />
      </button>
    </div>
  );
}
