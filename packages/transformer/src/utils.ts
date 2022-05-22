export const isFullyMatched = (
  origin: string,
  ...args: (string | null | undefined)[]
) => {
  let ret = ''
  for (const arg of args) ret += arg || ''
  return origin === ret
}
