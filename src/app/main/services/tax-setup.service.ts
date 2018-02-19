import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { TaxSetup } from '../models/tax-setup';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class TaxSetupService {

  private baseUrl: string = environment.baseUrl + 'taxsetups/';

  constructor(
    private http: HttpClient,
    private logErrorHandle: LogErrorHandleService,
    private router: Router,
  ) { }

  getList(): Observable<TaxSetup[]> {
    return this.http.get<TaxSetup[]>(this.baseUrl, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError('getTaxSetup', []))
    );
  }

  getData(id: number): Observable<TaxSetup> {
    return this.http.get<TaxSetup>(`${this.baseUrl}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<TaxSetup>('getTaxSetup'))
    );
  }

  addData(taxSetup: TaxSetup): Observable<TaxSetup> {
    return this.http.post<TaxSetup>(this.baseUrl, taxSetup, httpOptions).pipe(
      tap((taxSetup: TaxSetup) => {
        this.logErrorHandle.log('TaxSetup', 'TaxSetup successfully added', 0);
        this.router.navigate(['master/taxsetup']);
      }),
      catchError(this.logErrorHandle.handleError<TaxSetup>('add'))
      );
  }

  updateData(taxSetup: TaxSetup) {
    return this.http.put<TaxSetup>(this.baseUrl + taxSetup.id + '/', taxSetup, httpOptions).pipe(
      tap((taxSetup: TaxSetup) => {
        this.logErrorHandle.log('TaxSetup', 'TaxSetup successfully updated', 0);
        this.router.navigate(['master/taxsetup']);
      }),
      catchError(this.logErrorHandle.handleError<TaxSetup>('update'))
    );
  }

  deleteData(taxSetup: TaxSetup): Observable<TaxSetup> {
    return this.http.delete<TaxSetup>(`${this.baseUrl}${taxSetup.id}/`, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('TaxSetup', 'TaxSetup successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<TaxSetup>('delete'))
    );
  }

}
