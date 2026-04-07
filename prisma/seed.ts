import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  // ── Admin ──
  const email = "admin@peadpo.org"
  const password = "CHANGE_MOI"

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log("✅ Admin déjà existant :", email)
  } else {
    const hashedPassword = await bcrypt.hash(password, 12)
    await prisma.user.create({
      data: { email, name: "Administrateur PEADPO", password: hashedPassword },
    })
    console.log("✅ Admin créé :", email)
  }

  // ── Structures ──
  const structuresData = [
    {
      slug: "mheb", sigle: "MHEB",
      nom: "Mouvement des Hommes de l'Église des Assemblées de Dieu du Burkina Faso",
      logo: "/images/logo-mheb.png",
      description: "Le MHEB est le bras fraternel de l'église qui rassemble les hommes autour de la Parole de Dieu.",
      objectifs: ["Fortifier la foi et la vie spirituelle des hommes de l'église", "Encourager la responsabilité familiale et sociale", "Organiser des retraites, séminaires et actions de solidarité", "Promouvoir l'unité et la fraternité entre les hommes"],
      images: ["/images/img2.jpg"],
    },
    {
      slug: "asc", sigle: "ASC",
      nom: "Association de Servantes du Christ",
      logo: "/images/logo-asc.png",
      description: "L'ASC est le ministère des femmes de l'église, un espace de croissance spirituelle, de solidarité et de service.",
      objectifs: ["Accompagner les femmes dans leur croissance spirituelle", "Organiser des activités de solidarité et d'entraide", "Former des femmes leaders dans l'église et la société", "Soutenir les familles en difficulté"],
      images: ["/images/img2.jpg"],
    },
    {
      slug: "jad", sigle: "JAD",
      nom: "Jeunesse des Assemblées de Dieu",
      logo: "/images/jad-logo.png",
      description: "La JAD est le département jeunesse de l'église, un espace vibrant où les jeunes grandissent dans leur foi.",
      objectifs: ["Ancrer la jeunesse dans la foi et la Parole de Dieu", "Développer le leadership chrétien chez les jeunes", "Organiser des camps, retraites et activités d'évangélisation", "Créer un espace d'appartenance et de fraternité pour les jeunes"],
      images: ["/images/img2.jpg"],
    },
    {
      slug: "denad", sigle: "DENAD",
      nom: "Département Enfants des Assemblées de Dieu",
      logo: "/images/logo-denad.png",
      description: "Le DENAD prend en charge l'éveil spirituel et l'éducation chrétienne des enfants de l'église.",
      objectifs: ["Enseigner la Parole de Dieu aux enfants de façon adaptée", "Créer un environnement sûr et joyeux pour la croissance spirituelle", "Former des moniteurs compétents pour l'encadrement des enfants", "Organiser des activités créatives, camps et programmes spéciaux"],
      images: ["/images/img2.jpg"],
    },
    {
      slug: "asaph", sigle: "ASAPH",
      nom: "Appelé Sanctifié Pour Adorer Dieu avec Humilité",
      logo: "/images/jad-logo.png",
      description: "ASAPH est l'équipe musicale et de louange de la PEADPO.",
      objectifs: ["Conduire l'église dans la louange et l'adoration authentique", "Former et développer les talents musicaux au service de Dieu", "Composer et enregistrer des cantiques pour l'édification de l'église", "Maintenir un niveau d'excellence spirituelle et musicale"],
      images: ["/images/img2.jpg"],
    },
  ]

  for (const s of structuresData) {
    const { objectifs, images, ...rest } = s
    const existante = await prisma.structure.findUnique({ where: { slug: s.slug } })
    if (existante) {
      await prisma.structure.update({ where: { slug: s.slug }, data: rest })
    } else {
      await prisma.structure.create({
        data: {
          ...rest,
          objectifs: { create: objectifs.map((contenu, ordre) => ({ contenu, ordre })) },
          images: { create: images.map((url, ordre) => ({ url, ordre })) },
        },
      })
    }
    console.log("✅ Structure:", s.sigle)
  }

  // ── Slides Hero ──
  const slidesExistants = await prisma.slideHero.count()
  if (slidesExistants === 0) {
    await prisma.slideHero.createMany({
      data: [
        { image: "/images/img1.jpeg", label: null, texte: null, reference: null, ordre: 0 },
        { image: "/images/img2.jpg", label: "Thème de l'année", texte: "Recherchez la paix avec tous, et la sanctification, sans laquelle personne ne verra le Seigneur.", reference: "Hébreux 12:14", ordre: 1 },
        { image: "/images/img4.jpg", label: "Réflexion", texte: "La paix n'est pas l'absence de tempête, mais la présence de Dieu au milieu d'elle.", reference: null, ordre: 2 },
      ],
    })
    console.log("✅ Slides Hero créés")
  } else {
    console.log("✅ Slides Hero déjà existants")
  }

  // ── Programmes ──
  const programmesExistants = await prisma.programme.count()
  if (programmesExistants === 0) {
    await prisma.programme.createMany({
      data: [
        { jour: "Mardi", heure: "5h00", titre: "Prière Matinale", ordre: 0 },
        { jour: "Mercredi", heure: "18h30", titre: "Leçon Biblique", ordre: 1 },
        { jour: "Vendredi", heure: "19h00", titre: "PEMEC", ordre: 2 },
        { jour: "Dimanche", heure: "7h30", titre: "Culte", ordre: 3 },
      ],
    })
    console.log("✅ Programmes créés")
  } else {
    console.log("✅ Programmes déjà existants")
  }

  // ── À Propos ──
  const aProposExistant = await prisma.aPropos.count()
  if (aProposExistant === 0) {
    await prisma.aPropos.create({
      data: {
        vision: "Être une église de référence à Ouagadougou et au-delà, où chaque âme trouve la présence de Dieu, la chaleur d'une famille spirituelle et les outils pour vivre pleinement sa foi au quotidien.",
        mission: "Proclamer l'Évangile de Jésus-Christ avec puissance et amour, former des disciples matures dans la foi, et servir notre communauté locale avec compassion — en répondant aux besoins spirituels, sociaux et humains.",
        valeurs: "La Parole de Dieu est notre fondement absolu. Nous croyons en une communauté où chacun est accueilli, aimé et valorisé. Nous encourageons chaque membre à s'engager au service de l'église et de la société. Nous nous engageons à vivre avec honnêteté, transparence et droiture. Tout ce que nous faisons pour Dieu mérite le meilleur.",
      },
    })
    console.log("✅ À Propos créé")
  } else {
    console.log("✅ À Propos déjà existant")
  }

  // ── Jalons Histoire ──
  const jalonsExistants = await prisma.jalonHistoire.count()
  if (jalonsExistants === 0) {
    await prisma.jalonHistoire.createMany({
      data: [
        { annee: "1980", texte: "Fondation de l'église par un groupe de fidèles animés d'une vision commune : établir une communauté chrétienne vivante à la Patte d'Oie.", ordre: 0 },
        { annee: "1995", texte: "Construction du premier bâtiment permanent, témoin de la croissance et de l'engagement de la congrégation.", ordre: 1 },
        { annee: "2005", texte: "Lancement des ministères jeunesse et des cultes de louange, ouvrant l'église à une nouvelle génération.", ordre: 2 },
        { annee: "2015", texte: "Expansion de la vision avec le lancement de programmes sociaux et de formation biblique pour la communauté.", ordre: 3 },
        { annee: "Aujourd'hui", texte: "Une église en pleine croissance, comptant des centaines de membres fidèles, portant le message de l'Évangile avec passion.", ordre: 4 },
      ],
    })
    console.log("✅ Jalons Histoire créés")
  } else {
    console.log("✅ Jalons Histoire déjà existants")
  }

  // ── Cultes fictifs temporaires (à supprimer après) ──
  const cultesFactices = [
    { date: "2026-03-08", },
    { date: "2026-03-01", },
    { date: "2026-02-22", },
    { date: "2026-02-15", },
    { date: "2026-02-08", },
    { date: "2026-02-01", },
    { date: "2026-01-25", },
    { date: "2026-01-18", },
    { date: "2026-01-11", },
    { date: "2026-01-04", },
  ]

  for (const c of cultesFactices) {
    const slug = `culte-${c.date}`
    const existing = await prisma.culte.findUnique({ where: { slug } })
    if (!existing) {
      await prisma.culte.create({
        data: {
          slug,
          titre: `Culte du ${new Date(c.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`,
          date: new Date(c.date),
        },
      })
    }
  }
  console.log("✅ Cultes fictifs créés")
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => await prisma.$disconnect())