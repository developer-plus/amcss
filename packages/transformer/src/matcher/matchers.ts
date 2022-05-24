import {
  BreakpointsClassesRE,
  DarkClassesRE,
  PseudoClassesRE,
  PureClassesRE
} from '../re'
import { createMatcher } from './createMatcher'

export const _pseudoMatcher = createMatcher('pseudo', PseudoClassesRE, ret =>
  PseudoClassesRE.test(ret)
)

export const _darkMatcher = createMatcher('dark', DarkClassesRE, ret =>
  DarkClassesRE.test(ret)
)

export const _breakpointsMatcher = createMatcher(
  'breakpoints',
  BreakpointsClassesRE,
  ret => BreakpointsClassesRE.test(ret)
)

export const _pureMatcher = createMatcher('pure', PureClassesRE)
