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
      "Sou formada em Letras – Inglês pela UFSM e apaixonada por ensinar de forma acolhedora e prática. Minha vivência no ensino bilíngue com crianças, jovens e adultos me permite adaptar cada aula ao ritmo, à idade e aos objetivos reais de cada aluno.",
    education:
      "Graduada em Letras – Inglês e Literaturas Inglesas pela Universidade Federal de Santa Maria (UFSM, 2021–2024).",
    experience:
      "Instrutora na Wizard, monitora do Projeto Línguas no Campus (LabLeR/UFSM) e Projeto LIKids, professora bilíngue (método Montessoriano) na Escola Eu Adoto Montessori, professora bilíngue no Colégio Santanna.",
    certifications:
      "Formação em Ensino Bilíngue e Multilíngue pela UFSM e pela Universidade Estadual de Londrina (UEL), além de formação completa em Língua Inglesa pela Flash English.",
    methodology:
      "Aulas dinâmicas, leves e focadas em comunicação real, vocabulário do dia a dia e atividades personalizadas para o seu objetivo.",
  },
  classes: {
    modality: "Exclusivamente online, com aulas ao vivo de onde você estiver",
    ageRange: "Crianças, adolescentes e adultos",
    levels: "Do básico (iniciante zero) ao avançado",
    format: "Aulas individuais ou em duplas/pequenos grupos",
    methodology: "Abordagem comunicativa e bilíngue (CLIL), adaptada ao seu ritmo",
    duration: "Encontros de 50 a 60 minutos, com frequência flexível",
  },
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
