import * as path from 'path'
import { SwaggerParser } from './swagger-parser'
import { TypeGenerator } from './type-generator'
import { ApiGenerator } from './api-generator'

/**
 * 读取配置
 */
interface Config {
  swaggerUrl?: string
  swaggerFile?: string
  outputDir: string
  typeOutputDir: string
  apiOutputDir: string
  generateTypes: boolean
  generateApi: boolean
  excludeTags: string[]
  includeTags: string[]
}

/**
 * 生成 API
 */
async function generateApi() {
  console.log('🚀 开始生成 API...\n')

  try {
    // 读取配置
    const configPath = path.resolve(process.cwd(), 'swagger.config.json')
    const config: Config = require(configPath)

    // 解析 Swagger 文档
    const parser = new SwaggerParser()

    console.log('📖 正在加载 Swagger 文档...')
    if (config.swaggerUrl) {
      await parser.loadFromUrl(config.swaggerUrl)
      console.log(`✅ 已从 URL 加载: ${config.swaggerUrl}\n`)
    }
    else if (config.swaggerFile) {
      parser.loadFromFile(path.resolve(process.cwd(), config.swaggerFile))
      console.log(`✅ 已从文件加载: ${config.swaggerFile}\n`)
    }
    else {
      throw new Error('请在配置文件中指定 swaggerUrl 或 swaggerFile')
    }

    // 生成类型
    if (config.generateTypes) {
      console.log('📝 正在生成 TypeScript 类型...')
      const definitions = parser.getDefinitions()
      const typeGenerator = new TypeGenerator(definitions)
      const typeOutputPath = path.resolve(process.cwd(), config.typeOutputDir, 'index.ts')
      typeGenerator.saveToFile(typeOutputPath)
      console.log('')
    }

    // 生成 API
    if (config.generateApi) {
      console.log('🔧 正在生成 API 函数...')
      let pathsByTag = parser.getPathsByTag()

      // 过滤标签
      if (config.includeTags.length > 0) {
        pathsByTag = Object.fromEntries(
          Object.entries(pathsByTag).filter(([tag]) => config.includeTags.includes(tag)),
        )
      }

      if (config.excludeTags.length > 0) {
        pathsByTag = Object.fromEntries(
          Object.entries(pathsByTag).filter(([tag]) => !config.excludeTags.includes(tag)),
        )
      }

      const apiGenerator = new ApiGenerator(pathsByTag)
      const apiOutputPath = path.resolve(process.cwd(), config.apiOutputDir)
      apiGenerator.generateAllModules(apiOutputPath)
      console.log('')
    }

    console.log('✨ API 生成完成！')
  }
  catch (error) {
    console.error('❌ 生成失败:', error)
    process.exit(1)
  }
}

// 执行生成
generateApi()
