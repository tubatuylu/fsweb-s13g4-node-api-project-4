exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('adim_icindekiler').truncate();
  await knex('icindekiler').truncate();
  await knex('adimlar').truncate();
  await knex('tarifler').truncate();

  // Insert tarifler
  await knex('tarifler').insert([
    { tarif_adi: 'Spagetti Bolonez' },
  ]);

  // Insert adimlar
  await knex('adimlar').insert([
    { adim_sirasi: 1, adim_talimati: 'Büyük bir tencereyi orta ateşe koyun', tarif_id: 1 },
    { adim_sirasi: 2, adim_talimati: '1 yemek kaşığı zeytinyağı ekleyin', tarif_id: 1 },
    { adim_sirasi: 3, adim_talimati: 'Spagetti makarnayı ekleyip pişirin', tarif_id: 1 },
  ]);

  // Insert icindekiler
  await knex('icindekiler').insert([
    { icindekiler_adi: 'zeytinyağı' },
    { icindekiler_adi: 'tuz' },
    { icindekiler_adi: 'spagetti' },
  ]);

  // Insert adim_icindekiler
  await knex('adim_icindekiler').insert([
    { adim_id: 2, icindekiler_id: 1, miktar: 0.014 },
    { adim_id: 3, icindekiler_id: 2, miktar: 0.05 },
    { adim_id: 3, icindekiler_id: 3, miktar: 0.5 },
  ]);
};
