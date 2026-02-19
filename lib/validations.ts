import { z } from "zod"

const ConfirmationStepSchema = z.object({
  step: z.string().min(1, "El paso no puede estar vacío"),
  completed: z.boolean(),
  completedAt: z.string().optional(),
})

const TimelineItemSchema = z.object({
  milestone: z.string().min(1),
  date: z.string().min(1),
  description: z.string(),
})

const PriceItemSchema = z.object({
  description: z.string().min(1),
  quantity: z.coerce.number().positive(),
  unitPrice: z.coerce.number().positive(),
  total: z.coerce.number(),
})

const TeamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string(),
})

export const ProposalSchema = z.object({
  // Metadata
  clientName: z.string().min(1, "Nombre del cliente requerido"),
  proposalName: z.string().min(1, "Nombre de la propuesta requerido"),
  presentationDate: z.string().min(1, "Fecha requerida"),
  valueCLP: z.coerce.number().int().positive("El valor debe ser positivo"),
  validityDays: z.coerce.number().int().positive("La vigencia debe ser positiva"),
  details: z.string().optional().default(""),
  sentBy: z.string().min(1, "Enviado por requerido"),
  sentTo: z.string().min(1, "Enviado para requerido"),
  status: z.enum(["draft", "sent", "accepted", "rejected"]).default("draft"),
  confirmationSteps: z.array(ConfirmationStepSchema).default([]),
  // Content
  introduction: z.string().optional().default(""),
  context: z.string().optional().default(""),
  objective: z.string().optional().default(""),
  timeline: z.array(TimelineItemSchema).default([]),
  price: z.array(PriceItemSchema).default([]),
  team: z.array(TeamMemberSchema).default([]),
  whyTactech: z.string().optional().default(""),
})

export type ProposalFormValues = z.infer<typeof ProposalSchema>

export const LoginSchema = z.object({
  username: z.string().min(1, "Usuario requerido"),
  password: z.string().min(1, "Contraseña requerida"),
})
