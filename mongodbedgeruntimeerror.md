 

Hayır, MongoDB adapter ile edge runtime problemleri hala devam etmektedir. MongoDB henüz edge runtime ile tam olarak uyumlu değildir [(1)](https://github.com/nextauthjs/next-auth/issues/10048) . 

Ancak, geçici bir çözüm yolu bulunmaktadır:

1. JWT session stratejisini kullanmak
2. Auth yapılandırmasını iki dosyaya bölmek:

```ts
// auth.config.ts
export default {
  providers: [
    GitHub,
    Google,
    Facebook,
    Twitter,
    //.. other providers
  ],
} satisfies NextAuthConfig
```

```ts
// auth.ts
import NextAuth from "next-auth"
import authConfig from "auth.config"
import { MongoDBAdapter } from "@auth/mongodb-adapter"

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  ...authConfig,
})
```

```ts
// middleware.ts
import NextAuth from "next-auth"
import authConfig from "auth.config"

export const middleware = NextAuth(authConfig).auth
```


Bu çözüm, middleware'de veritabanı çağrılarını önleyerek edge runtime hatalarının önüne geçmeyi amaçlamaktadır.