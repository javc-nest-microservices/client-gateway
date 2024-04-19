import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { catchError } from 'rxjs'
import { PaginationDto } from 'src/common/dto'
import { NATS_SERVICE } from 'src/config'
import { CreateProductDto, UpdateProductDto } from './dto'

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'createProduct' }, createProductDto).pipe(
      catchError((error) => {
        throw new RpcException(error)
      })
    )
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'findAllProducts' }, paginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error)
      })
    )
  }

  @Get(':id')
  async findOneProduct(@Param('id', ParseIntPipe) id: number) {
    // * Using pipe and catchError
    return this.client.send({ cmd: 'findOneProduct' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error)
      })
    )

    // * Using firstValueFrom
    // try {
    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'findOneProduct' }, { id })
    //   )
    //   return product
    // } catch (error) {
    //   throw new RpcException(error)
    // }
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.client
      .send({ cmd: 'updateProduct' }, { id, ...updateProductDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error)
        })
      )
  }

  @Delete(':id')
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'removeProduct' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error)
      })
    )
  }
}
