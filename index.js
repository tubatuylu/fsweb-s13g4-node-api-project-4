require('dotenv').config();
const express = require('express');
const cors = require('cors');

const server = express();

// Middleware'ler
server.use(express.json()); // JSON gövdelerini okuyabilmek için ŞART!
server.use(cors());

// Bellek içi "Veritabanı"
let kullanicilar = [
  { id: 1, kullaniciadi: "ali", sifre: "1234" }
];

// [GET] /api/kullanıcılar
server.get('/api/kullanıcılar', (req, res) => {
  res.json(kullanicilar);
});

// [POST] /api/kayıtol
server.post('/api/kayıtol', (req, res) => {
  const { kullaniciadi, sifre } = req.body;

  if (!kullaniciadi || !sifre) {
    return res.status(400).json({ mesaj: "Kullanıcı adı ve şifre zorunludur!" });
  }

  const yeniKullanici = {
    id: Date.now(), // Basit bir ID oluşturma yöntemi
    kullaniciadi,
    sifre
  };

  kullanicilar.push(yeniKullanici);
  res.status(201).json(yeniKullanici);
});

// [POST] /api/giriş
server.post('/api/giriş', (req, res) => {
  const { kullaniciadi, sifre } = req.body;

  // Kullanıcıyı dizide ara
  const kullanici = kullanicilar.find(
    k => k.kullaniciadi === kullaniciadi && k.sifre === sifre
  );

  if (kullanici) {
    res.json({ mesaj: `Hoşgeldin ${kullaniciadi}!` });
  } else {
    res.status(401).json({ mesaj: "Geçersiz kullanıcı adı veya şifre" });
  }
});

// Port Ayarı
const port = process.env.PORT || 9000;

server.listen(port, () => {
  console.log(`Server ${port} portunda canavar gibi çalışıyor...`);
});