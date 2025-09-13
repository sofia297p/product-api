import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsPositive()
    price: number;
}
