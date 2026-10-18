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

## Docker ile çalıştırma

Docker Compose, Next.js uygulamasını ve MongoDB'yi aynı ağda başlatır. Better
Auth transaction kullandığı için MongoDB Docker içinde tek düğümlü `rs0`
replica set olarak çalıştırılır. MongoDB verileri `mongo-data` isimli kalıcı
Docker volume'unda tutulur. MongoDB, rutin bağlantı günlüklerini terminali
doldurmaması için sessiz modda çalışır; uyarı ve hata günlükleri görünmeye
devam eder. Container logları ayrıca 10 MB ve 3 dosya ile sınırlandırılır.

`.env.local` dosyanız yoksa önce örnek dosyayı oluşturun ve özellikle
`BETTER_AUTH_SECRET` değerini güçlü, en az 32 karakterlik bir değerle doldurun:

```bash
cp .env.example .env.local
docker compose up --build
```

Replica set ayarını ilk kez uygularken mevcut MongoDB volume'unu temizlemek
gerekirse:

```bash
docker compose down -v
docker compose up --build
```

Uygulama `http://localhost:3000` adresinde açılır. Compose içindeki `web`
servisi, host makinedeki veya `.env.local` içindeki MongoDB adresini kullanmak
yerine aynı Compose projesindeki `mongo` servisine bağlanır. Verileri ve
kullanıcı hesaplarını tamamen silmek için:

```bash
docker compose down -v
```

`.env.local` gizli bilgileri içerdiği için Docker imajına kopyalanmaz ve Git'e
eklenmemelidir.
