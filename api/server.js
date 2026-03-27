const express = require("express");
const cors = require("cors");
const registerValidation = require("../middleware/register"); // Dosya yolunun doğruluğundan emin olun
const bcrypt = require("bcrypt");

const server = express();
const saltRounds = 10; // Hata veren kısım düzeltildi

// Middleware
server.use(cors());
server.use(express.json());

const users = [];

// [GET] Kullanıcı Listesi
server.get("/api/kullanicilar", (req, res) => {
    return res.status(200).json(users);
});

// [POST] Kayıt Ol (Şifre Hashleme dahil)
server.post("/api/kayitol", registerValidation, async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Şifreyi güvenli hale getirme
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const user = {
            username: username,
            email: email,
            password: hashedPassword
        };
        
        users.push(user);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Kayıt sırasında bir hata oluştu" });
    }
});

// [POST] Giriş Yap (Şifre Karşılaştırma dahil)
server.post("/api/giris", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Önce kullanıcıyı bul (username ve email eşleşmeli)
        const user = users.find((item) => 
            item.username === username && item.email === email
        );

        if (user) {
            // Girilen şifre ile hashlenmiş şifreyi karşılaştır
            const isMatch = await bcrypt.compare(password, user.password);
            
            if (isMatch) {
                return res.status(200).json({ message: "Hosgeldin!" });
            } else {
                return res.status(401).json({ error: "Hatali sifre" });
            }
        } else {
            return res.status(401).json({ error: "Username ve email bilgilerinizi kontrol ediniz" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Sunucu hatası" });
    }
});

module.exports = server;