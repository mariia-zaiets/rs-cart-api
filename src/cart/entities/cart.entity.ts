import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    () => CartItem,
    cartItem => cartItem.cart,
    { cascade: true },
  )
  items: CartItem[];

  @Column({ default: 'ACTIVE' })
  status: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total: number;
}
