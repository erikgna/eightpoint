import { IsString, IsNumber, IsOptional, Max, Min } from "class-validator"

export class CreateSubscriptionItemDto {

    @IsString()
    name: string;

    @IsString()
    type: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    @Min(1)
    @Max(10000)
    price: number;

}
