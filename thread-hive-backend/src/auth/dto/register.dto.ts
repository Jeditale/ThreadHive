import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'john_doe123',
  })
  usrname: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  fname: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  lname: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'P@ssw0rd123!',
  })
  password: string;

  @ApiProperty({
    description: 'Birthdate of the user',
    example: '1990-01-01T00:00:00.000Z',
  })
  bdate: Date;

  @ApiProperty({
    description: 'Sex of the user',
    example: 'Male',
  })
  sex: string;
}
