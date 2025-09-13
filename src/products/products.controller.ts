import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductsDto } from './dto/query-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async getListOfProducts(@Query() query: QueryProductsDto) {
    return this.productsService.getListOfProducts(query);
  }

  @Get("expensivest")
  async getTheMostExpensiveProduct() {
    return this.productsService.getTheMostExpensiveProduct();
  }

  @Get("cheapest")
  async getTheCheapestProduct() {
    return this.productsService.getTheCheapestProduct();
  }

  @Get("meadian")
  async getMedianProduct() {
    return this.productsService.getMedianProduct();
  }

  @Get("count")
  async getAmount() {
    return this.productsService.getAmount();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.productsService.findById(+id);
  }


  @Delete(':id')
  async removeById(@Param('id') id: string) {
    return this.productsService.removeById(+id);
  }

  @Delete()
  async removeAll() {
    return this.productsService.removeAll();
  }

}
