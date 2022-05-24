const breakpointClasses = ['sm', 'md', 'lg', 'xl', '2xl']

const darkClasses = ['dark']

const pseudoClasses = [
  'active',
  'hover',
  'focus',
  'visited',
  'focus-within',
  'focus-visible',
  'target'
]

export const createRE = (options: string[]) => new RegExp(`(${options.join('|')})`)

const BreakpointsClassesRE = createRE(breakpointClasses)
const DarkClassesRE = createRE(darkClasses)
const PseudoClassesRE = createRE(pseudoClasses)

export {
  BreakpointsClassesRE,
  DarkClassesRE,
  PseudoClassesRE
}
