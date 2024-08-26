export function isValidParam(value: string | null) {
  if(!value) return true
  return /^-?\d+$/.test(value);
}