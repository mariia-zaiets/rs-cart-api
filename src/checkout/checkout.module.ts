import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckoutService } from './services/checkout.service';
import { Order } from '../order/entities/order.entity';
import { Cart } from '../cart/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Cart])],
  providers: [CheckoutService],
  exports: [CheckoutService],
})
export class CheckoutModule {}
