import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  ParseUUIDPipe,
  Query
} from '@nestjs/common'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { ORDER_SERVICE } from 'src/config'
import { catchError } from 'rxjs'
import { CreateOrderDto, OrderPaginationDTO, StatusDto } from './dto'

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
  findAllOrders(@Query() orderPaginationDto: OrderPaginationDTO) {
    return this.ordersClient
      .send({ cmd: 'findAllOrders' }, orderPaginationDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error)
        })
      )
  }

  @Get(':id')
  findOneOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send({ cmd: 'findOneOrder' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error)
      })
    )
  }

  @Patch(':id')
  changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ) {
    return this.ordersClient
      .send({ cmd: 'changeOrderStatus' }, { id, ...statusDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error)
        })
      )
  }
}
