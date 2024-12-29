import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { VerifyOtpDto } from '../user/dto/verify-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() credentials: LoginDto) {
    return this.authService.signIn(credentials);
  }

  @Post('sign-up')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() otpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(otpDto);
  }

  @Post('resend-otp')
  async resendOtp(@Body('email') email: string) {
    return this.authService.resendOtp(email);
  }

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('forget-password')
  @ApiOperation({
    summary: 'Forget password',
    description: 'Forget password',
  })
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto.email);
  }

  @Post('reset-password')
  @ApiOperation({
    summary: 'Reset password',
    description: 'Reset password',
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    console.log(resetPasswordDto);
    return this.authService.resetPassword(
      resetPasswordDto.email,
      resetPasswordDto.password,
    );
  }
}
