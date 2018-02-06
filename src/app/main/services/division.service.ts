import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogErrorHandleService } from './log-error-handle.service';
import { Division } from '../models/division';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class DivisionService {

  private baseUrl: string = 'https://cryptic-citadel-16128.herokuapp.com/divisions/';
  constructor(
    private http: HttpClient,
    private logErrorHandle: LogErrorHandleService,
    private router: Router
  ) { }

  getDivisions(): Observable<Division[]> {
    return this.http.get<Division[]>(this.baseUrl, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError('getDivisions', []))
    );
  }

  getDivision(id: number): Observable<Division> {
    return this.http.get<Division>(`${this.baseUrl}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Division>('getDivision'))
    );
  }

  addDivision(div: Division): Observable<Division> {
    return this.http.post<Division>(this.baseUrl, div, httpOptions).pipe(
      tap((div: Division) => {
        this.logErrorHandle.log('Division', div.divisionCd + ' successfully added', 0);
        this.router.navigate(['master/division']);
      }),
      catchError(this.logErrorHandle.handleError<Division>('add'))
    );
  }

  updateDivision(div: Division) {
    return this.http.put<Division>(this.baseUrl + div.id + '/', div, httpOptions).pipe(
      tap((div: Division) => {
        this.logErrorHandle.log('Division', div.divisionCd + ' successfully updated', 0);
        this.router.navigate(['master/division']);
      }),
      catchError(this.logErrorHandle.handleError<Division>('update'))
    );
  }

  deleteDivision(div: Division): Observable<Division> {
    return this.http.delete<Division>(`${this.baseUrl}${div.id}/`, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('Division', div.divisionCd + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<Division>('delete'))
    );
  }

}
