import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'OTP code for verification',
    example: '123456',
    required: false,
  })
  @IsString()
  @IsOptional()
  otpCode?: string;

  @ApiProperty({
    description: 'OTP code expiration date',
    example: '2024-01-20T10:30:00Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  codeExpires?: Date;
}
