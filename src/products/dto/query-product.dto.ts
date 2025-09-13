import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { SortDirection } from 'src/common/enums/sort-direction.enum';
import { ProductSortField } from 'src/common/enums/product-sort-field.enum';
import { Transform } from 'class-transformer';

export class QueryProductsDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  @Transform(({value}) => Number(value))
  pageIndex:number = 1;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Transform(({value}) => Number(value))
  pageSize:number = 10;

  @IsEnum(ProductSortField)
  @IsOptional()
  sortField:ProductSortField = ProductSortField.price;

  @IsEnum(SortDirection)
  @IsOptional()
  sort:SortDirection = SortDirection.asc;
}