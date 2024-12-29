import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request as RequestType } from 'express';
import { AuthenticatedAccessGuard } from '../../core/guards/authenticated.guard';
import { comparePassword, cryptPassword } from '../../utils/auth';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

type CustomRequestType = RequestType & { user: User };

@ApiBearerAuth()
@UseGuards(AuthenticatedAccessGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async profile(@Request() req: CustomRequestType) {
    return this.userService.findOneOrFail(req.user.id);
  }

  @Patch('update-password')
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Request() req: CustomRequestType,
  ) {
    const user = await this.userService.findOneOrFail(req.user.id);
    const isPasswordMatch = await comparePassword(
      updatePasswordDto.currentPassword,
      user.password,
    );
    if (!isPasswordMatch) throw new UnauthorizedException('Invalid password');

    return this.userService.updatePassword(
      user.email,
      updatePasswordDto.newPassword,
    );
  }

  @Patch('update-profile')
  async updateProfile(
    @Request() req: CustomRequestType,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  @Delete('delete-profile')
  async deleteProfile(@Request() req: CustomRequestType) {
    return this.userService.remove(req.user.id);
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    delete body._id;
    return this.userService.create({
      ...body,
      password: await cryptPassword(body.password),
    });
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOneOrFail(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
