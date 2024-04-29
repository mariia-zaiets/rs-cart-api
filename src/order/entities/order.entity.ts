import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { User } from '../../users/entities';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  cartId: string;

  @Column('json')
  payment: any;

  @Column('json')
  delivery: any;

  @Column('text')
  comments: string;

  @Column({ type: 'varchar', default: 'ORDERED' })
  status: string;

  @Column('decimal')
  total: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Cart)
  @JoinColumn({ name: 'cartId' })
  cart: Cart;
}
