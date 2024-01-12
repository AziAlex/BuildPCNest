import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Product, ProductDocument } from './models/product.model'
import { Model } from 'mongoose'
import { CreateProductDto } from './dto'
import { cityLinkParser } from '../parser/citilink'
import { productCatalogNames } from './lib/constants'

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(product: CreateProductDto) {
    const data = await this.productModel.findOne({ href: product.href })

    if (!data) {
      await this.productModel.create(product).catch((err) => console.log(err))
      return 'Product created'
    }
  }

  async parse() {
    await cityLinkParser(this.productModel)
    return 'Products parsed'
  }

  async getCategoriesCount() {
    const data = await this.productModel.find({}, { __v: 0 })

    return data.reduce((acc, obj) => {
      const found = acc.find((item) => item.type === obj.type)
      if (found) {
        found.count++
      } else {
        const name = productCatalogNames.find((item) => item.type === obj.type).name
        acc.push({ type: obj.type, name: name, count: 1 })
      }
      return acc
    }, [])
  }

  async getProductsByType(type: string, page: number) {
    const limit = 10

    // if (typeof page !== 'number') {
    //   throw new NotFoundException('Page should be a number')
    // }  // тут всё хуёва по новой

    try {
      const skip = (page - 1) * limit
      const [data, total] = await Promise.all([
        this.productModel.find({ type }, { __v: 0 }).skip(skip).limit(limit).lean().exec(),
        this.productModel.countDocuments({ type }).exec(),
      ])

      const totalPages = Math.ceil(total / limit)

      if (page > totalPages) {
        throw new NotFoundException('This page does not exist')
      }

      return { page, totalPages, data }
    } catch (error) {
      throw new HttpException(error.message, 404)
    }
  }

  async getProductById(id: string) {
    return this.productModel.findById(id)
  }

  async getProductByName(name: string) {
    return this.productModel.find({ name: { $regex: name, $options: 'i' } })
  }
}
