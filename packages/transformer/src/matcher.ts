export interface Matcher {
  /**
   * matcher name
   */
  name: string
  /**
   * regexp
   */
  re: RegExp
  /**
   * match method
   */
  match(input: string): RegExpMatchArray | null
}

export const createMatcher = (name: string, re: RegExp): Matcher => ({
  name,
  re,
  match(input: string) {
    return input.match(re)
  }
})
