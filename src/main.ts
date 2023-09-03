import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('BIdding process')
    .setDescription('This is the api for bidding process')
    .setVersion('1.0')
    .addTag('bidding')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  const port = +process.env.PORT || 3000

  await app.listen(+process.env.PORT || 3000, () => {
    Logger.log(`Server is running on port http://localhost:${port}`)
    Logger.log(`Swagger is running on port http://localhost:${port}/docs`)
  })
}
bootstrap()
