import { PureClassesRE } from '../../src/re'

describe('pure', () => {
  it('PureClassesRE', () => {
    const c1 = 'bg-red/1'
    const c2 = 'bg-red'

    expect(c1.match(PureClassesRE)).toMatchInlineSnapshot(`
      [
        "bg-red/1",
        "bg-red",
        "/1",
      ]
    `)
    expect(c2.match(PureClassesRE)).toMatchInlineSnapshot(`
      [
        "bg-red",
        "bg-red",
        undefined,
      ]
    `)
  })
})
