import fs from 'fs'

import htmlparser from '@/utils/htmlparser'

const HTML = fs
  .readFileSync(__filename.replace(/\.js$/, '.html'))
  .toString()
  .replace(/&amp;/gi, '&')

const SORT = [
  { Id: '2', Name: '動畫' },
  { Id: '31', Name: '季度全集' },
  { Id: '3', Name: '漫畫' },
  { Id: '4', Name: '音樂' },
  { Id: '6', Name: '日劇' },
  { Id: '7', Name: 'ＲＡＷ' },
  { Id: '12', Name: '特攝' },
  { Id: '1', Name: '其他' },
]
const TEAMS = [
  { Id: '0', Name: '全部_1' },
  { Id: '0', Name: '全部_2' },
  { Id: '117', Name: '動漫花園' },
  { Id: '604', Name: 'c.c动漫' },
  { Id: '37', Name: '雪飄工作室(FLsnow)' },
  { Id: '504', Name: 'LoveEcho!' },
  { Id: '288', Name: '诸神kamigami字幕组' },
  { Id: '581', Name: 'VCB-Studio' },
  { Id: '459', Name: '紫音動漫&發佈組' },
  { Id: '706', Name: 'K&W-RAWS' },
  { Id: '784', Name: 'Voice Memories' },
  { Id: '222', Name: 'A.I.R.nesSub' },
  { Id: '796', Name: '臭臭动漫整合' },
]
const last = TEAMS.length - 1

test('param "which" test', () => {
  let regex = /<option value="(\d+)">(.+?)<\/option>/gim

  expect(htmlparser(HTML, regex, ['Id', 'Name'])).toEqual(TEAMS[0])
  expect(htmlparser(HTML, regex, ['Id', 'Name'], 'last')).toEqual(TEAMS[last])
  const parsedTeam = htmlparser(HTML, regex, ['Id', 'Name'], 'all')
  expect(parsedTeam).toStrictEqual(TEAMS)

  regex = /<option value="(\d+)">(.+)<\/option>/gim // <== greedy

  expect(htmlparser(HTML, regex, ['Id', 'Name'])).not.toEqual(TEAMS[0])
  expect(htmlparser(HTML, regex, ['Id', 'Name'], 'last')).not.toEqual(TEAMS[last])
  expect(htmlparser(HTML, regex, ['Id', 'Name'], 'all')).toHaveLength((parsedTeam.length + 1) / 2)
})

test('match fails test', () => {
  const regex = /<foo bar="(\d+)">(.+?)<\/foo>/gim

  expect(htmlparser(HTML, regex, ['Id', 'Name'])).toBeNull()
  expect(htmlparser(HTML, regex, ['Id', 'Name'], 'last')).toBeNull()
  expect(htmlparser(HTML, regex, ['Id', 'Name'], 'all')).toBeNull()
  expect(htmlparser(HTML, regex, [])).toBeNull()
})

test('receivers test', () => {
  const regex = /<option value="(\d+)">(.+?)<\/option>/gim

  // too much receivers
  expect(htmlparser(HTML, regex, ['Id', 'Name', 'Foo'], 'last')).toEqual(TEAMS[last])
  expect(htmlparser(HTML, regex, ['Id', 'Name', 'Foo'], 'all')).toStrictEqual(TEAMS)

  // less receivers
  expect(htmlparser(HTML, regex, ['Name'], 'last')).toEqual({
    Name: TEAMS[last].Id,
  })
  expect(htmlparser(HTML, regex, ['Name'], 'all')).toStrictEqual(
    Array.from(TEAMS, team => {
      return { Name: team.Id }
    }),
  )

  // empty receiver
  expect(htmlparser(HTML, regex, [], 'last')).toBe(TEAMS[last].Id)
  expect(htmlparser(HTML, regex, [], 'all')).toStrictEqual(Array.from(TEAMS, team => team.Id))
})

test('RegExp.lastIndex test', () => {
  const regex = /<option value="(\d+)">(.+?)<\/option>/gim

  expect(regex.lastIndex).toBe(0)

  htmlparser(HTML, regex, ['Id', 'Name'])
  // regex.lastIndex was set to 0 in htmlparser()
  expect(regex.lastIndex).toBe(0)
  // expect(regex.lastIndex).toBe(130)

  htmlparser(HTML, regex, ['Id', 'Name'], 'all')
  expect(regex.lastIndex).toBe(0)
  // expect(regex.lastIndex).toBe(130)
})

test('Parsing sorts', () => {
  const regex = /<option value="(\d+)" style="color: \w+">(.+?)<\/option>/gim

  expect(htmlparser(HTML, regex, ['Id', 'Name'], 'all')).toStrictEqual(SORT)
})
