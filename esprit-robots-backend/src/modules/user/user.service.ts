import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../../core/base.service';
import { cryptPassword } from '../../utils/auth';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends BaseService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }

  async findByOtpCode(email: string, otpCode: string): Promise<User> {
    return this.userModel
      .findOne({
        email,
        otpCode,
        codeExpires: { $gt: new Date() },
      })
      .orFail(new UnauthorizedException('Invalid or expired code'));
  }

  async updatePassword(email: string, newPassword: string) {
    return this.updateBy(
      { email },
      {
        password: await cryptPassword(newPassword),
        otpCode: null,
        codeExpires: null,
      },
    );
  }
}
