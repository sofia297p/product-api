import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateProductDto {
    @ApiProperty({example:"Laptop", description: "Must be non-null value"})
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: 19.54, description: "Must be positive value" })
    @IsNumber()
    @IsPositive()
    price: number;
}
