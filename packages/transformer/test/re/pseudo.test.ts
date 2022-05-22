import { PseudoClassesRE } from '../../src/re'

describe('pseudo', () => {
  it('PseudoClassesRE matched', () => {
    // matched
    const c1 = 'hover:bg-red/1'
    const c2 = 'bg-red/1'
    const c3 = 'active:bg-red'

    expect(c1.match(PseudoClassesRE)).toMatchInlineSnapshot(`
      [
        "hover:",
      ]
    `)
    expect(c2.match(PseudoClassesRE)).toMatchInlineSnapshot('null')
    expect(c3.match(PseudoClassesRE)).toMatchInlineSnapshot(`
      [
        "active:",
      ]
    `)

    // mismatched
    const c4 = 'aaa:bg-red'
    expect(c4.match(PseudoClassesRE)).toMatchInlineSnapshot('null')
  })
})
