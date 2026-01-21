/* eslint-disable prettier/prettier */
import { UserRole } from '../user.schema';

export class UpdateUserDto {
  name?: string;
  phone?: string;
  role?: UserRole;
  isActive?: boolean;
  designation?: string;
}
