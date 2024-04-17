import {
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { PaginationDto } from 'src/common/dto'
import { PRODUCT_SERVICE } from 'src/config'

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduct() {
    return 'Create product'
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'findAllProducts' }, paginationDto)
  }

  @Get(':id')
  getProductsById() {
    return 'Get product by id'
  }

  @Patch(':id')
  updateProduct() {
    return 'Update product'
  }

  @Delete(':id')
  deleteProduct() {
    return 'Delete product'
  }
}
