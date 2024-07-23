### Gereksinimler

- Node.js (v14+)
- PostgreSQL
- Yarn veya npm

### Adımlar
1. Depoyu klonlayın:

    ```bash
    git clone https://github.com/feritaltnts/UberFreight.git
    cd uber-freight
    ```

2. Gerekli bağımlılıkları yükleyin:

    ```bash
    yarn install
    # veya
    npm install
    ```

3. Veritabanını ayarlayın:

    PostgreSQL veritabanınızı oluşturun ve bağlantı bilgilerini `.env` dosyasına ekleyin. Örnek `.env` dosyasını aşağıda bulabilirsiniz.

    ```bash
    cp .env.example .env
    ```

    `.env` dosyasını açın ve veritabanı bağlantı bilgilerinizi ve JWT gizli anahtarınızı güncelleyin:

    ```env
    DATABASE_URL="postgresql://<DB_USER>:<DB_PASSWORD>@<DB_HOST>:<DB_PORT>/<DB_NAME>"
    JWT_SECRET="<YOUR_SECRET_KEY>"
    ```

4. Prisma ile veritabanı şemasını oluşturun ve migrasyonları çalıştırın:

    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

5. Uygulamayı başlatın:

    ```bash
    yarn start
    # veya
    npm run start
    ```

6. Swagger dokümantasyonuna erişin:

    Tarayıcınızda `http://localhost:3000/api` adresine giderek Swagger UI üzerinden API dokümantasyonuna erişebilirsiniz.
