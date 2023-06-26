import { CabInterface } from 'interfaces/cab';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  start_time: any;
  end_time: any;
  cab_id?: string;
  customer_id?: string;
  created_at?: any;
  updated_at?: any;

  cab?: CabInterface;
  user?: UserInterface;
  _count?: {};
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  cab_id?: string;
  customer_id?: string;
}
