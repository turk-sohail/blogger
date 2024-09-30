import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsOptional()
  lastName?: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  password: string;
}
