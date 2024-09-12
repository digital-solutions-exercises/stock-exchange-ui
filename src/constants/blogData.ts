export type Slide = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  source?: string;
  author?: string;
  date?: number;
};

export const slides = (language: "en" | "sk" = "en"): Slide[] => [
  {
    id: 1,
    imageUrl: "https://pagedone.io/asset/uploads/1696244059.png",
    title:
      language === "en"
        ? "Clever ways to invest in product to organize your portfolio"
        : "Šikovné spôsoby, ako investovať do produktu na usporiadanie svojho portfólia",
    description:
      language === "en"
        ? "Discover smart investment strategies to streamline and organize your portfolio. Explore innovative approaches to optimize your"
        : "Objavte inteligentné investičné stratégie na zefektívnenie a usporiadanie svojho portfólia. Preskúmajte inovatívne prístupy k optimalizácii",
  },
  {
    id: 2,
    imageUrl: "https://pagedone.io/asset/uploads/1696244074.png",
    title:
      language === "en"
        ? "How to grow your profit through systematic investment with us"
        : "Ako s nami zvýšiť svoj zisk systematickým investovaním",
    description:
      language === "en"
        ? "Unlock the power of systematic investment with us and watch your profits soar. Our expert team will guide you on the path to financial"
        : "Odomknite s nami silu systematického investovania a sledujte, ako vaše zisky stúpajú. Náš odborný tím vás prevedie na ceste k finančným",
  },
  {
    id: 3,
    imageUrl:
      "https://s.yimg.com/uu/api/res/1.2/CGCYssT6RULh7lrtLZwamQ--~B/Zmk9ZmlsbDtoPTYzO3B5b2ZmPTA7dz04NDthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/os/creatr-uploaded-images/2024-08/e387daa0-6b03-11ef-be6e-996ce352f415.cf.webp",
    title:
      language === "en"
        ? "Why gold still has more upside: Truist strategist"
        : "Prečo má zlato stále viac výhod: Hovorí stratég z Truist",
    description:
      language === "en"
        ? `Gold (GC=F) has reached new all-time highs in the past month, fueled by geopolitical uncertainty, central bank buying, and US dollar weakness. Truist Co-chief Investment Officer & Chief Market Strategist Keith Lerner joins Market Domination Overtime to give insight into gold and why investors may want to add it to their portfolios. "From a portfolio diversification standpoint... we added earlier this year a modest position. And there's a couple of things. One is, from a technical perspective, it just made an all-time high. The underlying technical trends are very positive. You have central bank buying around the globe, especially with China. You still have a decent amount of geopolitical uncertainty. And it's also a hedge against dollar weakness as well," says Lerner`
        : `Zlato (GC=F) dosiahlo za posledný mesiac nové historické maximá, poháňané geopolitickou neistotou, nákupom centrálnej banky a oslabením amerického dolára. Truist Co-chief Investment Officer a Chief Market Strategist Keith Lerner sa pripojil k Market Domination Overtime, aby poskytol prehľad o zlate a o tom, prečo ho investori môžu chcieť pridať do svojich portfólií. "Z hľadiska diverzifikácie portfólia... sme na začiatku tohto roka pridali skromnú pozíciu. A je tu niekoľko vecí. Jedna je, z technického hľadiska, zlato dosiahlo historické maximum. Základné technické trendy sú veľmi pozitívne." Na celom svete máte nákupy centrálnou bankou, najmä s Čínou, stále máte signifikantnú geopolitickú neistotu a je to tiež ochrana proti oslabeniu dolára,“ hovorí Lerner`,
    source:
      "https://finance.yahoo.com/video/why-gold-still-more-upside-113028365.html",
    author: "Nicholas Jacobino",
    date: 1725535800000,
  },
];
