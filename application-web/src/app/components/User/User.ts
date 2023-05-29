export default interface User {
  id: number;
  email: string;
  password_reset_date: Date;
  verification_email: boolean;
  password: string;
  created_date: Date;
  updated_date: Date;
}
