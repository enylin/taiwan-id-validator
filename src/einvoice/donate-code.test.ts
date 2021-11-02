import { isEInvoiceDonateCodeValid, isDonateCode } from './donate-code'

const customOrganizationList = [
  {
    id: '1',
    name: '財團法人中華民國兒童癌症基金會',
    donateCode: '88888',
    abbr: '兒癌基金會',
    guiNumber: '04140854',
    city: '臺北市'
  },
  {
    id: '2',
    name: '財團法人至善社會福利基金會',
    donateCode: '4399',
    abbr: '',
    guiNumber: '48930399',
    city: '臺北市'
  },
  {
    id: '3',
    name: '社團法人中華光鹽愛盲協會',
    donateCode: '818',
    abbr: '',
    guiNumber: '10312805',
    city: '臺北市'
  },
  {
    id: '4',
    name: '財團法人台南市私立吾愛吾家養護中心',
    donateCode: '520999',
    abbr: '',
    guiNumber: '17033201',
    city: '臺南市'
  },
  {
    id: '5',
    name: '財團法人天主教會嘉義教區附設嘉義縣私立安仁家園',
    donateCode: '025520',
    abbr: '安仁家園',
    guiNumber: '36725844',
    city: '嘉義縣'
  },
  {
    id: '6',
    name: '財團法人台灣省天主教會新竹教區',
    donateCode: '528',
    abbr: '新竹教區',
    guiNumber: '02859871',
    city: '新竹市'
  },
  {
    id: '7',
    name: '財團法人桃園市真善美社會福利基金會',
    donateCode: '268',
    abbr: '真善美',
    guiNumber: '30366265',
    city: '桃園市'
  },
  {
    id: '8',
    name: '財團法人聖島社會福利慈善基金會',
    donateCode: '123999',
    abbr: '聖島',
    guiNumber: '26334592',
    city: '臺北市'
  },
  {
    id: '9',
    name: '財團法人基督教臺北市私立伯大尼兒少家園',
    donateCode: '5200',
    abbr: '伯大尼',
    guiNumber: '05200479',
    city: '臺北市'
  },
  {
    id: '10',
    name: '社團法人台灣新住民家庭成長協會',
    donateCode: '168',
    abbr: '新住民協會',
    guiNumber: '26316757',
    city: '新北市'
  }
]

describe('isEInvoiceDonateCodeValid', () => {
  it('should only accept strings with length 3-7', () => {
    expect(isEInvoiceDonateCodeValid({} as string)).toBe(false)
    expect(isEInvoiceDonateCodeValid(undefined as unknown as string)).toBe(
      false
    )
    expect(isEInvoiceDonateCodeValid('00')).toBe(false)
    expect(isEInvoiceDonateCodeValid('12345678')).toBe(false)
    expect(isEInvoiceDonateCodeValid(12345678)).toBe(false)
    expect(isEInvoiceDonateCodeValid('ab3456')).toBe(false)
    expect(isEInvoiceDonateCodeValid(1)).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isEInvoiceDonateCodeValid('001')).toBe(true) // 財團法人基督教芥菜種會
    expect(isEInvoiceDonateCodeValid('0001')).toBe(true) // 社團法人中華民國遺產暨保險金捐贈慈善會
    expect(isEInvoiceDonateCodeValid('8880064')).toBe(true) // 恆基醫療財團法人恆春基督教醫院
    expect(isEInvoiceDonateCodeValid(123)).toBe(true) // 社團法人世界和平婦女會台灣總會
    expect(isEInvoiceDonateCodeValid(5281)).toBe(true) // 臺北醫學大學
    expect(isEInvoiceDonateCodeValid(2291292)).toBe(true) // 社團法人嘉義市盲人福利協進會
  })

  it('should return false if the input is incorrect', () => {
    expect(isEInvoiceDonateCodeValid('0002')).toBe(false)
    expect(isEInvoiceDonateCodeValid('10001')).toBe(false)
    expect(isEInvoiceDonateCodeValid('2134567')).toBe(false)
    expect(isEInvoiceDonateCodeValid(223)).toBe(false)
    expect(isEInvoiceDonateCodeValid(10001)).toBe(false)
    expect(isEInvoiceDonateCodeValid(2134567)).toBe(false)
  })

  it('should not check official organization list if null is set', () => {
    expect(isEInvoiceDonateCodeValid('0002', null)).toBe(true)
    expect(isEInvoiceDonateCodeValid('10001', null)).toBe(true)
    expect(isEInvoiceDonateCodeValid('2134567', null)).toBe(true)
    expect(isEInvoiceDonateCodeValid(223, null)).toBe(true)
    expect(isEInvoiceDonateCodeValid(10001, null)).toBe(true)
    expect(isEInvoiceDonateCodeValid(2134567, null)).toBe(true)
  })

  it('should check custom organization list only if provided', () => {
    expect(isEInvoiceDonateCodeValid('001', customOrganizationList)).toBe(false) // 財團法人基督教芥菜種會
    expect(isEInvoiceDonateCodeValid('123', customOrganizationList)).toBe(false) // 社團法人中華民國遺產暨保險金捐贈慈善會
    expect(isEInvoiceDonateCodeValid('5200', customOrganizationList)).toBe(true) // 財團法人基督教臺北市私立伯大尼兒少家園
    expect(isEInvoiceDonateCodeValid(123, customOrganizationList)).toBe(false) // 社團法人世界和平婦女會台灣總會
    expect(isEInvoiceDonateCodeValid(5281, customOrganizationList)).toBe(false) // 臺北醫學大學
    expect(isEInvoiceDonateCodeValid(88888, customOrganizationList)).toBe(true) // 財團法人中華民國兒童癌症基金會
  })
})

describe('function alias', () => {
  it('should be identical to the original function', () => {
    expect(isDonateCode).toBe(isEInvoiceDonateCodeValid)
  })
})
