import { IsString, IsNumber, IsOptional, IsIn, Max, Min } from "class-validator"

export class CreateSubscriptionDto {

    @IsString()
    userId: string;

    @IsString()
    planId: string;

    @IsNumber()
    @Min(1)
    @Max(10000)
    amount: number;

    @IsString()
    currency: string;

    @IsOptional()
    @IsString()
    @IsIn(['active', 'unactive', 'on_hold', 'processing'])
    status?: 'active' | 'unactive' | 'on_hold' | 'processing' = 'active';

}
