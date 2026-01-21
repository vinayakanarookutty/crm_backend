/* eslint-disable prettier/prettier */
import { LeadStatus } from '../lead-status.enum';

export class MoveStatusDto {
  status: LeadStatus;

  email?: string;
  destination?: string;
  travelStartDate?: Date;
  travelEndDate?: Date;
  travellers?: {
    adults: number;
    children: number;
    infants: number;
  };

  quotationId?: string;
  bookingId?: string;
  invoiceId?: string;
  lossReason?: string;
}
