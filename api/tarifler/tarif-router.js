const router = require('express').Router();
const Tarif = require('./tarif-model');

router.get('/:id', async (req, res) => {
  try {
    const tarif = await Tarif.idyeGoreTarifGetir(req.params.id);
    if (!tarif) {
      res.status(404).json({ message: "Tarif bulunamadı" });
    } else {
      res.status(200).json(tarif);
    }
  } catch (err) {
    res.status(500).json({ message: "Tarif alınırken hata oluştu" });
  }
});

module.exports = router;
