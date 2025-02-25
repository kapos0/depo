
# URL'de Kullanılan Semboller ve Amaçları

Bir URL (Uniform Resource Locator), bir kaynağın internet üzerindeki yerini tanımlar. URL'lerde kullanılan bazı semboller, farklı işlevler için tasarlanmıştır. İşte yaygın semboller ve anlamları hakkında detaylı bilgiler.

## `?` (Soru İşareti)
- **Amaç**: Sorgu parametrelerinin başlangıcını belirtir.
- **Detay**: Web sayfalarına dinamik veri göndermek için kullanılır. `?` işaretinden sonra gelen kısım, ana URL'ye eklenen parametrelerdir.
- **Örnek**:  
  ```
  https://www.example.com/search?query=kitap
  ```
  Burada `query=kitap`, sunucuya gönderilen bir parametredir.

## `&` (Ve İşareti)
- **Amaç**: Birden fazla sorgu parametresini ayırır.
- **Detay**: `?` işaretinden sonra gelen parametreleri birbirine bağlamak için kullanılır.
- **Örnek**:  
  ```
  https://www.example.com/search?query=kitap&kategori=roman
  ```
  Burada iki parametre var: `query=kitap` ve `kategori=roman`.

## `#` (Kare veya Çapa İşareti)
- **Amaç**: URL içindeki bir yere veya bölüme atıfta bulunur.
- **Detay**: Sayfanın belirli bir bölümüne (anchor) hızlıca yönlendirme yapar. Sunucuya bilgi göndermez, yalnızca istemci tarafında çalışır.
- **Örnek**:  
  ```
  https://www.example.com/page#section1
  ```
  Burada `#section1`, sayfanın "section1" adlı bölümüne gitmeyi belirtir.

## `/` (Eğik Çizgi)
- **Amaç**: Dizini veya hiyerarşiyi belirtir.
- **Detay**: URL'deki kaynakların veya alt dizinlerin ayrımını gösterir.
- **Örnek**:  
  ```
  https://www.example.com/blog/yazilar
  ```
  Burada `blog` ana dizin, `yazilar` ise alt dizindir.

## `=` (Eşittir İşareti)
- **Amaç**: Parametre adı ile değerini ayırır.
- **Detay**: Sorgu parametrelerinin tanımlanmasında kullanılır.
- **Örnek**:  
  ```
  https://www.example.com/search?query=kitap
  ```
  Burada `query`, parametre adı; `kitap`, parametre değeridir.

## `%` (Yüzde İşareti)
- **Amaç**: Özel karakterlerin kodlanması için kullanılır (URL encoding).
- **Detay**: URL'de izin verilmeyen veya özel anlam taşıyan karakterler (%20 = boşluk gibi) bu işaretle kodlanır.
- **Örnek**:  
  ```
  https://www.example.com/search?query=kitap%20ve%20sanat
  ```
  `%20`, boşluk karakterini temsil eder.

## `:` (İki Nokta)
- **Amaç**: Protokol ve kaynak belirtimi için kullanılır.
- **Örnek**:  
  ```
  https://www.example.com
  ```
  Burada `https` protokolünü belirtir.

## `.` (Nokta)
- **Amaç**: Alan adı ve uzantısını ayırır.
- **Örnek**:  
  ```
  www.example.com
  ```
  Burada `example` alan adı, `com` ise uzantıdır.

## `@` (Et İşareti)
- **Amaç**: Kimlik doğrulama bilgilerini belirtir (modern URL'lerde nadiren kullanılır).
- **Örnek**:  
  ```
  https://kullanici:parola@www.example.com
  ```

## `-` (Tire) ve `_` (Alt Çizgi)
- **Amaç**: URL'lerde kelimeleri ayırmak veya okunabilirliği artırmak için kullanılır.
- **Detay**: Genellikle SEO dostu URL'ler oluştururken tercih edilir.
- **Örnek**:  
  ```
  https://www.example.com/blog-en-iyi-kitaplar
  ```

---

Bu semboller, URL'lerin yapılandırılmasında ve işlevselliğinde kritik bir rol oynar.
