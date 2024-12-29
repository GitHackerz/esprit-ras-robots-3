import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { ChallengeType, Member } from '../entities/team.entity';

export class MemberDto {
  @ApiProperty({ description: 'Member email', example: 'member@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Member name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Member phone number', example: '+21612345678' })
  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class CreateTeamDto {
  @ApiProperty({ description: 'Team email', example: 'team@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Team name', example: 'Robot Masters' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Challenge type',
    enum: ChallengeType,
    example: ChallengeType.JUNIOR,
  })
  @IsEnum(ChallengeType)
  @IsNotEmpty()
  challenge: ChallengeType;

  @ApiProperty({ description: 'Establishment name', example: 'ESPRIT' })
  @IsString()
  @IsNotEmpty()
  establishment: string;

  @ApiProperty({ description: 'Club name', example: 'Robotics Club' })
  @IsString()
  @IsNotEmpty()
  club: string;

  @ApiProperty({
    description: 'Team members',
    type: [MemberDto],
    example: [
      {
        email: 'member@gmail.com',
        name: 'John Doe',
        phone: '+21612345678',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MemberDto)
  members: Member[];

  @ApiProperty({
    description: 'Whether team has taken coffee break',
    example: false,
    required: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  hasCoffeeBreak?: boolean;
}
