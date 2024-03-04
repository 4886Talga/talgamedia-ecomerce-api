const products = [
  {
    name: "Elegant vit bukett",
    price: 495,
    discount: 0,
    image: "https://flora.se/wp-content/uploads/2019/05/BukettBiancaStor.png",
    brand: "Flora",
    countInStock: 7,
    description:
      "Elegant vit bukett bunden med olika vita blommor. Buketten inehåller rosor, mini gerbera, alstromeria, santini och grönt.",
    averageRating: 0,
    slug: "Vit bukett",
    sku: "FLOBUK002",
    startsAt: null,
    endsAt: null,
    categories: {
      connectOrCreate: [
        {
          where: {
            name: "Bukett",
          },
          create: {
            name: "Bukett",
          },
        },
        {
          where: {
            name: "Vit",
          },
          create: {
            name: "Vit",
          },
        },
        {
          where: {
            name: "Germini",
          },
          create: {
            name: "Germini",
          },
        },
        {
          where: {
            name: "Alstromeria",
          },
          create: {
            name: "Alstromeris",
          },
        },
        {
          where: {
            name: "Ros",
          },
          create: {
            name: "Ros",
          },
        },
        {
          where: {
            name: "Grönt",
          },
          create: {
            name: "Grönt",
          },
        },
      ],
    },
  },
  {
    name: "Vacker bukett Heartbeat",
    price: 495,
    discount: 0,
    image:
      "https://flora.se/wp-content/uploads/2019/06/BukettHeartbeatStor.png",
    brand: "Flora",
    countInStock: 10,
    description:
      "Vacker bukett i röda toner. Buketten innehåller röda rosor, röda mini gerbera, röda boll krysantemum, hypericum och olika gröna kvistar.",
    averageRating: 0,
    slug: "Röd bukett",
    sku: "FLOBUK003",
    startsAt: null,
    endsAt: null,
    categories: {
      connectOrCreate: [
        {
          where: {
            name: "Bukett",
          },
          create: {
            name: "Bukett",
          },
        },
        {
          where: {
            name: "Röd",
          },
          create: {
            name: "Röd",
          },
        },
        {
          where: {
            name: "Germini",
          },
          create: {
            name: "Germini",
          },
        },
        {
          where: {
            name: "Krysantemum",
          },
          create: {
            name: "Krysantemum",
          },
        },
        {
          where: {
            name: "Ros",
          },
          create: {
            name: "Ros",
          },
        },
        {
          where: {
            name: "Grönt",
          },
          create: {
            name: "Grönt",
          },
        },
      ],
    },
  },
  {
    name: "Bukett Verona",
    price: 495,
    discount: 0,
    image: "https://flora.se/wp-content/uploads/2019/06/BukettVeronaStor.png",
    brand: "Flora",
    countInStock: 5,
    description:
      "Vacker bukett i röda, vita och rosa toner. Den är bunden av våra florister med rosor,  mini krysantemum, mini gerbera och olika gröna kvistar.",
    averageRating: 0,
    slug: "Röd vit rosa bukett",
    sku: "FLOBUK004",
    startsAt: null,
    endsAt: null,
    categories: {
      connectOrCreate: [
        {
          where: {
            name: "Bukett",
          },
          create: {
            name: "Bukett",
          },
        },
        {
          where: {
            name: "Röd",
          },
          create: {
            name: "Röd",
          },
        },
        {
          where: {
            name: "Vit",
          },
          create: {
            name: "Vit",
          },
        },
        {
          where: {
            name: "Rosa",
          },
          create: {
            name: "Rosa",
          },
        },
        {
          where: {
            name: "Germini",
          },
          create: {
            name: "Germini",
          },
        },
        {
          where: {
            name: "Krysantemum",
          },
          create: {
            name: "Krysantemum",
          },
        },
        {
          where: {
            name: "Ros",
          },
          create: {
            name: "Ros",
          },
        },
        {
          where: {
            name: "Grönt",
          },
          create: {
            name: "Grönt",
          },
        },
      ],
    },
  },
  {
    name: "Bukett Surprise",
    price: 495,
    discount: 0,
    image: "https://flora.se/wp-content/uploads/2019/06/BukettSupriseStor.png",
    brand: "Flora",
    countInStock: 5,
    description:
      "Elegant bukett i orange toner. Den är bunden av våra florister med rosor,  mini krysantemum, mini gerbera, hypericum och olika gröna kvistar.",
    averageRating: 0,
    slug: "Orange bukett",
    sku: "FLOBUK005",
    startsAt: null,
    endsAt: null,
    categories: {
      connectOrCreate: [
        {
          where: {
            name: "Bukett",
          },
          create: {
            name: "Bukett",
          },
        },
        {
          where: {
            name: "Orange",
          },
          create: {
            name: "Orange",
          },
        },
        {
          where: {
            name: "Germini",
          },
          create: {
            name: "Germini",
          },
        },
        {
          where: {
            name: "Krysantemum",
          },
          create: {
            name: "Krysantemum",
          },
        },
        {
          where: {
            name: "Ros",
          },
          create: {
            name: "Ros",
          },
        },
        {
          where: {
            name: "Hypericum",
          },
          create: {
            name: "Hypericum",
          },
        },
      ],
    },
  },
  {
    name: "Bukett Sunlove",
    price: 495,
    discount: 0,
    image: "https://flora.se/wp-content/uploads/2019/06/BukettSunloveStor.png",
    brand: "Flora",
    countInStock: 5,
    description:
      "Elegant bukett i gula och blåa toner. Den är bunden av våra florister med rosor,  liljor, mini gerbera, riddarsporre/statice och olika gröna kvistar.",
    averageRating: 0,
    slug: "Gul blå bukett",
    sku: "FLOBUK006",
    startsAt: null,
    endsAt: null,
    categories: {
      connectOrCreate: [
        {
          where: {
            name: "Bukett",
          },
          create: {
            name: "Bukett",
          },
        },
        {
          where: {
            name: "Gul",
          },
          create: {
            name: "Gul",
          },
        },
        {
          where: {
            name: "Blå",
          },
          create: {
            name: "Blå",
          },
        },
        {
          where: {
            name: "Germini",
          },
          create: {
            name: "Germini",
          },
        },
        {
          where: {
            name: "Ros",
          },
          create: {
            name: "Ros",
          },
        },
        {
          where: {
            name: "Riddarsporre",
          },
          create: {
            name: "Riddarsporre",
          },
        },
        {
          where: {
            name: "Lilja",
          },
          create: {
            name: "Lilja",
          },
        },
      ],
    },
  },
  {
    name: "Bukett Grand Prix",
    price: 495,
    discount: 0,
    image:
      "https://flora.se/wp-content/uploads/2019/06/BukettGrandPrixStor.png",
    brand: "Flora",
    countInStock: 8,
    description:
      "Elegant bukett i orange och röda toner. Den är bunden av våra florister med rosor,  alstromeria och olika gröna kvistar.",
    averageRating: 0,
    slug: "Röd orange bukett",
    sku: "FLOBUK006",
    startsAt: null,
    endsAt: null,
    categories: {
      connectOrCreate: [
        {
          where: {
            name: "Bukett",
          },
          create: {
            name: "Bukett",
          },
        },
        {
          where: {
            name: "Röd",
          },
          create: {
            name: "Röd",
          },
        },
        {
          where: {
            name: "Orange",
          },
          create: {
            name: "Orange",
          },
        },
        {
          where: {
            name: "Ros",
          },
          create: {
            name: "Ros",
          },
        },
        {
          where: {
            name: "Alstromeria",
          },
          create: {
            name: "Alstromeria",
          },
        },
        {
          where: {
            name: "Grönt",
          },
          create: {
            name: "Grönt",
          },
        },
      ],
    },
  },
  {
    name: "Bukett Chrush",
    price: 495,
    discount: 0,
    image: "https://flora.se/wp-content/uploads/2019/06/BukettCrushStor.png",
    brand: "Flora",
    countInStock: 8,
    description:
      "Vacker bukett i rosa toner. Den är bunden av våra florister med rosor,  mini krysantemum,mini grbera och olika gröna kvistar.",
    averageRating: 0,
    slug: "Röd orange bukett",
    sku: "FLOBUK007",
    startsAt: null,
    endsAt: null,
    categories: {
      connectOrCreate: [
        {
          where: {
            name: "Bukett",
          },
          create: {
            name: "Bukett",
          },
        },
        {
          where: {
            name: "ROsa",
          },
          create: {
            name: "Rosa",
          },
        },
        {
          where: {
            name: "Krysantemum",
          },
          create: {
            name: "Krysantemum",
          },
        },
        {
          where: {
            name: "Ros",
          },
          create: {
            name: "Ros",
          },
        },
        {
          where: {
            name: "Germini",
          },
          create: {
            name: "Germini",
          },
        },
        {
          where: {
            name: "Grönt",
          },
          create: {
            name: "Grönt",
          },
        },
      ],
    },
  },
];

module.exports = products;
