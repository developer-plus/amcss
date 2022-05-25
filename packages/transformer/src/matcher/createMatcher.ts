export interface Matcher {
  /**
   * matcher name
   */
  name: string
  /**
   * matcher regexp
   */
  re: RegExp
  /**
   * match method with the provided re
   */
  match(input: string): RegExpMatchArray | null
  /**
   * validator of the match method results
   */
  validate(ret: string): boolean
}

export const createMatcher = (
  name: string,
  regexp: RegExp | (() => RegExp),
  validator: (ret: string) => boolean = () => true
): Matcher => {
  const re = typeof regexp === 'function' ? regexp() : regexp

  return {
    name,
    re,
    match(input: string) {
      return input.match(re)
    },
    validate: validator
  }
}
