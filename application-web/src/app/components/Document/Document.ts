import User from "../User/User";

export default interface Company {
  id: number;
  name: string;
  deleted: boolean;
  created_date: Date;
  updated_date: Date;
  date_limit: Date;
  signed: boolean;
  company_associated: Company;
  created_by: User;
}