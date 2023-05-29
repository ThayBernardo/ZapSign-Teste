import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Company from './Company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private url: string = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  create = (company: Company): Observable<Company> => {
    return this.http.post<Company>(`${this.url}companys/`, company);
  };

  getAllCompanys = (): Observable<Company[]> => {
    return this.http.get<Company[]>(`${this.url}companys/`);
  };

  getCompanyById = (id: number): Observable<Company> => {
    return this.http.get<Company>(`${this.url}company/${id}`);
  };

  update = (id: number, company: Company): Observable<Company> => {
    return this.http.put<Company>(`${this.url}company/${id}`, company);
  };

  delete = (id: number): Observable<Company> => {
    return this.http.delete<Company>(`${this.url}company/${id}`);
  };
}
