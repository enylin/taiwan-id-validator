import fs from 'fs'
import iconv from 'iconv-lite'
import parse from 'csv-parse/lib/sync'
import { Organization } from '../src/einvoice/type'

const file = fs.readFileSync('./data/organization-donate-code.csv')

const csvStr = iconv.decode(Buffer.from(file), 'big5')

const fields: Record<string, keyof Organization> = {
  序號: 'id',
  受捐贈機關或團體名稱: 'name',
  捐贈碼: 'donateCode',
  受捐贈機關或團體簡稱: 'abbr',
  受捐贈機關或團體統編: 'guiNumber',
  縣市: 'city'
}

const records = parse(csvStr.replace(/="(.*?)"/g, '$1'), {
  columns: header => header.map(column => fields[column])
})

fs.writeFileSync('src/einvoice/organization.json', JSON.stringify(records))
