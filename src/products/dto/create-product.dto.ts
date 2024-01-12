import { ApiProperty } from '@nestjs/swagger'
import { productExample } from '../lib/constants'
import { IsArray, IsString } from 'class-validator'

export class CreateProductDto {
  @ApiProperty({ example: productExample.type })
  @IsString({ message: 'Type must be a string' })
  readonly type: string

  @ApiProperty({ example: productExample.marketplace })
  @IsString({ message: 'Type must be a string' })
  readonly marketplace: string

  @ApiProperty({ example: productExample.name })
  @IsString({ message: 'Type must be a string' })
  readonly name: string

  @ApiProperty({ example: productExample.href })
  @IsString({ message: 'Type must be a string' })
  readonly href: string

  @ApiProperty({ example: productExample.price })
  @IsString({ message: 'Type must be a string' })
  readonly price: number

  @ApiProperty({ example: productExample.characteristics })
  @IsArray({ message: 'Type must be a string array' })
  readonly characteristics: string[]

  @ApiProperty({ example: productExample.img })
  @IsArray({ message: 'Type must be a string array' })
  readonly img: string[]
}
