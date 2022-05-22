import { createMatcher } from './matcher'
import { CssRE, PseudoClassesRE } from './re'
import { isFullyMatched } from './utils'

export interface PseudoResult {
  pseudo?: string[]
}

export interface CssResult {
  pure: string
  suffix?: string
}

export interface TransFormerResult extends PseudoResult, CssResult {}

export const pseudoMatcher = createMatcher('pseudo', PseudoClassesRE)

export const checkPseudo = (pseudoStr: string) => {
  const ret = pseudoMatcher.match(pseudoStr)

  if (ret) {
    const arr = Array.from(ret)

    if (isFullyMatched(pseudoStr, ...arr)) {
      return {
        pseudo: arr.map(i => i.substring(0, i.length - 1))
      }
    }
  }

  return null
}

// todo correctly match css
export const cssMatcher = createMatcher('css', CssRE)

export const checkCss = (cssStr: string) => {
  const ret = cssMatcher.match(cssStr)

  if (ret) {
    const result: CssResult = {
      pure: ret[1],
      suffix: ret[2]
    }

    if (isFullyMatched(cssStr, result.pure, result.suffix)) {
      if (!result.suffix)
        delete result.suffix
      else result.suffix = result.suffix.substring(1)

      return result
    }
  }

  return null
}

export const transformer = (classStr: string): TransFormerResult | null => {
  let pseudoStr = ''
  let cssStr = classStr

  // todo correctly split classStr
  // split classStr
  if (classStr.includes(':')) {
    const pIndex = classStr.lastIndexOf(':')
    pseudoStr = classStr.substring(0, pIndex + 1)
    cssStr = classStr.substring(pIndex + 1)
  }

  // pure and suffix
  const cssRet = checkCss(cssStr)

  if (cssRet === null)
    return null

  const ret: TransFormerResult | null = cssRet

  // pseudo
  const pseudoRet = checkPseudo(pseudoStr)

  if (pseudoRet)
    ret.pseudo = pseudoRet.pseudo

  return ret
}
