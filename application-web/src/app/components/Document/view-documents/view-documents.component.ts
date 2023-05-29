import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css'],
})
export class ViewDocumentsComponent {
  documents: any | undefined;
  id: string = '';

  ngOnInit() {
    const id = localStorage.getItem('UserId');
    if (id) {
      this.id = id;
    }
  }

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {
    this.getDocuments();
  }

  getDocuments = () => {
    this.documentService
      .getAllDocuments()
      .pipe(
        tap((data) => {
          this.documents = data.filter(
            (document: any) => document.created_by === parseInt(this.id)
          );
        }),
        catchError((error) => {
          console.log('Ocorreu um erro:', error.message);
          return of([]);
        })
      )
      .subscribe();
  };

  deleteDocument = (id: number) => {
    this.documentService
      .delete(id)
      .pipe(
        tap((data) => {
          console.log(data);
        }),
        catchError((error) => {
          console.log('Ocorreu um erro:', error.message);
          return of(null);
        })
      )
      .subscribe();
  };

  signDocument = (document: any) => {
    document.signed = true;

    this.documentService
      .update(document.id, document)
      .pipe(
        tap((data) => {
          console.log('Documento assinado');
        }),
        catchError((error) => {
          console.log('Ocorreu um erro:', error.message);
          return of(null);
        })
      )
      .subscribe();
  };

  changeDeleteStatus = (document: any) => {
    document.deleted = true;

    this.documentService
      .update(document.id, document)
      .pipe(
        tap((data) => {
          console.log('Documento deletado');
          this.router
            .navigateByUrl('/view-documents', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/view-documents']);
            });
        }),
        catchError((error) => {
          console.log('Ocorreu um erro:', error.message);
          return of(null);
        })
      )
      .subscribe();
  };

  isDateLimitExceeded = (dateLimit: string): boolean => {
    const currentDate = new Date();
    const limitDate = new Date(dateLimit);

    return currentDate > limitDate;
  };

  redirect = () => {
    this.router.navigate(['/create-document']);
  };
}
