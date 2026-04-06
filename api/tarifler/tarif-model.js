const db = require('../../data/db-config.js');

async function idyeGoreTarifGetir(tarif_id) {
  // Query to get recipe with its steps and ingredients in a single db call
  const tarifRows = await db('tarifler as t')
    .leftJoin('adimlar as a', 't.tarif_id', 'a.tarif_id')
    .leftJoin('adim_icindekiler as ai', 'a.adim_id', 'ai.adim_id')
    .leftJoin('icindekiler as i', 'ai.icindekiler_id', 'i.icindekiler_id')
    .select(
      't.tarif_id',
      't.tarif_adi',
      't.kayit_tarihi',
      'a.adim_id',
      'a.adim_sirasi',
      'a.adim_talimati',
      'i.icindekiler_id',
      'i.icindekiler_adi',
      'ai.miktar'
    )
    .where('t.tarif_id', tarif_id)
    .orderBy('a.adim_sirasi');

  if (tarifRows.length === 0) {
    return null;
  }

  // Construct the JSON structure
  const result = {
    tarif_id: tarifRows[0].tarif_id,
    tarif_adi: tarifRows[0].tarif_adi,
    kayit_tarihi: tarifRows[0].kayit_tarihi,
    adimlar: []
  };

  const adimMap = {};

  for (let row of tarifRows) {
    if (row.adim_id) {
      if (!adimMap[row.adim_id]) {
        adimMap[row.adim_id] = {
          adim_id: row.adim_id,
          adim_sirasi: row.adim_sirasi,
          adim_talimati: row.adim_talimati,
          icindekiler: []
        };
        result.adimlar.push(adimMap[row.adim_id]);
      }

      if (row.icindekiler_id) {
        adimMap[row.adim_id].icindekiler.push({
          icindekiler_id: row.icindekiler_id,
          icindekiler_adi: row.icindekiler_adi,
          miktar: row.miktar
        });
      }
    }
  }

  return result;
}

module.exports = {
  idyeGoreTarifGetir
};
