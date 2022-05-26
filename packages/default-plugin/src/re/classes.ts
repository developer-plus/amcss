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
export const ClassNameReg = new RegExp(
  `((${PseudoClassesStr})\:)\?(\?\<\=(\?\<\=\\[|:|\\?|\\s|\\,|\{|\=)['"])\[\^,'"\[\{<>\]\+`,
  'img'
)
export const AtleastOneSpaceReg = /\s+/
export const END_OF_LINE = '\n'
export const SPACE_STRING = ' '
