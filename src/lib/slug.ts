/**
 * Converts a string title into a URL-safe lowercase slug.
 * Example: "Pan-African AI Governance: Building Ethical Frameworks!"
 * -> "pan-african-ai-governance-building-ethical-frameworks"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accent marks
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/-+/g, '-'); // replace multiple - with single -
}
