export const site = {
  teacherName: "Adeline Rocha Dornelles",
  // Para trocar sua foto, substitua o arquivo em public/foto-professora.jpg
  photoUrl: "/foto-professora.jpg",
  whatsappNumber: "5555999859312",
  instagramHandle: "@teacher.adeline",
  instagram: "https://www.instagram.com/teacher.adeline/",
  email: "adelinerrocha@gmail.com",
  about: {
    story:
      "Acredito que aprender inglês vai muito além de decorar regras gramaticais — é ganhar confiança para se comunicar no mundo real, no seu próprio ritmo e com assuntos que fazem sentido para a sua rotina.",
    education: "Formação na área de ensino de Língua Inglesa (edite aqui sua graduação)",
    experience: "Experiência com aulas particulares personalizadas para diferentes perfis e objetivos",
    certifications: "Especialização e prática contínua em metodologias comunicativas",
    methodology:
      "Aulas leves, práticas e focadas em conversação desde o início, combinando vocabulário útil, escuta ativa, leitura e gramática aplicada ao que você realmente precisa.",
  },
  classes: {
    modality: "100% online ao vivo (ou presencial, conforme disponibilidade)",
    ageRange: "Crianças, adolescentes e adultos",
    levels: "Do básico (iniciante zero) ao avançado",
    format: "Aulas individuais ou em duplas/pequenos grupos",
    methodology: "Abordagem comunicativa, personalizada para os seus interesses",
    duration: "Encontros de 50 a 60 minutos, com frequência flexível",
  },
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
