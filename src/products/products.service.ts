import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductsDto } from './dto/query-product.dto';


@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService){}
  
  private async sortAscByPrice() {

    return await this.prisma.product.findMany({orderBy:{price:"asc"}});

  }
  async create(createProductDto: CreateProductDto) {
   return await this.prisma.product.create({data: createProductDto});
  }

  async findById(id: number) {
    const product = await this.prisma.product.findUnique({where:{id}});

    if(!product){
      throw new NotFoundException("Product not found");
    }

    return product;
  }

  async getListOfProducts(queryProductDto: QueryProductsDto) {
   return await this.prisma.product.findMany({
    skip: (queryProductDto.pageIndex - 1) * queryProductDto.pageSize,
    take: queryProductDto.pageSize,
    orderBy:{[queryProductDto.sortField]:queryProductDto.sort}
   })
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

    if(amountOfProducts % 2 !== 0){

      const sortedProducts = await this.sortAscByPrice();

      const medianIndex = Math.floor(sortedProducts.length / 2);

      return sortedProducts[medianIndex];

    }
    throw new BadRequestException("Incorect number of products.")

  }
}
