import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Camera,
  Clock,
  GraduationCap,
  Heart,
  Instagram,
  Lightbulb,
  Mail,
  Menu,
  MessageCircle,
  Monitor,
  Sparkles,
  Star,
  Target,
  Users,
  X,
} from "lucide-react";
import { site, whatsappLink } from "@/config/site";
import { Reveal, staggerChild, staggerParent } from "@/components/site/motion";
import { LeadForm, LEVELS, preEnrollmentSchema, trialSchema, type Field } from "@/components/site/LeadForm";

const NAV = [
  { id: "sobre", label: "Sobre mim" },
  { id: "aulas", label: "As aulas" },
  { id: "experimental", label: "Aula experimental" },
  { id: "pre-matricula", label: "Pré-matrícula" },
  { id: "contato", label: "Contato" },
];

export function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Classes />
        <Trial />
        <PreEnrollment />
        <Contact />
      </main>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {site.teacherName} · English Lessons
      </footer>
      <WhatsAppFloat />
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-sun" />;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b bg-background/75 py-3 backdrop-blur-xl" : "py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#inicio" className="flex items-center gap-2 font-display text-xl font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm text-primary-foreground">
            En
          </span>
          <span className="hidden sm:inline">English Lessons</span>
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className="group relative text-sm font-medium text-foreground/80 transition hover:text-foreground"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-sun transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href="#experimental"
            className="hidden rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lift sm:inline-flex"
          >
            Aula experimental
          </a>
          <button onClick={() => setOpen(!open)} className="rounded-full p-2 lg:hidden" aria-label="Abrir menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-5 mt-3 flex flex-col gap-1 rounded-2xl border bg-card p-3 shadow-soft lg:hidden"
        >
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                onClick={() => setOpen(false)}
                href={`#${n.id}`}
                className="block rounded-xl px-4 py-3 font-medium hover:bg-muted"
              >
                {n.label}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </header>
  );
}

function PhotoSlot({ className = "" }: { className?: string }) {
  return site.photoUrl ? (
    <img src={site.photoUrl} alt={`Foto de ${site.teacherName}`} className={`h-full w-full object-cover ${className}`} />
  ) : (
    <div
      className={`placeholder-slot flex h-full w-full flex-col items-center justify-center gap-3 text-muted-foreground ${className}`}
    >
      <Camera className="h-10 w-10" />
      <span className="text-sm font-semibold">[FOTO DA PROFESSORA]</span>
    </div>
  );
}

