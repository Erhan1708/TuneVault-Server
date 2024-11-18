import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

    await app.listen(PORT, () => {
      console.log(`server listening on port http://localhost:${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

server()
