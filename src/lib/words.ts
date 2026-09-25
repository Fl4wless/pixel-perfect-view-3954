export type Category = {
  slug: string;
  name: string;
  symbol: string;
};

export type Word = {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  examples: string[];
  synonyms: string[];
  category: string;
};

export const categories: Category[] = [
  { slug: "kazdodenny-zivot", name: "Každodenný život", symbol: "☕" },
  { slug: "praca-a-biznis", name: "Práca a biznis", symbol: "✎" },
  { slug: "cestovanie", name: "Cestovanie", symbol: "✈" },
  { slug: "emocie", name: "Emócie", symbol: "❥" },
  { slug: "komunikacia", name: "Komunikácia", symbol: "✆" },
  { slug: "technologie", name: "Technológie", symbol: "◈" },
  { slug: "kultura", name: "Kultúra", symbol: "♪" },
  { slug: "slang", name: "Slang", symbol: "✷" },
  { slug: "literatura", name: "Literatúra", symbol: "❦" },
  { slug: "priroda", name: "Príroda", symbol: "☘" },
];

export const words: Word[] = [
  {
    id: "petrichor",
    word: "petrichor",
    phonetic: "/ˈpɛtrɪkɔːr/",
    partOfSpeech: "podstatné meno",
    definition: "Príjemná vôňa zeme po daždi, ktorý prišiel po dlhom suchu.",
    examples: [
      "She opened the window just to breathe in the petrichor.",
      "The garden smelled of petrichor all evening.",
    ],
    synonyms: ["earthy scent", "after-rain smell"],
    category: "priroda",
  },
  {
    id: "linger",
    word: "linger",
    phonetic: "/ˈlɪŋɡər/",
    partOfSpeech: "sloveso",
    definition: "Zostať niekde dlhšie, než je nutné, pretože sa nám nechce odísť.",
    examples: [
      "We linger at the table long after the coffee goes cold.",
      "Her words lingered in my head for days.",
    ],
    synonyms: ["stay", "remain", "dawdle"],
    category: "kazdodenny-zivot",
  },
  {
    id: "leverage",
    word: "leverage",
    phonetic: "/ˈliːvərɪdʒ/",
    partOfSpeech: "sloveso",
    definition: "Využiť niečo, čo už máme, aby sme dosiahli väčší výsledok.",
    examples: [
      "We leverage our small team by automating the boring parts.",
      "The company leverages its brand to enter new markets.",
    ],
    synonyms: ["utilise", "exploit", "capitalise on"],
    category: "praca-a-biznis",
  },
  {
    id: "wanderlust",
    word: "wanderlust",
    phonetic: "/ˈwɒndəlʌst/",
    partOfSpeech: "podstatné meno",
    definition: "Silná túžba cestovať a objavovať nové miesta.",
    examples: [
      "A single photo was enough to trigger her wanderlust.",
      "His wanderlust never really fades.",
    ],
    synonyms: ["itchy feet", "travel bug"],
    category: "cestovanie",
  },
  {
    id: "serene",
    word: "serene",
    phonetic: "/səˈriːn/",
    partOfSpeech: "prídavné meno",
    definition: "Pokojný a vyrovnaný, bez napätia alebo nepokoja.",
    examples: [
      "He stayed serene even when everything went wrong.",
      "The lake was perfectly serene at dawn.",
    ],
    synonyms: ["calm", "tranquil", "composed"],
    category: "emocie",
  },
  {
    id: "candid",
    word: "candid",
    phonetic: "/ˈkændɪd/",
    partOfSpeech: "prídavné meno",
    definition: "Úprimný a priamy, aj keď to nie je pohodlné.",
    examples: [
      "Let me be candid with you about the deadline.",
      "It was a candid conversation between friends.",
    ],
    synonyms: ["frank", "honest", "open"],
    category: "komunikacia",
  },
  {
    id: "seamless",
    word: "seamless",
    phonetic: "/ˈsiːmləs/",
    partOfSpeech: "prídavné meno",
    definition: "Plynulý, bez viditeľných prechodov alebo prerušení.",
    examples: [
      "The update was seamless — nobody noticed it.",
      "They promise a seamless experience across devices.",
    ],
    synonyms: ["smooth", "fluid", "uninterrupted"],
    category: "technologie",
  },
  {
    id: "zeitgeist",
    word: "zeitgeist",
    phonetic: "/ˈzaɪtɡaɪst/",
    partOfSpeech: "podstatné meno",
    definition: "Duch doby — nálada a myslenie, ktoré typicky vystihuje dané obdobie.",
    examples: [
      "The film captured the zeitgeist of the early nineties.",
      "Memes are a fast mirror of the zeitgeist.",
    ],
    synonyms: ["spirit of the age", "mood"],
    category: "kultura",
  },
  {
    id: "vibe-check",
    word: "vibe check",
    phonetic: "/vaɪb tʃɛk/",
    partOfSpeech: "slangový výraz",
    definition: "Rýchle overenie nálady človeka alebo situácie.",
    examples: [
      "Quick vibe check before we start the meeting?",
      "The party failed the vibe check.",
    ],
    synonyms: ["mood check"],
    category: "slang",
  },
  {
    id: "prose",
    word: "prose",
    phonetic: "/prəʊz/",
    partOfSpeech: "podstatné meno",
    definition: "Bežná písaná reč bez veršov, na rozdiel od poézie.",
    examples: [
      "Her prose is short, dry and strangely beautiful.",
      "He writes poetry, but his prose is even better.",
    ],
    synonyms: ["writing", "text"],
    category: "literatura",
  },
  {
    id: "meander",
    word: "meander",
    phonetic: "/miˈændər/",
    partOfSpeech: "sloveso",
    definition: "Pohybovať sa pomaly a kľukato, bez jasného cieľa.",
    examples: [
      "The river meanders through the valley.",
      "We meandered around the old town until sunset.",
    ],
    synonyms: ["wander", "wind", "ramble"],
    category: "priroda",
  },
  {
    id: "mundane",
    word: "mundane",
    phonetic: "/mʌnˈdeɪn/",
    partOfSpeech: "prídavné meno",
    definition: "Obyčajný, všedný, bez niečoho zaujímavého.",
    examples: [
      "She finds beauty in mundane moments.",
      "Most of the job is mundane paperwork.",
    ],
    synonyms: ["ordinary", "everyday", "banal"],
    category: "kazdodenny-zivot",
  },
  {
    id: "onboarding",
    word: "onboarding",
    phonetic: "/ˈɒnbɔːdɪŋ/",
    partOfSpeech: "podstatné meno",
    definition: "Proces, počas ktorého sa nový človek alebo používateľ zoznamuje so systémom.",
    examples: [
      "Our onboarding takes less than three minutes.",
      "Good onboarding saves hours of support later.",
    ],
    synonyms: ["induction", "orientation"],
    category: "praca-a-biznis",
  },
  {
    id: "layover",
    word: "layover",
    phonetic: "/ˈleɪəʊvər/",
    partOfSpeech: "podstatné meno",
    definition: "Prestávka medzi dvoma letmi alebo spojmi počas cesty.",
    examples: [
      "I had a six-hour layover in Helsinki.",
      "We used the layover to see the city centre.",
    ],
    synonyms: ["stopover", "break"],
    category: "cestovanie",
  },
  {
    id: "bittersweet",
    word: "bittersweet",
    phonetic: "/ˌbɪtəˈswiːt/",
    partOfSpeech: "prídavné meno",
    definition: "Zároveň radostný aj smutný — sladký pocit s nádychom straty.",
    examples: [
      "Saying goodbye was bittersweet.",
      "A bittersweet ending is still an ending.",
    ],
    synonyms: ["poignant", "wistful"],
    category: "emocie",
  },
  {
    id: "nuance",
    word: "nuance",
    phonetic: "/ˈnjuːɑːns/",
    partOfSpeech: "podstatné meno",
    definition: "Jemný rozdiel vo význame, tóne alebo výraze.",
    examples: [
      "The translation lost every nuance of the original.",
      "He hears nuance where others hear noise.",
    ],
    synonyms: ["subtlety", "shade"],
    category: "komunikacia",
  },
  {
    id: "latency",
    word: "latency",
    phonetic: "/ˈleɪtənsi/",
    partOfSpeech: "podstatné meno",
    definition: "Oneskorenie medzi akciou a odozvou systému.",
    examples: [
      "Low latency makes the app feel instant.",
      "The latency was noticeable on a slow connection.",
    ],
    synonyms: ["delay", "lag"],
    category: "technologie",
  },
  {
    id: "renaissance",
    word: "renaissance",
    phonetic: "/rɪˈneɪsns/",
    partOfSpeech: "podstatné meno",
    definition: "Obnovenie záujmu o niečo, znovuzrodenie alebo rozkvet.",
    examples: [
      "Vinyl records are having a renaissance.",
      "The neighbourhood went through a quiet renaissance.",
    ],
    synonyms: ["revival", "rebirth"],
    category: "kultura",
  },
  {
    id: "lowkey",
    word: "lowkey",
    phonetic: "/ˈləʊkiː/",
    partOfSpeech: "slangový výraz",
    definition: "Trochu, potichu, nenápadne — často o pocite, ku ktorému sa človek nechce nahlas priznať.",
    examples: [
      "I'm lowkey excited about Monday.",
      "That place is lowkey the best café in town.",
    ],
    synonyms: ["slightly", "quietly"],
    category: "slang",
  },
  {
    id: "elegy",
    word: "elegy",
    phonetic: "/ˈɛlɪdʒi/",
    partOfSpeech: "podstatné meno",
    definition: "Smútočná báseň alebo text napísaný na pamiatku niekoho.",
    examples: [
      "The whole album reads like an elegy.",
      "He wrote an elegy for a city that no longer exists.",
    ],
    synonyms: ["lament", "requiem"],
    category: "literatura",
  },
];

export function categoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function wordById(id: string) {
  return words.find((w) => w.id === id);
}

export function wordsInCategory(slug: string) {
  return words.filter((w) => w.category === slug);
}
