import { BreakpointsClassesRE, PseudoClassesRE } from '../../src/re'

describe('pseudo', () => {
  it('PseudoClassesRE', () => {
    const c1 = 'hover:bg-red/1'
    const c2 = 'bg-red/1'
    const c3 = 'active:bg-red'

    expect(c1.match(PseudoClassesRE)).toMatchInlineSnapshot(`
      [
        "hover",
        "hover",
      ]
    `)
    expect(c2.match(PseudoClassesRE)).toMatchInlineSnapshot('null')
    expect(c3.match(PseudoClassesRE)).toMatchInlineSnapshot(`
      [
        "active",
        "active",
      ]
    `)

    // mismatched
    const c4 = 'aaa:bg-red'
    expect(c4.match(PseudoClassesRE)).toMatchInlineSnapshot('null')
  })

  it('BreakPointsRE', () => {
    const b1 = 'xl:lg:bg-red'
    const b2 = 'hover:xl:bg-red'
    const b3 = 'hoverbg-red'

    expect(b1.match(BreakpointsClassesRE)).toMatchInlineSnapshot(`
      [
        "xl",
        "xl",
      ]
    `)
    expect(b2.match(BreakpointsClassesRE)).toMatchInlineSnapshot(`
      [
        "xl",
        "xl",
      ]
    `)
    expect(b3.match(BreakpointsClassesRE)).toMatchInlineSnapshot('null')
  })
})
