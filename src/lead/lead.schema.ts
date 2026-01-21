import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LeadStatus } from './lead-status.enum';

@Schema({ timestamps: true })
export class Lead extends Document {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) phone: string;
  @Prop() email: string;

  @Prop({ enum: LeadStatus, default: LeadStatus.NEW })
  status: LeadStatus;

  @Prop() destination: string;
  @Prop() travelStartDate: Date;
  @Prop() travelEndDate: Date;

  @Prop({
    type: {
      adults: Number,
      children: Number,
      infants: Number,
    },
  })
  travellers: {
    adults: number;
    children: number;
    infants: number;
  };

  @Prop() quotationId: string;
  @Prop() bookingId: string;
  @Prop() invoiceId: string;

  @Prop() lossReason: string;

  @Prop({ type: [Object], default: [] })
  history: { action: string; user: string; date: Date }[];
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
