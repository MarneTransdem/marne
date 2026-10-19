// A format check only: it cannot confirm whether a number is assigned or reachable.
export function isPlausiblePhone(value: string): boolean {
  const phone = value.trim();
  if (phone.length > 25 || !/^\+?[\d\s().-]+$/.test(phone)) return false;
  return phone.replace(/\D/g, '').length >= 8;
}
