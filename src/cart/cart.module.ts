import { Module } from '@nestjs/common';

import { OrdersModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';

@Module({
  imports: [OrdersModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
