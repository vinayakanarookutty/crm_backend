/* eslint-disable prettier/prettier */
import { UserRole } from '../user.schema';

export class CreateUserDto {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: UserRole; // Admin / Employee
  designation?: string;
}
