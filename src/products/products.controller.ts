import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductsDto } from './dto/query-product.dto';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Products")
@ApiExtraModels(QueryProductsDto)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new product" })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: "Get a list of products with pagination and sorting" })
  async getListOfProducts(@Query() query: QueryProductsDto) {
    return this.productsService.getListOfProducts(query);
  }

  @Get("expensivest")
  @ApiOperation({ summary: 'Get the most expensive product' })
  async getTheMostExpensiveProduct() {
    return this.productsService.getTheMostExpensiveProduct();
  }

  @Get("cheapest")
  @ApiOperation({ summary: "Get the cheapest product" })
  async getTheCheapestProduct() {
    return this.productsService.getTheCheapestProduct();
  }

  @Get("meadian")
  @ApiOperation({ summary: "Get median product" })
  async getMedianProduct() {
    return this.productsService.getMedianProduct();
  }

  @Get("count")
  @ApiOperation({ summary: "Get the total number of products" })
  async getAmount() {
    return this.productsService.getAmount();
  }

  @Get(':id')
  @ApiOperation({ summary: "Get product by ID" })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findById(id);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @HttpCode(204)
  async removeById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.removeById(+id);
  }

  @Delete()
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete all products' })
  async removeAll() {
    return this.productsService.removeAll();
  }

}
