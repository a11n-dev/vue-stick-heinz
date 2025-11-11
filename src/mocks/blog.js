// Mock data for blog
const blogPosts = [
  {
    id: 1,
    title: {
      en: "How I Create Hip-Hop Beats: My Production Process",
      ru: "Как я создаю хип-хоп биты: мой продакшн процесс"
    },
    excerpt: {
      en: "Behind the scenes of my creative process. From inspiration to final mixdown, here's how I craft my beats.",
      ru: "За кулисами моего творческого процесса. От вдохновения до финального сведения - вот как я создаю свои биты."
    },
    content: {
      en: `<p>Creating hip-hop beats is not just about placing sounds on a timeline. It's a journey of creativity, technical skill, and artistic expression. In this post, I'll share my production process.</p>
      <p>I start with finding the right sample or creating a melody from scratch. The foundation of any great beat is a solid groove.</p>
      <p>Then comes the drum programming - this is where the magic happens. The right kick and snare placement can make or break a track.</p>`,
      ru: `<p>Создание хип-хоп битов - это не просто размещение звуков на таймлайне. Это путешествие творчества, технических навыков и художественного самовыражения. В этом посте я поделюсь своим продакшн процессом.</p>
      <p>Я начинаю с поиска правильного сэмпла или создания мелодии с нуля. Основа любого отличного бита - это крепкий грув.</p>
      <p>Затем идёт программирование барабанов - вот где происходит магия. Правильное размещение кика и снейра может сделать или разрушить трек.</p>`
    },
    image: require("../assets/blog.png"),
    date: "2024-12-01T10:00:00Z",
    views: 1243,
    category: {
      en: "Production",
      ru: "Продакшн"
    }
  },
  {
    id: 2,
    title: {
      en: "Best VST Plugins for Hip-Hop Production in 2024",
      ru: "Лучшие VST плагины для хип-хоп продакшна в 2024"
    },
    excerpt: {
      en: "A comprehensive guide to the essential plugins every hip-hop producer should have in their arsenal.",
      ru: "Полное руководство по необходимым плагинам, которые должны быть у каждого хип-хоп продюсера."
    },
    content: {
      en: `<p>In this guide, I'll break down my favorite VST plugins that I use in every production.</p>
      <p>Native Instruments Massive X is still my go-to for bass synthesis. The sound design possibilities are endless.</p>
      <p>For drums, I can't live without Battery and Kontakt. They provide the punchy, crisp sounds that modern hip-hop demands.</p>`,
      ru: `<p>В этом руководстве я расскажу о моих любимых VST плагинах, которые использую в каждом проекте.</p>
      <p>Native Instruments Massive X - всё ещё мой фаворит для синтеза баса. Возможности саунд-дизайна бесконечны.</p>
      <p>Для барабанов я не могу жить без Battery и Kontakt. Они дают пробивные, чёткие звуки, которые требует современный хип-хоп.</p>`
    },
    image: require("../assets/blog.png"),
    date: "2024-11-15T14:30:00Z",
    views: 2156,
    category: {
      en: "Tools",
      ru: "Инструменты"
    }
  },
  {
    id: 3,
    title: {
      en: "The Evolution of Hip-Hop Production",
      ru: "Эволюция хип-хоп продакшна"
    },
    excerpt: {
      en: "From boom-bap to trap: exploring how hip-hop production has evolved over the decades.",
      ru: "От boom-bap до trap: исследуем, как хип-хоп продакшн эволюционировал за десятилетия."
    },
    content: {
      en: `<p>Hip-hop production has come a long way since the golden era of the 90s. Let's take a journey through time.</p>
      <p>The boom-bap sound of the 90s was characterized by hard-hitting drums and jazz samples. Producers like DJ Premier set the standard.</p>
      <p>Today, trap music dominates with its 808s, hi-hat rolls, and minimalist approach. But the foundation remains the same - great drums and creativity.</p>`,
      ru: `<p>Хип-хоп продакшн прошёл долгий путь с золотой эры 90-х. Давайте совершим путешествие во времени.</p>
      <p>Звучание boom-bap 90-х характеризовалось мощными барабанами и джазовыми сэмплами. Такие продюсеры как DJ Premier установили стандарт.</p>
      <p>Сегодня доминирует trap музыка с её 808-ми, хай-хэт роллами и минималистичным подходом. Но основа остаётся той же - отличные барабаны и креативность.</p>`
    },
    image: require("../assets/blog.png"),
    date: "2024-10-20T09:15:00Z",
    views: 3421,
    category: {
      en: "History",
      ru: "История"
    }
  },
  {
    id: 4,
    title: {
      en: "Mixing Tips for Hip-Hop Beats",
      ru: "Советы по сведению хип-хоп битов"
    },
    excerpt: {
      en: "Essential mixing techniques to make your beats sound professional and radio-ready.",
      ru: "Основные техники сведения, чтобы ваши биты звучали профессионально и были готовы для радио."
    },
    content: {
      en: `<p>Mixing is where good beats become great. Here are my top tips for getting a professional sound.</p>
      <p>Start with proper gain staging. Make sure nothing is clipping before you even add any processing.</p>
      <p>Use EQ to create space in your mix. Cut the lows from everything except the bass and kick.</p>`,
      ru: `<p>Сведение - это то, где хорошие биты становятся великими. Вот мои главные советы для получения профессионального звука.</p>
      <p>Начните с правильной настройки уровней. Убедитесь, что ничто не клипует, прежде чем добавлять какую-либо обработку.</p>
      <p>Используйте эквалайзер, чтобы создать пространство в миксе. Вырезайте низы из всего, кроме баса и кика.</p>`
    },
    image: require("../assets/blog.png"),
    date: "2024-09-10T16:45:00Z",
    views: 1876,
    category: {
      en: "Mixing",
      ru: "Сведение"
    }
  },
  {
    id: 5,
    title: {
      en: "Sample Clearance: What Producers Need to Know",
      ru: "Очистка сэмплов: что нужно знать продюсерам"
    },
    excerpt: {
      en: "Understanding the legal side of sampling and how to protect your work.",
      ru: "Понимание юридической стороны сэмплирования и как защитить свою работу."
    },
    content: {
      en: `<p>Sampling is an art form, but it comes with legal responsibilities. Here's what you need to know.</p>
      <p>Always try to clear your samples before releasing music commercially. It can save you a lot of trouble down the line.</p>
      <p>Consider creating original compositions or using royalty-free samples to avoid legal issues altogether.</p>`,
      ru: `<p>Сэмплирование - это искусство, но оно идёт с юридическими обязательствами. Вот что вам нужно знать.</p>
      <p>Всегда пытайтесь очистить свои сэмплы перед коммерческим релизом музыки. Это может избавить вас от многих проблем в будущем.</p>
      <p>Рассмотрите создание оригинальных композиций или использование royalty-free сэмплов, чтобы полностью избежать юридических проблем.</p>`
    },
    image: require("../assets/blog.png"),
    date: "2024-08-05T11:20:00Z",
    views: 2543,
    category: {
      en: "Legal",
      ru: "Юридическое"
    }
  },
  {
    id: 6,
    title: {
      en: "Building Your Home Studio on a Budget",
      ru: "Строим домашнюю студию с ограниченным бюджетом"
    },
    excerpt: {
      en: "You don't need expensive gear to make great music. Here's how to start with what you have.",
      ru: "Вам не нужно дорогое оборудование, чтобы создавать отличную музыку. Вот как начать с того, что у вас есть."
    },
    content: {
      en: `<p>Starting a home studio doesn't have to break the bank. Here's my guide to getting started on a budget.</p>
      <p>Invest in good monitors or quality headphones first. You need to hear what you're creating accurately.</p>
      <p>A decent audio interface and a MIDI controller are essential. Everything else can come later.</p>`,
      ru: `<p>Запуск домашней студии не должен разорить вас. Вот моё руководство по началу работы с ограниченным бюджетом.</p>
      <p>Сначала инвестируйте в хорошие мониторы или качественные наушники. Вам нужно точно слышать то, что вы создаёте.</p>
      <p>Приличный аудиоинтерфейс и MIDI-контроллер необходимы. Всё остальное может прийти позже.</p>`
    },
    image: require("../assets/blog.png"),
    date: "2024-07-18T13:30:00Z",
    views: 4231,
    category: {
      en: "Studio",
      ru: "Студия"
    }
  }
];

export default blogPosts;
