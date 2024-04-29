import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(createDto: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(createDto);
    return this.productRepository.save(product);
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOneProduct(id: string): Promise<Product | undefined> {
    return this.productRepository.findOne({ where: { id } });
  }

  async updateProduct(
    id: string,
    updateDto: Partial<Product>,
  ): Promise<Product> {
    let product = await this.findOneProduct(id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    product = { ...product, ...updateDto };
    return this.productRepository.save(product);
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Product with ID ${id} not found`);
    }
  }
}
