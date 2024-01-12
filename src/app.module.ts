import { Module } from '@nestjs/common'
import { ProductsModule } from './products/products.module'
import { MongooseModule } from '@nestjs/mongoose'
import * as process from 'process'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
