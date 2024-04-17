import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  ParseIntPipe
} from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { ORDER_SERVICE } from 'src/config'
import { catchError } from 'rxjs'

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy
  ) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send({ cmd: 'createOrder' }, createOrderDto).pipe(
      catchError((error) => {
        throw new RpcException(error)
      })
    )
  }

  @Get()
  findAllOrders() {
    return this.ordersClient.send({ cmd: 'findAllOrders' }, {}).pipe(
      catchError((error) => {
        throw new RpcException(error)
      })
    )
  }

  @Get(':id')
  findOneOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersClient.send({ cmd: 'findOneOrder' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error)
      })
    )
  }

  @Patch(':id')
  changeOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ) {
    return this.ordersClient
      .send({ cmd: 'changeOrderStatus' }, { id, ...updateOrderDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error)
        })
      )
  }
}
