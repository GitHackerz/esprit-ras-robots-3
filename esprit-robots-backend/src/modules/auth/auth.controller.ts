import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { VerifyOtpDto } from '../user/dto/verify-otp.dto';
import { AuthService } from './auth.service';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in user' })
  @ApiResponse({
    status: 200,
    description: 'Returns access and refresh tokens',
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signIn(@Body() credentials: LoginDto) {
    return this.authService.signIn(credentials);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Returns new access token' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  // SIGN UP: SEND ACCOUNT VERIFICATION - VERIFY ACCOUNT - SIGN UP

  @Post('send-account-verification')
  @ApiOperation({ summary: 'Send account verification OTP' })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  async sendAccountVerification(@Body('email') email: string) {
    return this.authService.sendAccountVerification(email);
  }

  @Post('verify-account')
  @ApiOperation({ summary: 'Verify account with OTP' })
  @ApiResponse({ status: 200, description: 'Account verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid OTP' })
  async verifyAccount(@Body() body: VerifyOtpDto) {
    return this.authService.verifyAccount(body);
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Create new user account' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('resend-otp')
  @ApiOperation({ summary: 'Resend verification OTP' })
  @ApiResponse({ status: 200, description: 'OTP resent successfully' })
  async resendOtp(@Body('email') email: string) {
    return this.authService.resendOtp(email);
  }

  // RESET PASSWORD: FORGET PASSWORD - VERIFY OTP - RESET PASSWORD

  @Post('forget-password')
  @ApiOperation({ summary: 'Initiate forget password process' })
  @ApiResponse({ status: 200, description: 'Reset OTP sent successfully' })
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto.email);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP for password reset' })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid OTP' })
  async verifyOtp(@Body() otpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(otpDto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    console.log(resetPasswordDto);
    return this.authService.resetPassword(
      resetPasswordDto.email,
      resetPasswordDto.password,
    );
  }
}
