# MasaPuan

Restoran ve kafeler için QR kod üzerinden müşteri geri bildirimi toplama uygulaması.

## Geliştirme

Projeyi çalıştırmadan önce `.env.example` dosyasını `.env.local` olarak kopyalayın ve
MongoDB bağlantı adresinizi `MONGODB_URI` değişkenine yazın. URI içinde veritabanı adı yoksa uygulama `active` veritabanını kullanır. Farklı bir ad için isteğe bağlı olarak `MONGODB_DB_NAME` değişkenini ayarlayabilirsiniz.

```bash
cp .env.example .env.local
pnpm dev
```

Production ortamında `BETTER_AUTH_URL` değerini gerçek uygulama adresinizle
değiştirin ve güçlü, en az 32 karakterlik yeni bir `BETTER_AUTH_SECRET` kullanın.
`.env.local` dosyasını asla Git'e eklemeyin.

MongoDB modelleri `src/models` altında, bağlantı önbelleği ise
`src/lib/db.ts` dosyasındadır. İlk veri modeli şu ilişkileri kullanır:

- `Restaurant`: Better Auth kullanıcısına ait işletme
- `Table`: Bir işletmenin QR ile erişilen masası
- `Rating`: Masa ve işletmeye bağlı anonim müşteri değerlendirmesi

Yönetici panelinden masa eklediğinizde her masa için `/r/{publicSlug}` formatında
benzersiz bir bağlantı ve QR kodu oluşturulur. Müşteri formu bu bağlantı üzerinden
`/api/ratings` route'una anonim değerlendirme kaydeder.

## Komutlar

```bash
pnpm lint
pnpm build
```
