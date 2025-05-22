import { IsEmail, IsIn, IsString } from "class-validator";

export class CreateAppDto {
    @IsString()
    name: string;

    @IsString()
    @IsIn(['android', 'ios', 'web', 'desktop'])
    platform: 'android' | 'ios' | 'web' | 'desktop';

    @IsEmail()
    developerEmail: string;
}
