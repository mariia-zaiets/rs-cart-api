import { Injectable } from '@nestjs/common';
import { Connection, FindOneOptions } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Cart } from '../../cart/entities/cart.entity';

@Injectable()
export class CheckoutService {
  constructor(private connection: Connection) {}

  async performCheckout(
    userId: string,
    cartId: string,
    paymentDetails: any,
  ): Promise<Order> {
    return this.connection.transaction(async manager => {
      const orderRepository = manager.getRepository(Order);
      const cartRepository = manager.getRepository(Cart);

      // Update cart status
      const cart = await cartRepository.findOne(cartId as FindOneOptions<Cart>);
      cart.status = 'ORDERED';
      await cartRepository.save(cart);

      // Create new order
      const order = orderRepository.create({
        userId: userId,
        cartId: cartId,
        payment: paymentDetails,
        delivery: {},
        comments: '',
        status: 'ORDERED',
        total: cart.total,
      });

      return orderRepository.save(order);
    });
  }
}
