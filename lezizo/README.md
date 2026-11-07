# Lezizo

Sunumdaki Lezizo tarif deneyiminin Expo / React Native uygulaması. Uygulama; tarif arama, kategori filtreleme, tarif detayları, favoriler ve kişisel menü akışlarını mobil öncelikli bir arayüzde sunar.

## Çalıştırma

```bash
pnpm install
pnpm start
```

Web önizlemesi için `pnpm web`, Android için `pnpm android` komutlarını kullanabilirsin.

## MongoDB, Better Auth ve AI

Gerçek profil oluşturma/giriş, MongoDB ve Gemini çağrıları mobil bundle'a secret gömmeden `server/` katmanında çalışır. `.env` dosyanı şu değişkenlerle doldur:

```env
MONGODB_URI=...
MONGODB_DB=lezizo
GEMINI_API_KEY=...
EXPO_PUBLIC_API_URL=http://localhost:3000
```

İki ayrı terminalde çalıştır:

```bash
pnpm seed
pnpm server
pnpm start
```

Fiziksel cihazda `EXPO_PUBLIC_API_URL` değerini bilgisayarının yerel ağ IP adresiyle değiştirmen gerekir. `pnpm seed`, `recipes` koleksiyonunu oluşturur ve tarifleri günceller. Better Auth MongoDB üzerinde kullanıcı/session/account/verification koleksiyonlarını yönetir. Ana sayfadaki **Lezizo AI** paneli Gemini üzerinden malzeme bazlı tarif önerir; anahtar yalnızca server tarafında okunur.

## Yapı

- `src/app/index.tsx`: Keşfet, arama, favoriler ve menü sekmeleri
- `src/app/recipe/[id].tsx`: Tarif detayları, malzemeler ve besin değerleri grafiği
- `src/data/recipes.ts`: Demo tarif veri modeli
- `src/context/AppContext.tsx`: Ekranlar arası favori ve menü durumu
