import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Document from './Document';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private url: string = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  create = (document: Document): Observable<Document> => {
    return this.http.post<Document>(`${this.url}documents/`, document);
  };

  getAllDocuments = (): Observable<Document[]> => {
    return this.http.get<Document[]>(`${this.url}documents/`);
  };

  getDocumentById = (id: number): Observable<Document> => {
    return this.http.get<Document>(`${this.url}document/${id}`);
  };

  update = (id: number, document: Document): Observable<Document> => {
    return this.http.put<Document>(`${this.url}document/${id}`, document);
  };

  delete = (id: number): Observable<Document> => {
    return this.http.delete<Document>(`${this.url}document/${id}`);
  };
}
