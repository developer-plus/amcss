import { checkAnnotation, checkPure, transformer } from '../src/transformer'

describe('transformer', () => {
  it('transformer', () => {
    const c1 = 'hover:active:bg-red/1'
    const c2 = 'bg-red'
    const c3 = 'aaa:bg-red'

    expect(transformer(c1)).toMatchInlineSnapshot(`
      {
        "annotation": {
          "breakpoints": [],
          "dark": false,
          "pseudo": [
            "hover",
            "active",
          ],
        },
        "cssObject": {},
        "origin": "hover:active:bg-red/1",
        "pure": "bg-red/1",
      }
    `)
    expect(transformer(c2)).toMatchInlineSnapshot(`
      {
        "annotation": {
          "breakpoints": [],
          "dark": false,
          "pseudo": [],
        },
        "cssObject": {},
        "origin": "bg-red",
        "pure": "bg-red",
      }
    `)
    expect(transformer(c3)).toMatchInlineSnapshot('null')
  })

  it('checkAnnotation', () => {
    const p1 = 'hover:active:dark:xl:'
    const p2 = 'aaa:bbb:'
    const p3 = 'hover:aaa:'

    expect(checkAnnotation(p1)).toMatchInlineSnapshot(`
      {
        "annotation": {
          "breakpoints": [
            "xl",
          ],
          "dark": true,
          "pseudo": [
            "hover",
            "active",
          ],
        },
      }
    `)
    expect(checkAnnotation(p2)).toMatchInlineSnapshot('null')
    expect(checkAnnotation(p3)).toMatchInlineSnapshot('null')
  })

  it('checkPure', () => {
    const c1 = 'bg-red/1'
    const c2 = 'bg-red'

    expect(checkPure(c1)).toMatchInlineSnapshot(`
      {
        "cssObject": {},
        "pure": "bg-red/1",
      }
    `)
    expect(checkPure(c2)).toMatchInlineSnapshot(`
      {
        "cssObject": {},
        "pure": "bg-red",
      }
    `)
  })
})
