export const DEFAULT_TEAMS = [
  { id: "team_1", name: "Puistola U12", group: "A" },
  { id: "team_2", name: "HJK Sininen", group: "A" },
  { id: "team_3", name: "Malmi PS", group: "A" },
  { id: "team_4", name: "Honka Akatemia", group: "A" },
  { id: "team_5", name: "GrIFK Green", group: "B" },
  { id: "team_6", name: "VJS Vantaa", group: "B" },
  { id: "team_7", name: "Gnistan Kelt.", group: "B" },
  { id: "team_8", name: "PK-35 Punainen", group: "B" }
];

export const DEFAULT_MATCHES = [
  { id: "match_1", home: "team_1", away: "team_2", hg: 2, ag: 1, time: "11:00", field: 1, live: false },
  { id: "match_2", home: "team_3", away: "team_4", hg: 0, ag: 3, time: "11:00", field: 2, live: false },
  { id: "match_3", home: "team_5", away: "team_6", hg: 1, ag: 2, time: "11:30", field: 1, live: false },
  { id: "match_4", home: "team_7", away: "team_8", hg: 1, ag: 1, time: "11:30", field: 2, live: false },
  { id: "match_5", home: "team_1", away: "team_3", hg: 3, ag: 0, time: "12:00", field: 1, live: false },
  { id: "match_6", home: "team_2", away: "team_4", hg: 1, ag: 3, time: "12:00", field: 2, live: false },
  { id: "match_7", home: "team_5", away: "team_7", hg: 2, ag: 0, time: "12:30", field: 1, live: false },
  { id: "match_8", home: "team_6", away: "team_8", hg: 0, ag: 2, time: "12:30", field: 2, live: false },
  { id: "match_9", home: "team_1", away: "team_4", hg: 2, ag: 1, time: "14:30", field: 1, live: true },
  { id: "match_10", home: "team_2", away: "team_3", hg: 1, ag: 1, time: "14:30", field: 2, live: true }
];

export const DEFAULT_PLAYOFFS = [
  { id: "qf_1", round: "qf", home: "team_1", away: "team_8", hg: 3, ag: 1, live: false, time: "16:30", field: 1 },
  { id: "qf_2", round: "qf", home: "team_5", away: "team_4", hg: 0, ag: 2, live: false, time: "16:30", field: 2 },
  { id: "qf_3", round: "qf", home: "team_6", away: "team_2", hg: 2, ag: 1, live: true, time: "17:15", field: 1 },
  { id: "qf_4", round: "qf", home: "team_7", away: "team_3", hg: null, ag: null, live: false, time: "17:15", field: 2 },
  { id: "sf_1", round: "sf", home: "Puistola U12", away: "Honka Akatemia", hg: null, ag: null, live: false, time: "18:00", field: 1 },
  { id: "sf_2", round: "sf", home: "VJS Vantaa", away: "qf_4 Voittaja", hg: null, ag: null, live: false, time: "18:45", field: 2 },
  { id: "final", round: "final", home: "sf_1 Voittaja", away: "sf_2 Voittaja", hg: null, ag: null, live: false, time: "20:30", field: 1 }
];

