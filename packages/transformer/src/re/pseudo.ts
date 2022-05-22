const pseudoClasses = [
  'active',
  'hover',
  'focus',
  'visited',
  'focus-within',
  'focus-visible',
  'target'
]

const PseudoClassesStr = pseudoClasses.join('|')

export const PseudoClassesRE = new RegExp(`(${PseudoClassesStr}):`, 'g')
