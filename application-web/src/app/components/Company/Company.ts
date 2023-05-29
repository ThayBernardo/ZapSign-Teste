import User from "../User/User";

export default interface Company {
  id: number;
  name: string;
  created_date: Date;
  updated_date: Date;
  time_zone: string;
  language: string;
  guest_users: User[];
  created_by: User;
}