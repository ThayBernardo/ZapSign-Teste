import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  create = (user: User): Observable<User> => {
    return this.http.post<User>(`${this.url}users/`, user)
  }

  getAllUsers = (): Observable<User[]> => {
    return this.http.get<User[]>(`${this.url}users/`)
  }

  getUserById = (id: number): Observable<User> => {
    return this.http.get<User>(`${this.url}user/${id}`)
  }

  update = (id: number, user: User): Observable<User> => {
    return this.http.put<User>(`${this.url}user/${id}`, user)
  }

  delete = (id: number): Observable<User> => {
    return this.http.delete<User>(`${this.url}user/${id}`)
  }

}
