// Mock data for releases
const releases = [
  {
    id: 1,
    title: "Burn The Pages",
    artist: "Sia",
    track: "Burn The Pages",
    created: "2024-12-15T10:30:00Z",
    views: 1523,
    downloads: 342,
    type: "release",
    duration: 235,
    src: require("../assets/audios/Sia - Burn The Pages.mp3"),
    srcDownload: require("../assets/audios/Sia - Burn The Pages.mp3"),
    cover: require("../assets/release.png"),
    desc: [
      { lang: 'en', value: 'Powerful vocal performance with emotional depth' },
      { lang: 'ru', value: 'Мощное вокальное исполнение с эмоциональной глубиной' }
    ],
    tags: [
      { value: [{ lang: 'en', value: 'Pop' }, { lang: 'ru', value: 'Поп' }] },
      { value: [{ lang: 'en', value: 'Emotional' }, { lang: 'ru', value: 'Эмоциональный' }] }
    ]
  },
  {
    id: 2,
    title: "FU",
    artist: "Miley Cyrus",
    track: "FU",
    created: "2024-11-20T14:15:00Z",
    views: 2145,
    downloads: 567,
    type: "release",
    duration: 229,
    src: require("../assets/audios/Miley Cyrus - FU.mp3"),
    srcDownload: require("../assets/audios/Miley Cyrus - FU.mp3"),
    cover: require("../assets/release.png"),
    desc: [
      { lang: 'en', value: 'Bold and unapologetic pop anthem' },
      { lang: 'ru', value: 'Смелый и бескомпромиссный поп-гимн' }
    ],
    tags: [
      { value: [{ lang: 'en', value: 'Pop' }, { lang: 'ru', value: 'Поп' }] },
      { value: [{ lang: 'en', value: 'Dance' }, { lang: 'ru', value: 'Танцевальный' }] }
    ]
  },
  {
    id: 3,
    title: "Midnight Beats",
    artist: "Stick Heinz",
    track: "Midnight Beats",
    created: "2024-10-10T09:45:00Z",
    views: 3421,
    downloads: 892,
    type: "release",
    duration: 195,
    cover: require("../assets/release.png"),
    desc: [
      { lang: 'en', value: 'Dark atmospheric hip-hop with heavy bass' },
      { lang: 'ru', value: 'Темный атмосферный хип-хоп с тяжелым басом' }
    ],
    tags: [
      { value: [{ lang: 'en', value: 'Hip-Hop' }, { lang: 'ru', value: 'Хип-Хоп' }] },
      { value: [{ lang: 'en', value: 'Dark' }, { lang: 'ru', value: 'Темный' }] }
    ]
  },
  {
    id: 4,
    title: "Street Poetry",
    artist: "Stick Heinz",
    track: "Street Poetry",
    created: "2024-09-05T16:20:00Z",
    views: 1876,
    downloads: 423,
    type: "demo",
    duration: 175,
    cover: require("../assets/release.png"),
    desc: [
      { lang: 'en', value: 'Raw street vibes with classic boom-bap drums' },
      { lang: 'ru', value: 'Сырые уличные вибрации с классическими boom-bap барабанами' }
    ],
    tags: [
      { value: [{ lang: 'en', value: 'Hip-Hop' }, { lang: 'ru', value: 'Хип-Хоп' }] },
      { value: [{ lang: 'en', value: 'Boom-Bap' }, { lang: 'ru', value: 'Boom-Bap' }] }
    ]
  },
  {
    id: 5,
    title: "Golden Era",
    artist: "Stick Heinz",
    track: "Golden Era",
    created: "2024-08-12T11:30:00Z",
    views: 4532,
    downloads: 1245,
    type: "release",
    duration: 220,
    cover: require("../assets/release.png"),
    desc: [
      { lang: 'en', value: 'Tribute to 90s hip-hop golden age' },
      { lang: 'ru', value: 'Дань уважения золотому веку хип-хопа 90-х' }
    ],
    tags: [
      { value: [{ lang: 'en', value: 'Hip-Hop' }, { lang: 'ru', value: 'Хип-Хоп' }] },
      { value: [{ lang: 'en', value: '90s Style' }, { lang: 'ru', value: 'Стиль 90-х' }] }
    ]
  },
  {
    id: 6,
    title: "Raw Energy",
    artist: "Stick Heinz",
    track: "Raw Energy",
    created: "2024-07-22T13:10:00Z",
    views: 2987,
    downloads: 734,
    type: "demo",
    duration: 190,
    cover: require("../assets/release.png"),
    desc: [
      { lang: 'en', value: 'High energy trap beat with aggressive 808s' },
      { lang: 'ru', value: 'Энергичный трэп-бит с агрессивными 808-ми' }
    ],
    tags: [
      { value: [{ lang: 'en', value: 'Trap' }, { lang: 'ru', value: 'Трэп' }] },
      { value: [{ lang: 'en', value: 'Hard' }, { lang: 'ru', value: 'Жесткий' }] }
    ]
  },
  {
    id: 7,
    title: "Cosmic Vibes",
    artist: "Stick Heinz",
    track: "Cosmic Vibes",
    created: "2024-06-18T08:50:00Z",
    views: 3654,
    downloads: 956,
    type: "release",
    duration: 210,
    cover: require("../assets/release.png"),
    desc: [
      { lang: 'en', value: 'Spacey atmospheric production with ethereal melodies' },
      { lang: 'ru', value: 'Космическая атмосферная продукция с воздушными мелодиями' }
    ],
    tags: [
      { value: [{ lang: 'en', value: 'Chill' }, { lang: 'ru', value: 'Расслабленный' }] },
      { value: [{ lang: 'en', value: 'Atmospheric' }, { lang: 'ru', value: 'Атмосферный' }] }
    ]
  },
  {
    id: 8,
    title: "Underground Sound",
    artist: "Stick Heinz",
    track: "Underground Sound",
    created: "2024-05-30T15:25:00Z",
    views: 2234,
    downloads: 589,
    type: "release",
    duration: 198,
    cover: require("../assets/release.png"),
    desc: [
      { lang: 'en', value: 'Gritty underground hip-hop with raw samples' },
      { lang: 'ru', value: 'Грубый андерграундный хип-хоп с сырыми сэмплами' }
    ],
    tags: [
      { value: [{ lang: 'en', value: 'Hip-Hop' }, { lang: 'ru', value: 'Хип-Хоп' }] },
      { value: [{ lang: 'en', value: 'Underground' }, { lang: 'ru', value: 'Андерграунд' }] }
    ]
  }
];

export default releases;
