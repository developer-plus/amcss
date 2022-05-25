import type { AmNode, Nullable } from '@amcss/types'
import {
  _breakpointsMatcher,
  _darkMatcher,
  _pseudoMatcher,
  _pureMatcher
} from './matcher'

export type TransFormerResult = Omit<AmNode, 'options' | 'pid' | 'extension'>

export type AnnotationResult = Pick<TransFormerResult, 'annotation'>

export type PureResult = Pick<TransFormerResult, 'pure' | 'cssObject'>

const annotationRE = new RegExp(
  `${_pseudoMatcher.re.source}|${_darkMatcher.re.source}|${_breakpointsMatcher.re.source}`,
  'g'
)

export const checkAnnotation = (
  annotation: string
): Nullable<AnnotationResult> => {
  const ret: AnnotationResult = {
    annotation: {
      pseudo: [],
      dark: false,
      breakpoints: []
    }
  }

  if (annotation === '')
    return ret

  const matchRet = annotation.match(annotationRE)

  if (matchRet === null)
    return null

  const arr = Array.from(matchRet)

  // validate match result
  if (annotation === `${arr.join(':')}:`) {
    for (let i = 0; i < arr.length; i++) {
      const r = arr[i]

      if (_pseudoMatcher.validate(r))
        ret.annotation.pseudo.push(r)
      else if (_darkMatcher.validate(r))
        ret.annotation.dark = true
      else if (_breakpointsMatcher.validate(r))
        ret.annotation.breakpoints.push(r)
      else return null
    }

    return ret
  }

  return null
}

export const checkPure = (pure: string): PureResult | null => {
  const matchRet = _pureMatcher.match(pure)

  if (matchRet) {
    const ret: PureResult = {
      pure,
      cssObject: {}
    }

    // todo validate and pure2CssObject
    return ret

    // validate error return null
  }

  return null
}

export const transformer = (origin: string): TransFormerResult | null => {
  let annotationStr = ''
  let pureStr = origin

  // todo correctly split classStr
  // split classStr
  if (origin.includes(':')) {
    const pIndex = origin.lastIndexOf(':')
    annotationStr = origin.substring(0, pIndex + 1)
    pureStr = origin.substring(pIndex + 1)
  }

  // pure
  const pureRet = checkPure(pureStr)

  if (pureRet === null)
    return null

  const annotationRet = checkAnnotation(annotationStr)

  if (annotationRet === null)
    return null

  return {
    origin,
    ...pureRet,
    ...annotationRet
  }
}
