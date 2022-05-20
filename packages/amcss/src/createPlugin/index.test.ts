import { createPlugin } from '.'

describe('createPlugin', () => {
  test('can return the same options', () => {
    const plugin = createPlugin({
      name: 'test',
      scanner: () => {
        return {
          className: 'test',
          pureName: 'test',
          pid: 'test'
        }
      },
      compiler: () => {
        return {
          className: 'test',
          pureName: 'test',
          pid: 'test',
          attrs: {
            width: '100px'
          }
        }
      },
      generator: () => {
        return 'test'
      }
    })
    expect(plugin).toMatchInlineSnapshot(`
          {
            "compiler": [Function],
            "generator": [Function],
            "name": "test",
            "scanner": [Function],
          }
        `)
  })
})