function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const yDeco = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -160]);
  return (
    <section id="inicio" ref={ref} className="bg-hero relative min-h-screen pb-20 pt-32 sm:pt-40">
      <motion.div
        style={{ y: yDeco }}
        className="pointer-events-none absolute right-[8%] top-28 hidden font-display text-[9rem] italic leading-none text-sky/40 lg:block"
      >
        Aa
      </motion.div>
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <Sparkles className="h-4 w-4 text-sun" /> Aulas particulares de inglês
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              Your English <em className="font-normal text-ring">journey</em> starts here!
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
              Aprenda inglês de forma leve, personalizada e no seu ritmo — com aulas pensadas para os seus objetivos.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#experimental"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-4 font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
              >
                Agende sua aula experimental{" "}
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </a>
              <a
                href="#pre-matricula"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary px-7 py-4 font-semibold transition hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground"
              >
                Quero fazer minha pré-matrícula
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal dir="right" delay={0.2} className="relative mx-auto w-full max-w-md">
          <motion.div style={{ y }} className="relative">
            <div className="absolute -inset-4 -z-10 rotate-3 rounded-[2.5rem] bg-accent" />
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
              <PhotoSlot />
            </div>
            <motion.div
              animate={reduce ? {} : { y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute -bottom-6 -left-6 rounded-2xl border bg-card px-5 py-4 shadow-soft"
            >
              <p className="font-display text-lg italic">"Let's talk!"</p>
              <p className="text-xs text-muted-foreground">{site.teacherName}</p>
            </motion.div>
            <motion.div
              animate={reduce ? {} : { y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="absolute -right-4 top-8 flex h-14 w-14 items-center justify-center rounded-full bg-sun shadow-soft"
            >
              <BookOpen className="h-6 w-6 text-foreground" />
            </motion.div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionHead({
  kicker,
  title,
  text,
  light,
}: {
  kicker: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <span className={`text-sm font-bold uppercase tracking-[0.2em] ${light ? "text-sun" : "text-ring"}`}>
        {kicker}
      </span>
      <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">{title}</h2>
      {text && (
        <p className={`mt-4 text-lg ${light ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{text}</p>
      )}
    </Reveal>
  );
}

function About() {
  const items = [
    { icon: GraduationCap, label: "Formação acadêmica", value: site.about.education },
    { icon: Briefcase, label: "Experiência profissional", value: site.about.experience },
    { icon: Award, label: "Certificações", value: site.about.certifications },
  ];
  return (
    <section id="sobre" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal dir="left" className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft lg:max-w-lg">
            <PhotoSlot />
          </div>
          <div className="absolute -right-2 bottom-10 hidden rounded-2xl bg-navy p-6 text-primary-foreground shadow-lift sm:block">
            <Heart className="mb-2 h-6 w-6 text-sun" />
            <p className="font-display text-lg italic">Paixão por ensinar</p>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-ring">Sobre mim</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Hi, I'm {site.teacherName}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground">{site.about.story}</p>
          </Reveal>
          <motion.ul
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 grid gap-4"
          >
            {items.map((i) => (
              <motion.li
                key={i.label}
                variants={staggerChild}
                className="flex gap-4 rounded-2xl border bg-card p-5 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <i.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">{i.label}</p>
                  <p className="text-sm text-muted-foreground">{i.value}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
          <Reveal delay={0.2} className="mt-6 rounded-2xl bg-cream p-6">
            <p className="flex items-center gap-2 font-semibold">
              <Lightbulb className="h-5 w-5 text-ring" /> Minha metodologia
            </p>
            <p className="mt-2 text-muted-foreground">{site.about.methodology}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Classes() {
  const cards = [
    { icon: Monitor, title: "Modalidade", value: site.classes.modality },
    { icon: Users, title: "Faixa etária", value: site.classes.ageRange },
    { icon: Star, title: "Níveis atendidos", value: site.classes.levels },
    { icon: Target, title: "Formato", value: site.classes.format },
    { icon: Sparkles, title: "Metodologia", value: site.classes.methodology },
    { icon: Clock, title: "Duração", value: site.classes.duration },
  ];
  return (
    <section id="aulas" className="relative bg-navy py-24 text-primary-foreground sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          light
          kicker="Como funcionam"
          title="Aulas feitas para você"
          text="Cada detalhe pensado para que seu aprendizado seja leve, consistente e prazeroso."
        />
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((c) => (
            <motion.div
              key={c.title}
              variants={staggerChild}
              className="group rounded-3xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 backdrop-blur transition duration-500 hover:-translate-y-2 hover:bg-primary-foreground/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sun text-foreground transition duration-500 group-hover:rotate-6 group-hover:scale-110">
                <c.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-primary-foreground/70">{c.value}</p>
            </motion.div>
          ))}
        </motion.div>
        <Reveal delay={0.2} className="mt-14 text-center">
          <a
            href="#experimental"
            className="group inline-flex items-center gap-2 rounded-full bg-sun px-7 py-4 font-semibold text-foreground transition hover:-translate-y-1 hover:shadow-lift"
          >
            Quero experimentar uma aula <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

const DAYS = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const TIMES = ["Manhã (8h–12h)", "Tarde (12h–18h)", "Noite (18h–21h)"];

const trialFields: Field[] = [
  { name: "full_name", label: "Nome completo", required: true, full: true },
  { name: "age", label: "Idade", type: "number", required: true },
  { name: "whatsapp", label: "WhatsApp", type: "tel", required: true, placeholder: "(00) 00000-0000" },
  { name: "email", label: "E-mail", type: "email", required: true, full: true },
  { name: "level", label: "Nível atual de inglês", type: "select", options: LEVELS, required: true },
  { name: "goal", label: "Objetivo com o idioma", required: true, placeholder: "Viagem, trabalho, provas…" },
  { name: "preferred_day", label: "Melhor dia", type: "select", options: DAYS, required: true },
  { name: "preferred_time", label: "Melhor horário", type: "select", options: TIMES, required: true },
  { name: "notes", label: "Observações", type: "textarea" },
];

const preFields: Field[] = [
  { name: "full_name", label: "Nome completo", required: true },
  { name: "age", label: "Idade", type: "number", required: true },
  { name: "email", label: "E-mail", type: "email", required: true },
  { name: "whatsapp", label: "WhatsApp", type: "tel", required: true, placeholder: "(00) 00000-0000" },
  { name: "guardian_name", label: "Nome do responsável (se menor de idade)", full: true },
  { name: "level", label: "Qual é seu nível de inglês?", type: "select", options: LEVELS, required: true },
  {
    name: "modality",
    label: "Formato preferido (aulas 100% online)",
    type: "select",
    options: ["Online — Individual", "Online — Em dupla / pequeno grupo"],
    required: true,
  },
  { name: "goal", label: "Qual é seu principal objetivo ao aprender inglês?", required: true, full: true },
  {
    name: "availability",
    label: "Qual horário tem disponibilidade?",
    required: true,
    full: true,
    placeholder: "Ex.: terças e quintas à noite",
  },
  { name: "notes", label: "Observações", type: "textarea" },
];

function Trial() {
  return (
    <section id="experimental" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal dir="left">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-ring">Aula experimental</span>
          </Reveal>
          <Reveal dir="left" delay={0.1}>
            <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Que tal experimentar uma aula?</h2>
          </Reveal>
          <Reveal dir="left" delay={0.2}>
            <p className="mt-5 text-lg text-muted-foreground">
              Conheça minha metodologia, descubra como funcionam as aulas e dê o primeiro passo na sua jornada com o
              inglês.
            </p>
          </Reveal>
          <Reveal dir="left" delay={0.3}>
            <ul className="mt-8 space-y-3">
              {["Conversa sobre seus objetivos", "Experiência real da metodologia", "Sem compromisso"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-ring" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal dir="right">
          <LeadForm
            table="trial_lessons"
            fields={trialFields}
            schema={trialSchema}
            submitLabel="Quero agendar minha aula experimental!"
            successTitle="Solicitação recebida!"
            successText="Em breve entrarei em contato para confirmar o dia e horário da sua aula experimental."
            whatsappMsg="Olá! Acabei de solicitar uma aula experimental pelo site."
          />
        </Reveal>
      </div>
    </section>
  );
}

function PreEnrollment() {
  return (
    <section id="pre-matricula" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHead
          kicker="Pré-matrícula"
          title="Comece sua jornada no inglês!"
          text="Preencha seus dados e entraremos em contato para conversar sobre as melhores opções de aulas para você."
        />
        <Reveal>
          <LeadForm
            table="pre_enrollments"
            fields={preFields}
            schema={preEnrollmentSchema}
            submitLabel="Enviar pré-matrícula"
            successTitle="Pré-matrícula enviada!"
            successText="Obrigada pelo interesse! Vou analisar suas informações e entrar em contato em breve."
            whatsappMsg="Olá! Acabei de enviar minha pré-matrícula pelo site."
          />
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    { icon: MessageCircle, label: "WhatsApp", value: "Enviar mensagem", href: whatsappLink() },
    { icon: Instagram, label: "Instagram", value: site.instagramHandle, href: site.instagram },
    { icon: Mail, label: "E-mail", value: site.email, href: `mailto:${site.email}` },
  ];
  return (
    <section id="contato" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="overflow-hidden rounded-[2.5rem] bg-navy px-6 py-16 text-center text-primary-foreground shadow-lift sm:px-16">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-sun">Contato</span>
          <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-semibold sm:text-5xl">
            Ready to start? Vamos conversar!
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/75">
            Tire suas dúvidas, conte seus objetivos e descubra o plano ideal para você. Será um prazer te ajudar.
          </p>
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 grid gap-4 sm:grid-cols-3"
          >
            {links.map((l) => (
              <motion.a
                key={l.label}
                variants={staggerChild}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 transition hover:-translate-y-1 hover:bg-primary-foreground/10"
              >
                <l.icon className="mx-auto h-7 w-7 text-sun transition group-hover:scale-110" />
                <p className="mt-3 font-semibold">{l.label}</p>
                <p className="truncate text-sm text-primary-foreground/70">{l.value}</p>
              </motion.a>
            ))}
          </motion.div>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-sun px-8 py-4 font-semibold text-foreground transition hover:-translate-y-1 hover:shadow-lift"
          >
            <MessageCircle className="h-5 w-5" /> Falar comigo agora
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function WhatsAppFloat() {
  return (
    <motion.a
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp opacity-30 motion-reduce:hidden" />
    </motion.a>
  );
}
