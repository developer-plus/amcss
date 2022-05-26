import * as transformer from '@amcss/transformer'
import { createDefaultPlugin } from '../src/DefaultPlugin'
// TODO: remove spyon when transfromer is right
const rawTransformer = transformer.transformer
const transformSpy = vi
  .spyOn(transformer, 'transformer')
  .mockImplementation((origin: string) => {
    if (origin === 'tick-heart' || origin === 'hbs' || origin === 'zx')
      return null
    return rawTransformer(origin)
  })
describe('default-scanner', () => {
  it('should create AmClass from common class', () => {
    const code = '<div class="w-100">'
    const defaultPlugin = createDefaultPlugin()
    const { unResolvedClassNames, amClasses } = defaultPlugin.scanner(code)
    expect(unResolvedClassNames).toMatchInlineSnapshot('Set {}')
    expect(amClasses).toMatchInlineSnapshot(`
      [
        {
          "annotation": {
            "breakpoints": [],
            "dark": false,
            "pseudo": [],
          },
          "cssObject": {},
          "origin": "w-100",
          "pid": "Default",
          "pure": "w-100",
        },
      ]
    `)
  })

  it('should create AmClass from array class', () => {
    const code = 'div :class="[\'foo\', \'bar\'"></div>'
    const defaultPlugin = createDefaultPlugin()
    const { unResolvedClassNames, amClasses } = defaultPlugin.scanner(code)
    expect(unResolvedClassNames).toMatchInlineSnapshot('Set {}')
    expect(amClasses).toMatchInlineSnapshot(`
      [
        {
          "annotation": {
            "breakpoints": [],
            "dark": false,
            "pseudo": [],
          },
          "cssObject": {},
          "origin": "foo",
          "pid": "Default",
          "pure": "foo",
        },
        {
          "annotation": {
            "breakpoints": [],
            "dark": false,
            "pseudo": [],
          },
          "cssObject": {},
          "origin": "bar",
          "pid": "Default",
          "pure": "bar",
        },
      ]
    `)
  })

  it('should create AmClass from object class', () => {
    const code = '<div :class="{\'foo\': bar}"></div>'
    const defaultPlugin = createDefaultPlugin()
    const { unResolvedClassNames, amClasses } = defaultPlugin.scanner(code)
    expect(unResolvedClassNames).toMatchInlineSnapshot('Set {}')
    expect(amClasses).toMatchInlineSnapshot(`
      [
        {
          "annotation": {
            "breakpoints": [],
            "dark": false,
            "pseudo": [],
          },
          "cssObject": {},
          "origin": "foo",
          "pid": "Default",
          "pure": "foo",
        },
      ]
    `)
  })

  it('should handle shortcuts', () => {
    expect(transformSpy.getMockName()).toEqual('transformer')
    const code = '<div class="tick-heart"></div>'
    const shortcuts: Record<string, string> = {
      'tick-heart': 'w-100 hbs',
      'zx': 'h-100',
      'hbs': 'bg-black'
    }
    const defaultPlugin = createDefaultPlugin([], shortcuts)
    const { unResolvedClassNames, amClasses } = defaultPlugin.scanner(code)
    expect(unResolvedClassNames).toMatchInlineSnapshot('Set {}')
    expect(amClasses).toMatchInlineSnapshot(`
      [
        {
          "annotation": {
            "breakpoints": [],
            "dark": false,
            "pseudo": [],
          },
          "cssObject": {},
          "origin": "w-100",
          "pid": "Default",
          "pure": "w-100",
        },
        {
          "annotation": {
            "breakpoints": [],
            "dark": false,
            "pseudo": [],
          },
          "cssObject": {},
          "origin": "bg-black",
          "pid": "Default",
          "pure": "bg-black",
        },
      ]
    `)
  })

  it('should move to unResolvedClassNames', () => {
    expect(transformSpy.getMockName()).toEqual('transformer')
    const code = '<div class="foo:w-10 tick-heart"></div>'
    const shortcuts: Record<string, string> = {
      'tick-heart': 'bar:h-50'
    }
    const defaultPlugin = createDefaultPlugin([], shortcuts)
    const { unResolvedClassNames, amClasses } = defaultPlugin.scanner(code)
    expect(unResolvedClassNames).toMatchInlineSnapshot(`
      Set {
        "foo:w-10",
        "bar:h-50",
      }
    `)
    expect(amClasses).toMatchInlineSnapshot('[]')
  })

  it('nested element with common | array | object class', () => {
    const code = `<div class="hover:w-1/4
    hover:active:bg-black/1 abc:w-10 w-100">
      <div :class="['foo', { 'foo1': active }, isVisited ? 'visited' : 'inVisite']"></div>
        <div :class="{'foo': foo}"></div>
        <div class="tick-heart"></div>
        <div class="zx">hbs</div>
      </div>`
    // shortcuts finally should like this:
    // .tick-heart {
    //   width: 10px
    // }
    const shortcuts: Record<string, string> = {
      'tick-heart': 'w-100 tick-basic hover:tick',
      'zx': 'h-50 def:h-10'
    }
    const defaultPlugin = createDefaultPlugin([], shortcuts)
    const { unResolvedClassNames, amClasses } = defaultPlugin.scanner(code)
    expect(unResolvedClassNames).toMatchInlineSnapshot(`
      Set {
        "abc:w-10",
        "def:h-10",
      }
    `)
    expect(amClasses).toMatchInlineSnapshot(`
      [
        {
          "annotation": {
            "breakpoints": [],
            "dark": false,
            "pseudo": [
              "hover",
            ],
          },
          "cssObject": {},
          "origin": "hover:w-1/4",
          "pid": "Default",
          "pure": "w-1/4",
        },
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
          "origin": "hover:active:bg-black/1",
          "pid": "Default",
          "pure": "bg-black/1",
        },
        {
          "annotation": {
            "breakpoints": [],
            "dark": false,
            "pseudo": [],
          },
          "cssObject": {},
          "origin": "w-100",
          "pid": "Default",
          "pure": "w-100",
        },
        {
          "annotation": {
            "breakpoints": [],
            "dark": false,
            "pseudo": [],
          },
          "cssObject": {},
          "origin": "foo",
          "pid": "Default",
          "pure": "foo",
        },
        {
          "annotation": {
            "breakpoints": [],
            "dark": false,
            "pseudo": [],
          },
          "cssObject": {},
          "origin": "foo1",
          "pid": "Default",
          "pure": "foo1",
        },
        {
          "annotation": {
            "breakpoints": [],
            "dark": false,
            "pseudo": [],
          },
          "cssObject": {},
          "origin": "visited",
          "pid": "Default",
          "pure": "visited",
        },
        {
          "annotation": {
            "breakpoints": [],
            "dark": false,
            "pseudo": [],
          },
          "cssObject": {},
          "origin": "inVisite",
          "pid": "Default",
          "pure": "inVisite",
        },
        {
          "annotation": {
            "breakpoints": [],
            "dark": false,
            "pseudo": [],
          },
          "cssObject": {},
          "origin": "tick-basic",
          "pid": "Default",
          "pure": "tick-basic",
        },
        {
          "annotation": {
            "breakpoints": [],
            "dark": false,
            "pseudo": [
              "hover",
            ],
          },
          "cssObject": {},
          "origin": "hover:tick",
          "pid": "Default",
          "pure": "tick",
        },
        {
          "annotation": {
            "breakpoints": [],
            "dark": false,
            "pseudo": [],
          },
          "cssObject": {},
          "origin": "h-50",
          "pid": "Default",
          "pure": "h-50",
        },
      ]
    `)
  })
})
