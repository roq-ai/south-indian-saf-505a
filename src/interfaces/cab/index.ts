import { BookingInterface } from 'interfaces/booking';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface CabInterface {
  id?: string;
  make: string;
  model: string;
  license_plate: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  organization?: OrganizationInterface;
  _count?: {
    booking?: number;
  };
}

export interface CabGetQueryInterface extends GetQueryInterface {
  id?: string;
  make?: string;
  model?: string;
  license_plate?: string;
  organization_id?: string;
}
