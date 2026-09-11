import { readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const declarationRoot = resolve(import.meta.dirname, '..', 'dist', 'cjs')

async function prepareDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true })

  await Promise.all(
    entries.map(async entry => {
      const inputPath = join(directory, entry.name)

      if (entry.isDirectory()) {
        await prepareDirectory(inputPath)
        return
      }

      if (!entry.name.endsWith('.d.ts')) return

      const outputPath = `${inputPath.slice(0, -5)}.d.cts`
      const content = await readFile(inputPath, 'utf8')
      const cjsContent = content.replace(
        /(['"])(\.\.?\/[^'"]+)\.js\1/g,
        '$1$2.cjs$1'
      )

      await writeFile(outputPath, cjsContent)
      await rm(inputPath)
    })
  )
}

await prepareDirectory(declarationRoot)
