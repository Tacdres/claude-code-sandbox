import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCLP(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}

export function formatDateInput(date: Date | string): string {
  return new Date(date).toISOString().split("T")[0]
}
