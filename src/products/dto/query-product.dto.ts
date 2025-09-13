import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { SortDirection } from 'src/common/enums/sort-direction.enum';
import { ProductSortField } from 'src/common/enums/product-sort-field.enum';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryProductsDto {
  @ApiPropertyOptional({example: 1, minimum: 1, default: 1})
  @IsInt()
  @Min(1)
  @IsOptional()
  @Transform(({value}) => Number(value))
  pageIndex:number = 1;

  @ApiPropertyOptional({example: 1, minimum: 1, default: 1})
  @IsInt()
  @Min(1)
  @IsOptional()
  @Transform(({value}) => Number(value))
  pageSize:number = 5;

  @ApiPropertyOptional({enum: ProductSortField, example: ProductSortField.price, default: ProductSortField.price})
  @IsEnum(ProductSortField)
  @IsOptional()
  sortField:ProductSortField = ProductSortField.price;

  @ApiPropertyOptional({enum: SortDirection, example: SortDirection.asc, default: SortDirection.asc})
  @IsEnum(SortDirection)
  @IsOptional()
  sort:SortDirection = SortDirection.asc;
}