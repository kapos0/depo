export type Nutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type Recipe = {
  id: string;
  name: string;
  category: string;
  time: string;
  difficulty: string;
  image: string;
  description: string;
  ingredients: string[];
  nutrition: Nutrition;
  tags: string[];
};

export const recipes: Recipe[] = [
  {
    id: "adana-kebap",
    name: "Adana Kebap",
    category: "Ana yemek",
    time: "45 dk",
    difficulty: "Orta",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85",
    description: "Güneydoğu mutfağının vazgeçilmezi; közlenmiş biber ve soğanla servis edilen nefis Adana kebap.",
    ingredients: ["500 g yağlı kıyma", "2 adet kapya biber", "1 adet kuru soğan", "2 diş sarımsak", "1 çay kaşığı kimyon", "Tuz ve karabiber"],
    nutrition: { calories: 560, protein: 34, carbs: 18, fat: 39 },
    tags: ["et", "ızgara", "Türk mutfağı"],
  },
  {
    id: "menemen",
    name: "Menemen",
    category: "Kahvaltı",
    time: "20 dk",
    difficulty: "Kolay",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1200&q=85",
    description: "Sofraların en sevilen kahvaltılığı. Domates, biber ve yumurtanın mükemmel buluşması.",
    ingredients: ["3 adet domates", "3 adet yumurta", "2 adet yeşil biber", "1 yemek kaşığı tereyağı", "Tuz ve pul biber"],
    nutrition: { calories: 320, protein: 19, carbs: 12, fat: 22 },
    tags: ["yumurta", "kahvaltı", "pratik"],
  },
  {
    id: "mercimek-koftesi",
    name: "Mercimek Köftesi",
    category: "Atıştırmalık",
    time: "35 dk",
    difficulty: "Kolay",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85",
    description: "Çay saatlerinin ve kalabalık sofraların favorisi, bol yeşillikli mercimek köftesi.",
    ingredients: ["1 su bardağı kırmızı mercimek", "2 su bardağı ince bulgur", "1 demet taze soğan", "Maydanoz", "Biber salçası", "Limon"],
    nutrition: { calories: 245, protein: 11, carbs: 42, fat: 5 },
    tags: ["vegan", "bakliyat", "çay saati"],
  },
  {
    id: "firinda-sebzeli-tavuk",
    name: "Fırında Sebzeli Tavuk",
    category: "Ana yemek",
    time: "55 dk",
    difficulty: "Kolay",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=85",
    description: "Tek tepside hazırlanan, sebzelerin lezzetini içine çeken yumuşacık tavuk.",
    ingredients: ["4 adet tavuk but", "2 adet patates", "2 adet havuç", "1 adet kırmızı biber", "Zeytinyağı", "Kekik"],
    nutrition: { calories: 430, protein: 38, carbs: 28, fat: 19 },
    tags: ["tavuk", "fırın", "aile"],
  },
  {
    id: "pancake",
    name: "Pancake",
    category: "Kahvaltı",
    time: "25 dk",
    difficulty: "Kolay",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=85",
    description: "Yumuşacık dokusu ve meyvelerle servis edilen nefis bir hafta sonu kahvaltısı.",
    ingredients: ["1,5 su bardağı un", "1 su bardağı süt", "1 yumurta", "1 paket kabartma tozu", "1 yemek kaşığı şeker"],
    nutrition: { calories: 290, protein: 8, carbs: 44, fat: 9 },
    tags: ["tatlı", "kahvaltı", "çocuk"],
  },
  {
    id: "sebzeli-guvec",
    name: "Sebzeli Güveç",
    category: "Ana yemek",
    time: "70 dk",
    difficulty: "Orta",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
    description: "Mevsim sebzeleriyle ağır ağır pişen, sofraya bereket getiren ev yemeği.",
    ingredients: ["2 patlıcan", "2 kabak", "3 domates", "2 kapya biber", "1 soğan", "Zeytinyağı"],
    nutrition: { calories: 280, protein: 8, carbs: 32, fat: 13 },
    tags: ["vegan", "sebze", "güveç"],
  },
];

export const categories = ["Tümü", "Kahvaltı", "Ana yemek", "Atıştırmalık", "Tatlı"];
