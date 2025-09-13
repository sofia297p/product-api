import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService){}
  
  private async sortAscByPrice() {

    return await this.prisma.product.findMany({orderBy:{price:"asc"}});

  }

  async findById(id: number) {
    const product = await this.prisma.product.findUnique({where:{id}});

    if(!product){
      throw new NotFoundException("Product not found");
    }

    return product;
  }


  async removeById(id: number) {
    await this.findById(id);
    
    await this.prisma.product.delete({where:{id}});

  }

 
  async removeAll() {

    await this.prisma.product.deleteMany();

  }

  async getAmount() {

    return await this.prisma.product.count();

  }

  async getTheMostExpensiveProduct() {

    const sortedProducts = await this.sortAscByPrice();

    return sortedProducts[sortedProducts.length - 1];

  }

  async getTheCheapestProduct() {

    const sortedProducts = await this.sortAscByPrice();

    return sortedProducts[0];

  }


  async getMedianProduct() {

    const amountOfProducts = await this.getAmount();

    if(amountOfProducts % 2 === 0){

      const sortedProducts = await this.sortAscByPrice();

      const medianIndex = Math.ceil(sortedProducts.length / 2);

      return sortedProducts[medianIndex];

    }
    throw new BadRequestException("Incorect number of products.")

  }
}
