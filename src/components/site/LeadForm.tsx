import { useState, type FormEvent } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { z } from "zod";
import { whatsappLink } from "@/config/site";

export const LEVELS = [
  "Iniciante (Zero)",
  "Básico (A1–A2)",
  "Intermediário (B1–B2)",
  "Avançado (C1–C2)",
  "Não sei meu nível",
];

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "select" | "textarea";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  full?: boolean;
};

export const trialSchema = z.object({
  full_name: z.string().trim().min(2, "Informe seu nome completo."),
  age: z.coerce
    .number({ invalid_type_error: "Informe uma idade válida." })
    .int("Informe um número inteiro.")
    .min(4, "Idade mínima: 4 anos.")
    .max(110, "Informe uma idade válida."),
  whatsapp: z.string().trim().min(8, "Informe um WhatsApp válido."),
  email: z.string().trim().email("Informe um e-mail válido."),
  level: z.string().min(1, "Selecione seu nível atual."),
  goal: z.string().trim().min(2, "Conte brevemente seu objetivo."),
  preferred_day: z.string().min(1, "Selecione o melhor dia."),
  preferred_time: z.string().min(1, "Selecione o melhor horário."),
  notes: z.string().optional().default(""),
});

export const preEnrollmentSchema = z.object({
  full_name: z.string().trim().min(2, "Informe seu nome completo."),
  age: z.coerce
    .number({ invalid_type_error: "Informe uma idade válida." })
    .int("Informe um número inteiro.")
    .min(4, "Idade mínima: 4 anos.")
    .max(110, "Informe uma idade válida."),
  email: z.string().trim().email("Informe um e-mail válido."),
  whatsapp: z.string().trim().min(8, "Informe um WhatsApp válido."),
  guardian_name: z.string().optional().default(""),
  level: z.string().min(1, "Selecione seu nível de inglês."),
  modality: z.string().min(1, "Selecione a modalidade."),
  goal: z.string().trim().min(2, "Conte seu principal objetivo."),
  availability: z.string().trim().min(2, "Informe sua disponibilidade."),
  notes: z.string().optional().default(""),
});

type LeadFormProps = {
  table: string;
  fields: Field[];
  schema: z.ZodTypeAny;
  submitLabel: string;
  successTitle: string;
  successText: string;
  whatsappMsg: string;
};

export function LeadForm({
  table,
  fields,
  schema,
  submitLabel,
  successTitle,
  successText,
  whatsappMsg,
}: LeadFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState("");

  function updateField(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
      setErrors(nextErrors);
      return;
    }

    const lines = fields
      .map((field) => {
        const val = (values[field.name] ?? "").trim();
        return val ? `*${field.label}:* ${val}` : null;
      })
      .filter(Boolean);

    const fullMessage = `${whatsappMsg}\n\n${lines.join("\n")}`;
    const generatedUrl = whatsappLink(fullMessage);

    setWaUrl(generatedUrl);
    setSubmitted(true);
    window.open(generatedUrl, "_blank", "noopener,noreferrer");
  }

  function resetForm() {
    setValues({});
    setErrors({});
    setSubmitted(false);
    setWaUrl("");
  }

  if (submitted) {
    return (
      <div
        data-form={table}
        className="rounded-[2rem] border bg-card p-8 text-center shadow-soft sm:p-10"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp/15 text-whatsapp">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="mt-5 text-3xl font-semibold">{successTitle}</h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">{successText}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={waUrl || whatsappLink(whatsappMsg)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-semibold text-whatsapp-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <MessageCircle className="h-5 w-5" />
            Confirmar pelo WhatsApp
          </a>
          <button
            type="button"
            onClick={resetForm}
            className="rounded-full border px-6 py-3.5 font-semibold transition hover:bg-muted"
          >
            Enviar outra resposta
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      data-form={table}
      className="rounded-[2rem] border bg-card p-6 shadow-soft sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const id = `${table}-${field.name}`;
          const value = values[field.name] ?? "";
          const error = errors[field.name];
          const isFull = field.full || field.type === "textarea";
          const baseClass =
            "mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-navy focus:ring-2 focus:ring-ring/20";

          return (
            <div key={field.name} className={isFull ? "sm:col-span-2" : ""}>
              <label htmlFor={id} className="block text-sm font-semibold text-foreground">
                {field.label}
                {field.required && <span className="ml-1 text-ring">*</span>}
              </label>

              {field.type === "select" ? (
                <select
                  id={id}
                  name={field.name}
                  value={value}
                  onChange={(e) => updateField(field.name, e.target.value)}
                  className={baseClass}
                >
                  <option value="">Selecione...</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  id={id}
                  name={field.name}
                  rows={3}
                  value={value}
                  placeholder={field.placeholder ?? "Alguma dúvida ou informação adicional?"}
                  onChange={(e) => updateField(field.name, e.target.value)}
                  className={baseClass}
                />
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.type ?? "text"}
                  value={value}
                  placeholder={field.placeholder}
                  onChange={(e) => updateField(field.name, e.target.value)}
                  className={baseClass}
                />
              )}

              {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-7 py-4 font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
      >
        <Send className="h-4 w-4" />
        {submitLabel}
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Ao enviar, seus dados serão formatados para confirmação rápida via WhatsApp.
      </p>
    </form>
  );
}
