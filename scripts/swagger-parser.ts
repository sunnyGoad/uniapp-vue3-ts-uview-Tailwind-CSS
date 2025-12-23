import * as fs from 'fs'
import * as path from 'path'

/**
 * Swagger 解析器
 */
export class SwaggerParser {
  private swaggerData: any

  /**
   * 从 URL 加载 Swagger 文档
   */
  async loadFromUrl(url: string): Promise<void> {
    const https = await import('https')
    const http = await import('http')

    return new Promise((resolve, reject) => {
      const client = url.startsWith('https') ? https : http
      client.get(url, (res) => {
        let data = ''
        res.on('data', chunk => data += chunk)
        res.on('end', () => {
          try {
            this.swaggerData = JSON.parse(data)
            resolve()
          }
          catch (error) {
            reject(error)
          }
        })
      }).on('error', reject)
    })
  }

  /**
   * 从文件加载 Swagger 文档
   */
  loadFromFile(filePath: string): void {
    const content = fs.readFileSync(filePath, 'utf-8')
    this.swaggerData = JSON.parse(content)
  }

  /**
   * 获取所有路径
   */
  getPaths(): Record<string, any> {
    return this.swaggerData?.paths || {}
  }

  /**
   * 获取所有定义
   */
  getDefinitions(): Record<string, any> {
    // Swagger 2.0
    if (this.swaggerData?.definitions) {
      return this.swaggerData.definitions
    }
    // OpenAPI 3.0
    if (this.swaggerData?.components?.schemas) {
      return this.swaggerData.components.schemas
    }
    return {}
  }

  /**
   * 获取所有标签
   */
  getTags(): string[] {
    const tags = new Set<string>()
    const paths = this.getPaths()

    for (const path in paths) {
      const methods = paths[path]
      for (const method in methods) {
        if (methods[method].tags) {
          methods[method].tags.forEach((tag: string) => tags.add(tag))
        }
      }
    }

    return Array.from(tags)
  }

  /**
   * 按标签分组路径
   */
  getPathsByTag(): Record<string, any[]> {
    const result: Record<string, any[]> = {}
    const paths = this.getPaths()

    for (const path in paths) {
      const methods = paths[path]
      for (const method in methods) {
        const operation = methods[method]
        const tags = operation.tags || ['default']

        tags.forEach((tag: string) => {
          if (!result[tag]) {
            result[tag] = []
          }
          result[tag].push({
            path,
            method: method.toUpperCase(),
            operation,
          })
        })
      }
    }

    return result
  }

  /**
   * 获取 Swagger 数据
   */
  getData(): any {
    return this.swaggerData
  }
}
