export type ProposalStatus = "draft" | "sent" | "accepted" | "rejected"

export interface ConfirmationStep {
  step: string
  completed: boolean
  completedAt?: string
}

export interface TimelineItem {
  milestone: string
  date: string
  description: string
}

export interface PriceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface TeamMember {
  name: string
  role: string
  bio: string
}

export interface Proposal {
  id: string
  createdAt: Date
  updatedAt: Date
  clientName: string
  proposalName: string
  presentationDate: Date
  valueCLP: number
  validityDays: number
  details: string
  sentBy: string
  sentTo: string
  status: ProposalStatus
  confirmationSteps: ConfirmationStep[]
  timeline: TimelineItem[]
  price: PriceItem[]
  team: TeamMember[]
  introduction: string
  context: string
  objective: string
  whyTactech: string
}

export interface ProposalRaw {
  id: string
  createdAt: Date
  updatedAt: Date
  clientName: string
  proposalName: string
  presentationDate: Date
  valueCLP: number
  validityDays: number
  details: string
  sentBy: string
  sentTo: string
  status: string
  confirmationSteps: string
  timeline: string
  price: string
  team: string
  introduction: string
  context: string
  objective: string
  whyTactech: string
}