export const DEFAULT_SPONSORIT = [
  {
    id: "sp_1",
    name: "Kotkan Satama",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9bWcaLHIh1QKmuPh7gt5KV7Xtb0mamGFNDppfLGgf_QQH3ltjJlgjMBal4qPvLpIyCDo6JURhWYrj1JYChyezUMN-5DEdNxxJp_cPBWzP-Y7lwndn8gJ_aHB_KwHdftC-XLtk0oFlnG315O23iXHGeTjeGBq3YnhpplHu77BcumUAgbyRtX-AigZI9-fTMfiLKn5jUDdIQvUdRgZqDU-7xNGg5RQG5KQOPZxiVpH_vSGaa2Vy2_CoV4ilxbi73-0IzT5MFHw-yKG2",
    url: "https://www.haminahamina.fi",
    tier: "main"
  },
  {
    id: "sp_2",
    name: "Mussalon Kala",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAlQ2ConfIxtWVwW06VexWwoa66lup6b58p_FFHIdPLU6jpc9gVRIofW1vq1I2xXyylXC9axvQpCOi1pCpkW3CZrle-kliQmaK8KTvEKSPkyiqy0APYt3vA246xTp7GhSElPFokPsQj7PODv9Oyiqi0wK7b9cPX_luhsuAeiBfgx3jlJRoOqxyFMjHziXGinXSOYHXyxZusA_ZPRJHcfSl7l_Usz1gErjEiWfYfiDLEbvk9lewuYBUJG80fEe9M-82aJRep1Fdo4Se",
    url: "https://www.mussalonkala.fi",
    tier: "main"
  },
  {
    id: "sp_3",
    name: "Puistola Urheilukauppa",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRFZkjz0nGeE5mgTfPQPM38HoyJ73XOoIjy1sbjWAMC94BEdSAPeXq5hp9WPBK1rCeTy0tDCiIdxwuqXten8hJYq3er3PUrlrxGaMPi6YIhqjtC2TQIkVNSP1xMxZvD7uzmNM8Hy1WL2x-cgnbh8we4Kl6eXkA6pc_8jpe2hnp8jP1jTPcRKd6-c6FlaTkKrL2xIxajq51hS3heSdE01L7DoDAEfTbIhJL8L8GZIAs7ZNNqhgWUwVYmUb1NUJqCWiuzu-T4NZVwNiv",
    url: "https://www.kotka.fi",
    tier: "partner"
  },
  {
    id: "sp_4",
    name: "Kotkan Teräs",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfKqiwKiaOWytuCABCzU9cXynpKeDv5PLpxw0npnsMeepjPNrSZYgO0WHExUlKGNsE_x-ISi-khaOIinH5_zVhVlv_C6dMkuim-_HdEisVWQLrbj7yFYUDAWdd-IUsC_o8S2ZLuks54ScW68wfCafvN_Kv_2o595GQ-nckYXj0Fd6HmOnApkhAspOAmkcw5bpinoWTAc0iu-yfnKPHVB8qcl8Z0yBKNFO4l5iEDLf3PJ-oq-yIx6cSqxurGjqDG_3qAyCzUpsz222C",
    url: "https://www.hamina.fi",
    tier: "partner"
  }
];

export const DEFAULT_SETTINGS = {
  footerText: "PuistolaCup 2026 • Kotka Puistola • Athletic, Precise, Urgent.",
  sponsorsIntro: "Kiitos kaikille yhteistyökumppaneillemme, jotka tekevät PuistolaCupista mahdollisen! Puistolan upealla urheilukentällä nähdään upeita urheilusuorituksia.",
  rules: `## SÄÄNNÖT

### Yleissäännöt
- Pelataan 7v7-formaatilla höntsähengessä (6 kenttäpelaajaa + maalivahti).
- Turnaus järjestetään 4.7.2026 Kotkassa, Puistolan urheilukentällä.
- Otteluaika on tasan 20 minuuttia per peli ilman taukoja.
- Paitsiosääntö ei ole käytössä. Lentävät rajattomat edestakaiset vaihdot ovat sallittuja pelikatkoilla. Useamman ottelun yhtäaikainen pelaaminen onnistuu kahdella kentällämme.

### Pisteytysjärjestelmä
- Voitosta saa 3 pistettä, tasapelistä 1 pisteen ja häviöstä 0 pistettä.
- Lohkosijoitukset ratkaistaan järjestyksessä:
  1. Pisteet
  2. Maaliero
  3. Tehdyt maalit
  4. Keskinäinen ottelu
  5. Arpa

### Pudotuspelit
- Jos pudotuspeli päättyy tasan 20 minuutin jälkeen, ratkaistaan voittaja suoraan rangaistuspotkukilpailulla (3 laukojaa per joukkue, sen jälkeen kerrasta poikki rangaistuspotkut).
- Pudotuspelikaavio sisältää: Puolivälierät, Välierät ja Finaalin.

### Käytännön ohjeet
- Jokaisella joukkueella tulee olla yhtenäinen peliasu tai peliliivit.
- Puistolan urheilukenttä on hiekka/tekonurmi, pukeuduthan sään mukaisesti.
- Reilu peli ja positiivinen asenne ovat turnauksen kulmakivet! Tervetuloa pelaamaan ja nauttimaan!`
};
