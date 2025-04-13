import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv'

dotenv.config()
const server = async () => {
  try {
    const PORT = process.env.PORT || 8090
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('TuneVault API')
      .setDescription('TuneVault — музыкальная платформа для поиска, хранения и управления треками.')
      .setVersion('1.0')
      .build()

    app.enableCors()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    const staticPath = path.resolve(__dirname, 'static')
    const indexPath = path.resolve(staticPath, 'index.html')

    if (!fs.existsSync(staticPath)) {
      fs.mkdirSync(staticPath, { recursive: true })
    }

    if (!fs.existsSync(indexPath)) {
      const htmlContent = `
        <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
            </head>
            <body>
              <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100vh;">
                <button 
                  onclick="location.href='/api'" 
                  style="background-color: #0d6efd; color: white; padding: 0.375rem 0.75rem; margin: 5px; border: none; cursor: pointer; border-radius: 0.25rem; font-size: 1rem;"
                >
                  Документация
                </button>
                <button 
                  onclick="location.href='/admin'" 
                  style="background-color: #198754; color: white; padding: 0.375rem 0.75rem; margin: 5px; border: none; cursor: pointer; border-radius: 0.25rem; font-size: 1rem;"
                >
                  Админка
                </button>
              </div>
            </body>
          </html>
        `
        fs.writeFileSync(indexPath, htmlContent)
      }

    await app.listen(PORT, () => {
      console.log(`server listening on port http://localhost:${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

server()
