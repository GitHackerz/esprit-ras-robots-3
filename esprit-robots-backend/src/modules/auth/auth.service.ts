import { MailerService } from '@nestjs-modules/mailer';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, cryptPassword } from '../../utils/auth';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { VerifyOtpDto } from '../user/dto/verify-otp.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async signIn(credentials: LoginDto) {
    const { email, password } = credentials;

    const user = await this.userService.findOneOrFail({ email });
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    if (!user.isVerified) throw new UnauthorizedException('User Not Verified');

    const token = this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '7d',
      },
    );

    const refreshToken = this.jwtService.sign(
      { id: user.id },
      {
        expiresIn: '30d',
      },
    );

    return { token, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    const { id } = this.jwtService.verify(refreshToken);
    const user = await this.userService.findOne(id);

    const token = this.jwtService.sign({ id: user.id });
    return { token, refreshToken };
  }

  async sendOtpCode(email: string): Promise<string> {
    const user = await this.userService.findOneOrFail({ email });

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    user.otpCode = code;
    user.codeExpires = expiresAt;
    await user.save();

    return code;
  }

  async sendAccountVerification(email: string): Promise<void> {
    const code = await this.sendOtpCode(email);
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify your email',
      template: 'verify-account',
      context: {
        code,
      },
    });
  }

  async verifyAccount(otpDto: VerifyOtpDto) {
    const user = await this.verifyOtp(otpDto);
    user.isVerified = true;

    return user.save();
  }

  async forgetPassword(email: string): Promise<void> {
    const code = await this.sendOtpCode(email);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset password',
      template: 'reset-password',
      context: {
        code,
      },
    });
  }

  async verifyOtp(otpDto: VerifyOtpDto) {
    const user = await this.userService.findByOtpCode(
      otpDto.email,
      otpDto.otpCode,
    );
    user.otpCode = null;
    user.codeExpires = null;

    return user.save();
  }

  async resendOtp(email: string) {
    const user = await this.userService.findOneOrFail({ email });
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.otpCode = otp;
    user.codeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
    user.isVerified = false;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify your email',
      template: 'verify-account',
      context: {
        otp,
      },
    });

    return user.save();
  }

  async resetPassword(email: string, newPassword: string): Promise<void> {
    await this.userService.updatePassword(email, newPassword);
  }

  async signUp(createUserDto: CreateUserDto) {
    const existedUser = await this.userService.findOne({
      email: createUserDto.email,
    });
    if (existedUser)
      throw new ConflictException('User with this email already exists');

    //TODO: Send an email to the user to inform that the request for create an account is received

    const user = await this.userService.create({
      ...createUserDto,
      password: await cryptPassword(createUserDto.password),
    });

    return user.save();
  }
}
