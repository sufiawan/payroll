import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { Prorate } from '../models/prorate';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class ProrateService {

  private baseUrl: string = environment.baseUrl + 'prorates/';
  constructor(
    private http: HttpClient,
    private logErrorHandle: LogErrorHandleService,
    private router: Router,
  ) { }

  getProrates(): Observable<Prorate[]> {
    return this.http.get<Prorate[]>(this.baseUrl, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError('getProrates', []))
    );
  }

  getProrate(id: number): Observable<Prorate> {
    return this.http.get<Prorate>(`${this.baseUrl}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Prorate>('getProrate'))
    );
  }

  addProrate(prorate: Prorate): Observable<Prorate> {
    return this.http.post<Prorate>(this.baseUrl, prorate, httpOptions).pipe(
      tap((prorate: Prorate) => {
        this.logErrorHandle.log('Prorate', prorate.proRateCd + ' successfully added', 0);
        this.router.navigate(['master/prorate']);
      }),
      catchError(this.logErrorHandle.handleError<Prorate>('add'))
      )
  }

  updateProrate(prorate: Prorate) {
    return this.http.put<Prorate>(this.baseUrl + prorate.id + '/', prorate, httpOptions).pipe(
      tap((prorate: Prorate) => {
        this.logErrorHandle.log('Prorate', prorate.proRateCd + ' successfully updated', 0);
        this.router.navigate(['master/prorate']);
      }),
      catchError(this.logErrorHandle.handleError<Prorate>('update'))
    );
  }

  deleteProrate(prorate: Prorate): Observable<Prorate> {
    return this.http.delete<Prorate>(`${this.baseUrl}${prorate.id}/`, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('Prorate', prorate.proRateCd + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<Prorate>('delete'))
    );
  }

}
