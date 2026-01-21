/* eslint-disable prettier/prettier */
export class UpdateLeadDto {
  name?: string;
  phone?: string;
  email?: string;
  destination?: string;
  travelStartDate?: Date;
  travelEndDate?: Date;
  travellers?: {
    adults: number;
    children: number;
    infants: number;
  };
}
