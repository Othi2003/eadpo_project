export const NAV_LINKS = [
  { key: 'home', label: 'Accueil', href: '/' },
  { key: 'about', label: 'A propos', href: '/about' },
  { key: 'structures', label: 'Structures', href: '/structures' },
  { key: 'groupes', label: 'Groupes', href: '/groupes' },
  { key: 'cultes', label: 'Cultes', href: '/cultes' },
  { key: 'medias', label: 'Médias', href: '/medias' },
  { key: 'contact', label: 'Contact', href: '/contact' }
];


export const STRUCTURES = [
  {
    slug: "mheb",
    sigle: "MHEB",
    nom: "Mouvement des Hommes de l'Église des Assemblées de Dieu du Burkina Faso",
    couleur: "#1565C0",
    logo: "/images/logo-mheb.png",
    images: ["/images/img2.jpg", "/images/structures/mheb2.jpg", "/images/structures/mheb3.jpg"],
    description:
      "Le MHEB est le bras fraternel de l'église qui rassemble les hommes autour de la Parole de Dieu. Il vise à former des hommes responsables, engagés dans leur foi, leur famille et leur communauté. À travers des rencontres régulières, des retraites spirituelles et des actions sociales, le MHEB œuvre pour l'édification des hommes de l'église.",
    objectifs: [
      "Fortifier la foi et la vie spirituelle des hommes de l'église",
      "Encourager la responsabilité familiale et sociale",
      "Organiser des retraites, séminaires et actions de solidarité",
      "Promouvoir l'unité et la fraternité entre les hommes",
    ],
    coordination: [
      { nom: "Frère Exemple NOM", role: "Président", photo: "/images/structures/mheb-pres.jpg" },
      { nom: "Frère Exemple NOM", role: "Vice-Président", photo: "/images/structures/mheb-vp.jpg" },
      { nom: "Frère Exemple NOM", role: "Secrétaire Général", photo: "/images/structures/mheb-sg.jpg" },
    ],
  },
  {
    slug: "asc",
    sigle: "ASC",
    nom: "Association de Servantes du Christ",
    couleur: "#1565C0",
    logo: "/images/logo-asc.png",
    images: ["/images/img2.jpg", "/images/structures/asc2.jpg", "/images/structures/asc3.jpg"],
    description:
      "L'ASC est le ministère des femmes de l'église, un espace de croissance spirituelle, de solidarité et de service. Les Servantes du Christ s'engagent à vivre leur foi avec authenticité, à soutenir les familles et à rayonner l'amour de Dieu dans la communauté. Elles organisent des activités d'entraide, de formation biblique et d'évangélisation.",
    objectifs: [
      "Accompagner les femmes dans leur croissance spirituelle",
      "Organiser des activités de solidarité et d'entraide",
      "Former des femmes leaders dans l'église et la société",
      "Soutenir les familles en difficulté",
    ],
    coordination: [
      { nom: "Sœur Exemple NOM", role: "Présidente", photo: "/images/structures/asc-pres.jpg" },
      { nom: "Sœur Exemple NOM", role: "Vice-Présidente", photo: "/images/structures/asc-vp.jpg" },
      { nom: "Sœur Exemple NOM", role: "Secrétaire Générale", photo: "/images/structures/asc-sg.jpg" },
    ],
  },
  {
    slug: "jad",
    sigle: "JAD",
    nom: "Jeunesse des Assemblées de Dieu",
    couleur: "#1565C0",
    logo: "/images/jad-logo.png",
    images: ["/images/img2.jpg", "/images/structures/jad2.jpg", "/images/structures/jad3.jpg"],
    description:
      "La JAD est le département jeunesse de l'église, un espace vibrant où les jeunes grandissent dans leur foi et développent leurs talents au service de Dieu. À travers des activités variées — cultes jeunesse, camps, projets communautaires, évangélisation — la JAD forme la prochaine génération de leaders chrétiens.",
    objectifs: [
      "Ancrer la jeunesse dans la foi et la Parole de Dieu",
      "Développer le leadership chrétien chez les jeunes",
      "Organiser des camps, retraites et activités d'évangélisation",
      "Créer un espace d'appartenance et de fraternité pour les jeunes",
    ],
    coordination: [
      { nom: "Frère Exemple NOM", role: "Président", photo: "/images/structures/jad-pres.jpg" },
      { nom: "Sœur Exemple NOM", role: "Vice-Présidente", photo: "/images/structures/jad-vp.jpg" },
      { nom: "Frère Exemple NOM", role: "Secrétaire Général", photo: "/images/structures/jad-sg.jpg" },
    ],
  },
  {
    slug: "denad",
    sigle: "DENAD",
    nom: "Département Enfants des Assemblées de Dieu",
    couleur: "#1565C0",
    logo: "/images/logo-denad.png",
    images: ["/images/img2.jpg", "/images/structures/denad2.jpg", "/images/structures/denad3.jpg"],
    description:
      "Le DENAD prend en charge l'éveil spirituel et l'éducation chrétienne des enfants de l'église. À travers des enseignements adaptés, des activités ludiques et des programmes créatifs, le DENAD plante les graines de la foi dans le cœur des plus jeunes, les accompagnant dans leur découverte de Dieu.",
    objectifs: [
      "Enseigner la Parole de Dieu aux enfants de façon adaptée",
      "Créer un environnement sûr et joyeux pour la croissance spirituelle",
      "Former des moniteurs compétents pour l'encadrement des enfants",
      "Organiser des activités créatives, camps et programmes spéciaux",
    ],
    coordination: [
      { nom: "Sœur Exemple NOM", role: "Responsable", photo: "/images/structures/denad-resp.jpg" },
      { nom: "Frère Exemple NOM", role: "Adjoint", photo: "/images/structures/denad-adj.jpg" },
      { nom: "Sœur Exemple NOM", role: "Secrétaire", photo: "/images/structures/denad-sec.jpg" },
    ],
  },
  {
    slug: "asaph",
    sigle: "ASAPH",
    nom: "Appelé Sanctifié Pour Adorer Dieu avec Humilité",
    couleur: "#1565C0",
    logo: "/images/jad-logo.png",
    images: ["/images/structures/asaph1.jpg", "/images/structures/asaph2.jpg", "/images/structures/asaph3.jpg"],
    description:
      "ASAPH est l'équipe musicale et de louange de la PEADPO. Composée de musiciens, chanteurs et techniciens passionnés, ASAPH conduit la congrégation dans la présence de Dieu à travers la musique et le chant. Inspirée du psalmiste Asaph de la Bible, l'équipe se consacre à l'excellence dans la louange et l'adoration.",
    objectifs: [
      "Conduire l'église dans la louange et l'adoration authentique",
      "Former et développer les talents musicaux au service de Dieu",
      "Composer et enregistrer des cantiques pour l'édification de l'église",
      "Maintenir un niveau d'excellence spirituelle et musicale",
    ],
    coordination: [
      { nom: "Frère Exemple NOM", role: "Directeur Musical", photo: "/images/structures/asaph-dir.jpg" },
      { nom: "Sœur Exemple NOM", role: "Cheffe de Chœur", photo: "/images/structures/asaph-chef.jpg" },
      { nom: "Frère Exemple NOM", role: "Coordinateur Technique", photo: "/images/structures/asaph-tech.jpg" },
    ],
  },
]

