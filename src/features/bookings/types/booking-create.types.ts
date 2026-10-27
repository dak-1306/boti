export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  price: number;
  isAvailable: boolean;
}

export interface CourtOption {
  id: string;
  name: string;
  category: string;
  slots: TimeSlot[];
}

export interface BookingCustomer {
  name: string;
  phone: string;
  playerCount?: number;
  notes?: string;
}

export interface CreateBookingPayload {
  venueId: string;
  courtId: string;
  date: string;
  slotIds: string[];
  totalPrice: number;
  customer: BookingCustomer;
}
