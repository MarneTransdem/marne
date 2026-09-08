export function getSectorLabel(sector: { name: string; type: string }): string {
  if (sector.type !== 'longue-distance') return sector.name;
  return sector.name ? sector.name.replace(/^Paris\s+/, 'Paris–') : 'longue distance depuis Paris';
}
