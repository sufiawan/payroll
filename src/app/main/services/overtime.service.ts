import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Overtime } from '../models/overtime';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class OvertimeService {

  private baseUrl: string = environment.baseUrl + 'overtimes/';
  constructor(
    private http: HttpClient,
    private logErrorHandle: LogErrorHandleService,
    private router: Router,
  ) { }

  getList(): Observable<Overtime[]> {
    return this.http.get<Overtime[]>(this.baseUrl, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError('getOvertime', []))
    );
  }

  getData(id: number): Observable<Overtime> {
    return this.http.get<Overtime>(`${this.baseUrl}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Overtime>('getOvertime'))
    );
  }

  addData(ovt: Overtime): Observable<Overtime> {
    return this.http.post<Overtime>(this.baseUrl, ovt, httpOptions).pipe(
      tap((ovt: Overtime) => {
        this.logErrorHandle.log('Overtime', ovt.overtimeCd + ' successfully added', 0);
        this.router.navigate(['master/overtime']);
      }),
      catchError(this.logErrorHandle.handleError<Overtime>('add'))
      );
  }

  updateData(ovt: Overtime) {
    return this.http.put<Overtime>(this.baseUrl + ovt.id + '/', ovt, httpOptions).pipe(
      tap((ovt: Overtime) => {
        this.logErrorHandle.log('Overtime', ovt.overtimeCd + ' successfully updated', 0);
        this.router.navigate(['master/overtime']);
      }),
      catchError(this.logErrorHandle.handleError<Overtime>('update'))
    );
  }

  deleteData(ovt: Overtime): Observable<Overtime> {
    return this.http.delete<Overtime>(`${this.baseUrl}${ovt.id}/`, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('Overtime', ovt.overtimeCd + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<Overtime>('delete'))
    );
  }

}
