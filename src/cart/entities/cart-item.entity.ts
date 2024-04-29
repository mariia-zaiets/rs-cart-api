import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Cart,
    cart => cart.items,
  )
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @ManyToOne(
    () => Product,
    product => product.id,
  )
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  count: number;
}
