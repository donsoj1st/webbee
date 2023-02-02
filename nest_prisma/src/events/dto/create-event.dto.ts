export class CreateEventDto {}
export class workshop {
  id: number;
  start: Date;
  end: Date;
  eventId: Number;
  name: string;
  createdAt: Date;
}
export interface value {
  id: number;
  name: string;
  createdAt: any;
  workshops: workshop[];
}
