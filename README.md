# Node Veritabanı Projesi -4

## Talimatlar

### Görev 1: Proje Kurulumu

Projeyi forklayın, clonela'yın ve sık sık commitleyin.

## Görev 2: MVP

Bir _yemek tarifi kitabı_ uygulaması için **veri modelini** tasarlayın ve modele dayalı bir **SQLite veritabanı** oluşturmak ve ona test için veri eklemek adına Knex migration ve seed işlevini kullanın.
Ardından, id'sine göre bir tarif almak için bir **uç nokta(endpoint)** oluşturun.

İstemci tarafından belirtilen sistem gereksinimleri şunlardır:

- Tariflerin benzersiz olması gereken bir adı vardır (ör. "Spagetti Bolognese").
- Tarifler sıralı bir adım listesi içerir (ör. "Fırını önceden ısıtın", "Kabakları kızartın").
- Her adım bazı talimatlar içerir (örn. "Fırını önceden ısıtın") ve tek bir tarife aittir.
- Adımlar herhangi bir sayıda bileşen içerebilir (sıfır, bir veya daha fazla).
- Bir adım bir veya daha fazla bileşen içeriyorsa, her bileşen belirli bir sırada kullanılır.
- Malzemeler farklı tariflerde, farklı miktarlarda kullanılabilir.

#### Veri Modeli

Ekiple beyin fırtınası yaptıktan sonra, bir tarifin **JSON temsilinin** aşağıdaki gibi _olabileceği_ önerildi:

```json
{
  "tarif_id" : 1,
  "tarif_adi": "Spagetti Bolonez",
  "kayit_tarihi": "2021-01-01 08:23:19.120",
  "adimlar": [
    {
      "adim_id": 11,
      "adim_sirasi": 1,
      "adim_talimati": "Büyük bir tencereyi orta ateşe koyun",
      "icindekiler": []
    },
    {
      "adim_id": 12,
      "adim_sirasi": 2,
      "adim_talimati": "1 yemek kaşığı zeytinyağı ekleyin",
      "icindekiler": [
        { "icindekiler_id": 27, "icindekiler_adi": "zeytinyağı", "miktar": 0.014 }
      ]
    },
  ]
}
```

Yukarıdaki JSON bir örnektir. SQL kullanarak birkaç tablodan veri sorgulamanın ve ardından verileri belirli bir formata sokmak için JavaScript kullanmanın sonucudur.

`{ "içindekiler_id": 27, "içindekiler_adı": "zeytinyağı", "miktar": 0,014 }` alanlarının hepsinin aynı tablodan gelme ihtimalinin düşük olduğunu unutmayın. Aksi takdirde, bir bileşen yalnızca sabit bir miktarda kullanılabilir!

Herhangi bir kod yazmadan önce, veri modelinde istenen tüm tabloları yazın ve tablolar arasındaki ilişkileri belirleyin.

**Tasarımınızı DÖRT tabloda tutmaya çalışın**. Üç tablo ile tüm gereksinimleri karşılamak zor olacak ve 5'ten fazlası muhtemelen gereğinden fazla olacaktır.

#### Proje Ana Yapısı

- "package.json" ve "knexfile.js" ile başlayan bir Express uygulamasını bir araya getirin. Gerekirse mevcut projeleri referans olarak kullanın.

#### Migration ve Seed'ler

- Bu verileri modellemek için gerekli tüm tabloları oluşturan bir migration dosyası yazın
- Tabloları test verileriyle doldurmak için seed dosyaları yazın. **İpucu**: Tariflerinizi basit tutun, aksi takdirde bu adım aşırı derecede zaman alabilir.

#### Veri Erişimi (Model Functions)

Aşağıdaki işleve sahip bir nesneyi dışa aktaran bir veri erişim dosyası yazın:

- `idyeGoreTarifGetir(tarif_id)`
  - Yukarıdaki **Veri Modeli**'nde gösterilene benzer bir tarifin temsilini çözmelidir.
  - İşlev, Knex'i kullanarak birkaç tablodan bilgi çekecek ve ardından döngüler, nesneler, dizi yöntemleri vb. kullanarak bir yanıt nesnesi oluşturacaktır.
  - Bunu çözmenin birçok yolu var, ancak performans açısından veritabanına ne kadar az ziyaret olursa o kadar iyi!

#### Uç nokta

`idyeGoreTarifGetir(tarif_id)` işlevini kullanarak kimliğine göre bir tarif getirmek için bir uç nokta yazın.

### Görev 3: Esnek Görevler

- [ ] Veritabanında zaten var olan malzemeleri kullanarak yeni bir tarif oluşturmak için bir uç noktası yazın.
- [ ] React'te, veritabanında zaten var olan malzemeleri seçerek yeni bir tarif oluşturmaya izin veren bir form oluşturun.
- [ ] SQL ve Knex'te **transitions**'ı araştırın: Bir tarif yayınlamak, birkaç tabloya ekleme yapmayı içerir ve eklemelerden herhangi birinin başarısız olması durumunda işlemin tamamen iptal olması veya geri alınması gerekir.

**Sunucuya gönderilen** temsili aşağıdaki gibi görünebilir:

```json
{
  "tarif_id": "Spagetti Bolonez",
  "adımlar": [
    {
      "adim_sirasi": 1,
      "adim_talimati": "Büyük bir tencereyi orta ateşe koyun",
    },
    {
      "adim_sirasi": 2,
      "adim_talimati": "Yumurta ve jambonu karıştırın",
      "icindekiler": [
        { "icindekiler_id": 27, "miktar": 2 },
        { "icindekiler_id": 48, "miktar": 0.1 }
      ]
    },
  ]
}
```
