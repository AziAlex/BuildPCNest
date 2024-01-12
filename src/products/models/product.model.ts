import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { productExample } from '../lib/constants'

export type ProductDocument = Product & Document

@Schema({ versionKey: false })
export class Product {
  @ApiProperty({ example: productExample.type })
  @Prop({ required: true })
  type: string

  @ApiProperty({ example: productExample.marketplace })
  @Prop({ required: true })
  marketplace: string

  @ApiProperty({ example: productExample.name })
  @Prop({ required: true })
  name: string

  @ApiProperty({ example: productExample.href })
  @Prop({ required: true })
  href: string

  @ApiProperty({ example: productExample.price })
  @Prop({ required: true })
  price: number

  @ApiProperty({ example: productExample.characteristics })
  @Prop({ required: true })
  characteristics: string[]

  @ApiProperty({ example: productExample.img })
  @Prop({ required: true })
  img: string[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)
