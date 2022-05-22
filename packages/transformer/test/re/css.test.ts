import { CssRE } from '../../src/re'

describe('css', () => {
  it('cssRE', () => {
    const c1 = 'bg-red/1'
    const c2 = 'bg-red'

    expect(c1.match(CssRE)).toMatchInlineSnapshot(`
      [
        "bg-red/1",
        "bg-red",
        "/1",
      ]
    `)
    expect(c2.match(CssRE)).toMatchInlineSnapshot(`
      [
        "bg-red",
        "bg-red",
        undefined,
      ]
    `)
  })
})
