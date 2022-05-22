import { checkCss, checkPseudo, transformer } from '../src/transformer'

describe('transformer', () => {
  it('transformer', () => {
    const c1 = 'hover:active:bg-red/1'
    const c2 = 'bg-red'
    const c3 = 'aaa:bg-red'

    expect(transformer(c1)).toMatchInlineSnapshot(`
      {
        "pseudo": [
          "hover",
          "active",
        ],
        "pure": "bg-red",
        "suffix": "1",
      }
    `)
    expect(transformer(c2)).toMatchInlineSnapshot(`
      {
        "pure": "bg-red",
      }
    `)
    expect(transformer(c3)).toMatchInlineSnapshot(`
      {
        "pure": "bg-red",
      }
    `)
  })

  it('checkPseudo', () => {
    const p1 = 'hover:active:'
    const p2 = 'aaa:bbb:'
    const p3 = 'hover:aaa:'

    expect(checkPseudo(p1)).toMatchInlineSnapshot(`
      {
        "pseudo": [
          "hover",
          "active",
        ],
      }
    `)
    expect(checkPseudo(p2)).toMatchInlineSnapshot('null')
    expect(checkPseudo(p3)).toMatchInlineSnapshot('null')
  })

  it('checkCss', () => {
    const c1 = 'bg-red/1'
    const c2 = 'bg-red'

    expect(checkCss(c1)).toMatchInlineSnapshot(`
      {
        "pure": "bg-red",
        "suffix": "1",
      }
    `)
    expect(checkCss(c2)).toMatchInlineSnapshot(`
      {
        "pure": "bg-red",
      }
    `)
  })
})
