import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * The admin panel is rendered by the root page, not a real Next route, so
 * linking straight to `systemSettings.adminRoute` 404s. Route through the
 * `key` query param that the root page already checks.
 */
export function adminHref(adminRoute: string) {
  return `/?key=${encodeURIComponent(adminRoute || '/secure-control-panel')}`
}
