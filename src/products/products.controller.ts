import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Product } from './models/product.model'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Parse products from cityLink' })
  @Get('parse')
  async cityLinkPars() {
    return this.productsService.parse()
  }

  @ApiOperation({ summary: 'Get categories count' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get('categories')
  async getCategoriesCount() {
    return await this.productsService.getCategoriesCount()
  }

  @ApiOperation({ summary: 'Get products by type' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get(':type')
  async getProductsByType(@Param('type') type: string, @Query('page') page: number) {
    return await this.productsService.getProductsByType(type, page)
  }

  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, type: Product })
  @Get('id/:id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id)
  }

  @ApiOperation({ summary: 'Get product by name' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get('name/:name')
  async getProductByName(@Param('name') name: string) {
    return await this.productsService.getProductByName(name)
  }
}
