import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";
export class UpdateUserDto extends PartialType(CreateUserDto) {
        @IsOptional()
        @IsString()
        readonly fname?: string;

        @IsOptional()
        @IsString()
        readonly lname?: string

        @IsOptional()
        @IsString()
        readonly usrname?: string

        @IsOptional()
        @IsString()
        readonly profilepicture? : string

        @IsOptional()
        @IsString()
        readonly email? : string

        @IsOptional()
        @IsString()
        readonly password? : string

        @IsOptional()
        @IsDate()
        readonly bdate? : Date

        @IsOptional()
        @IsString()
        readonly sex? : string

        @IsOptional()
        @IsBoolean()
        readonly isAdmin?: boolean
}
