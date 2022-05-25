import { AtleastOneSpaceReg, ClassNameReg, END_OF_LINE } from '../../src/re'

describe('class', () => {
  it('should', () => {
    const code = `<div class="hover:foo/100
    hover:bg/3">
      <div :class="['foo', { 'foo1': active }, isVisited ? 'visited' : 'inVisite']"></div>
        <div :class="{'foo': foo}"></div>
      </div>`
    const classSet: Set<string> = new Set<string>()
    const matches = [...code.matchAll(ClassNameReg)]
    const contents = matches.flatMap(match => match[0].replace(END_OF_LINE, ' ').split(AtleastOneSpaceReg))
    contents.forEach(content => classSet.add(content))

    expect(classSet).toMatchInlineSnapshot(`
      Set {
        "hover:foo/100",
        "hover:bg/3",
        "foo",
        "foo1",
        "visited",
        "inVisite",
      }
    `)
  })
})
