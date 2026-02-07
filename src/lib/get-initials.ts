/**
 * Get initials from name
 * @param name Full name
 * @returns Initials
 */
export function getInitials(name?: string) {
  if (!name) return 'NA';

  const parts = name.trim().split(' ').filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[1][0]).toUpperCase();
}
