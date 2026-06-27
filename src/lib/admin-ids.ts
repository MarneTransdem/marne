const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function getNextSequencedId(prefix: string, existingIds: Array<string | undefined>, width = 3): string {
  const pattern = new RegExp(`^${escapeRegExp(prefix)}-(\\d+)$`);
  const maxSequence = existingIds.reduce((max, id) => {
    if (!id) return max;
    const match = id.match(pattern);
    if (!match) return max;
    const sequence = Number(match[1]);
    return Number.isFinite(sequence) ? Math.max(max, sequence) : max;
  }, 0);

  return `${prefix}-${String(maxSequence + 1).padStart(width, '0')}`;
}

export function getNextYearlyId(prefix: string, existingIds: Array<string | undefined>, width = 3, date = new Date()): string {
  return getNextSequencedId(`${prefix}-${date.getFullYear()}`, existingIds, width);
}
