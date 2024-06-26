import { IsEnum, IsOptional } from 'class-validator'
import { PaginationDto } from 'src/common/dto'
import { OrderStatus, OrderStatusList } from './enum/order.enum'

export class OrderPaginationDTO extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Valid status values are ${OrderStatusList}`
  })
  status: OrderStatus
}
