import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 12; // Increased salt rounds for stronger hashing

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   * @param registerDto - Registration data
   * @returns A success message and the newly created user's ID
   */
  async register(registerDto: RegisterDto) {
    const { email, password, ...rest } = registerDto;

    // Validate email format (basic regex)
    if (!this.isValidEmail(email)) {
      throw new BadRequestException('Invalid email format');
    }

    // Check if the email is already registered
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    // Hash the password with a salt
    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    // Create the user
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        ...rest,
      },
    });

    return {
      message: 'User registered successfully',
      userId: newUser.id,
    };
  }

  /**
   * Login a user
   * @param loginDto - Login data
   * @returns A success message, JWT token, and user ID
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Validate email format
    if (!this.isValidEmail(email)) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Find the user by email
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate a JWT token
    const payload = {
      userId: user.id,
      email: user.email,
      isAdmin: user.isAdmin || false, // Default to false if not defined
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: '7d', // Token validity period
    });

    return {
      message: 'Login successful',
      token,
      userId: user.id,
    };
  }

  /**
   * Validate email format using a regex
   * @param email - The email to validate
   * @returns Whether the email format is valid
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