export type Structure = typeof STRUCTURES[0]

// lib/cultes.ts

export interface Prestation {
  type: string       // "Chorale", "Solo", "Duo", etc.
  titre: string
  interprete: string
}

export interface Culte {
  slug: string
  titre: string
  date: string       // ex: "2025-01-05"
  verset: string
  versetRef: string
  chantre: string
  prestations: Prestation[]
  predicateur: string
  interprete: string | null
  resume: string
  images: string[]
}

// lib/cultes.ts

export interface Prestation {
  type: string       // "Chorale", "Solo", "Duo", etc.
  titre: string
  interprete: string
}

export interface Culte {
  slug: string
  titre: string
  date: string
  verset: string
  versetRef: string
  chantre: string
  chantre_photo: string
  prestations: Prestation[]
  predicateur: string
  predicateur_photo: string
  interprete: string | null
  interprete_photo?: string
  resume: string
  images: string[]
}

export const CULTES: Culte[] = [
  {
    slug: "culte-2025-01-05",
    titre: "Marcher dans la Paix de Dieu",
    date: "2025-01-05",
    verset: "Ne vous inquiétez de rien, mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.",
    versetRef: "Philippiens 4:6",
    chantre: "Frère Abdoul OUÉDRAOGO",
    chantre_photo: "/images/personnes/abdoul.jpg",
    prestations: [
      { type: "Chorale", titre: "Que ta volonté soit faite", interprete: "Chorale ASAPH" },
      { type: "Solo", titre: "Seigneur tu es là", interprete: "Sœur Marie KABORÉ" },
      { type: "Duo", titre: "Plus près de toi", interprete: "Frères COMPAORÉ & TRAORÉ" },
    ],
    predicateur: "Rév. Dr. Jacques Délwendé COMPAORÉ",
    predicateur_photo: "/images/past1.jpg",
    interprete: "Frère Samuel OUÉDRAOGO",
    interprete_photo: "/images/personnes/samuel.jpg",
    resume: `Le message de ce culte inaugural de l'année 2025 nous a invités à ancrer notre foi dans la paix que Dieu seul peut donner. Le prédicateur a ouvert son message sur le constat que l'inquiétude est une réalité universelle, mais que l'Évangile offre une alternative radicale : la prière avec actions de grâces.\n\nIl a développé trois axes majeurs : premièrement, reconnaître nos inquiétudes sans les nier ; deuxièmement, les déposer entre les mains de Dieu dans la prière ; troisièmement, cultiver une posture de reconnaissance qui transforme notre regard sur les épreuves.\n\nLe message s'est conclu par un appel à faire confiance à la souveraineté divine, rappelant que la paix de Dieu "surpasse toute intelligence" et garde nos cœurs et nos esprits en Jésus-Christ.`,
    images: [
      "/images/img1.jpg",
      "/images/img1.jpg",
      "/images/img1.jpg",
    ],
  },
  {
    slug: "culte-2025-01-12",
    titre: "La Foi qui déplace les montagnes",
    date: "2025-01-12",
    verset: "Si vous avez de la foi comme un grain de sénevé, vous direz à cette montagne : Transporte-toi d'ici là, et elle se transportera.",
    versetRef: "Matthieu 17:20",
    chantre: "Sœur Esther SAWADOGO",
    chantre_photo: "/images/personnes/esther.jpg",
    prestations: [
      { type: "Chorale", titre: "Notre Dieu règne", interprete: "Chorale MHEB" },
      { type: "Solo", titre: "Je crois", interprete: "Frère David YAMEOGO" },
    ],
    predicateur: "Pasteur Théophile COMPAORÉ",
    predicateur_photo: "/images/past2.png",
    interprete: null,
    resume: `Ce dimanche, le Pasteur Théophile COMPAORÉ nous a conduits au cœur de ce que signifie avoir une foi agissante. S'appuyant sur l'épisode des disciples incapables de guérir l'enfant épileptique, il a mis en lumière la différence entre une foi déclarative et une foi transformatrice.\n\nLe prédicateur a souligné que la grandeur de la foi ne réside pas dans sa quantité mais dans sa qualité — une foi même infime, authentiquement placée en Dieu, peut accomplir l'impossible. Il a illustré ce principe par des témoignages contemporains et des récits bibliques.\n\nL'exhortation finale invitait chaque fidèle à identifier la "montagne" dans sa vie et à l'affronter non avec ses propres forces, mais avec la certitude que Dieu est plus grand que tout obstacle.`,
    images: [
      "/images/img1.jpg",
      "/images/img1.jpg",
    ],
  },
  {
    slug: "culte-2025-01-19",
    titre: "Sanctification et Excellence",
    date: "2025-01-19",
    verset: "Recherchez la paix avec tous, et la sanctification sans laquelle personne ne verra le Seigneur.",
    versetRef: "Hébreux 12:14",
    chantre: "Frère Bertrand ZONGO",
    chantre_photo: "/images/personnes/bertrand.jpg",
    prestations: [
      { type: "Chorale", titre: "Saint, Saint, Saint", interprete: "Chorale DENAD" },
      { type: "Solo", titre: "Purifie mon cœur", interprete: "Sœur Pascaline TOGO" },
      { type: "Chorale", titre: "Thème de l'année", interprete: "Chorale ASAPH" },
    ],
    predicateur: "Pasteur Joël KIEMDE",
    predicateur_photo: "/images/past3.png",
    interprete: "Sœur Aïcha OUÉDRAOGO",
    interprete_photo: "/images/personnes/aicha.jpg",
    resume: `Le Pasteur Joël KIEMDE a prêché sur le thème annuel de l'église, tiré d'Hébreux 12:14. Son message a exploré les deux piliers indissociables que sont la paix et la sanctification, présentés non comme des idéaux lointains mais comme un appel quotidien du chrétien.\n\nIl a démontré que la sanctification n'est pas un état statique mais un processus dynamique de transformation intérieure, rendu possible par la grâce de l'Esprit-Saint. La paix, quant à elle, n'est pas l'absence de conflit mais la capacité à traverser les épreuves avec sérénité divine.\n\nL'assemblée a été fortement édifiée par ce message qui ancrait le thème de l'année dans le quotidien des croyants, avec des applications pratiques sur la vie familiale, professionnelle et ecclésiale.`,
    images: [
      "/images/img1.jpg",
      "/images/img1.jpg",
      "/images/img1.jpg",
    ],
  },
]