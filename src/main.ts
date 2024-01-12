import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from 'dotenv'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('BuildPC API')
    .setDescription('BuildPC API documentation')
    .setVersion('1.0')
    .addTag('Nest')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)
  await app.listen(3000, () => {
    console.log(`Application is running on: http://localhost:${3000}`)
  })
}

bootstrap()
