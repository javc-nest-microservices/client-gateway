import { IsEnum } from 'class-validator'
import { OrderStatus, OrderStatusList } from './enum/order.enum'

export class StatusDto {
  @IsEnum(OrderStatusList, {
    message: `status must be a valid value ${OrderStatusList}`
  })
  status: OrderStatus
}
