import { CreateOrderDto } from './../dto/create-order.dto';

export function reduceToEntityFields(order: CreateOrderDto) {
  delete order.deliveryId;
  delete order.orderedProducts;
  return order;
}
