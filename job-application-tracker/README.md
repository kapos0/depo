# Job Application Tracker

## Docker Compose ile çalıştırma

Uygulama ve MongoDB ayrı container'larda çalışır. MongoDB verileri
`mongodb_data` adlı Docker volume'ünde saklanır.

```bash
cp .env.docker.example .env.docker
# .env.docker içindeki BETTER_AUTH_SECRET değerini değiştirin
docker compose up --build
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde açılır.

Container'ları arka planda çalıştırmak için:

```bash
docker compose up --build -d
```

Logları görmek ve sistemi durdurmak için:

```bash
docker compose logs -f app
docker compose down
```

`docker compose down -v` MongoDB volume'ünü de siler; bu komut veritabanındaki
verileri kalıcı olarak kaldırır.
