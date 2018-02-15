import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TimeOffScheme } from '../models/time-off-scheme';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class TimeOffSchemeService {

  private baseUrl: string = 'https://cryptic-citadel-16128.herokuapp.com/timeoffschemes/';

  constructor(
    private http: HttpClient,
    private logErrorHandle: LogErrorHandleService,
    private router: Router,
  ) { }

  getList(): Observable<TimeOffScheme[]> {
    return this.http.get<TimeOffScheme[]>(this.baseUrl, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError('getTimeOffScheme', []))
    );
  }

  getData(id: number): Observable<TimeOffScheme> {
    return this.http.get<TimeOffScheme>(`${this.baseUrl}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<TimeOffScheme>('getTimeOffScheme'))
    );
  }

  addData(TimeOffSch: TimeOffScheme): Observable<TimeOffScheme> {
    return this.http.post<TimeOffScheme>(this.baseUrl, TimeOffSch, httpOptions).pipe(
      tap((TimeOffSch: TimeOffScheme) => {
        this.logErrorHandle.log('TimeOffScheme', TimeOffSch.schemeCd + ' successfully added', 0);
        this.router.navigate(['master/timeoffscheme']);
      }),
      catchError(this.logErrorHandle.handleError<TimeOffScheme>('add'))
      );
  }

  updateData(TimeOffSch: TimeOffScheme) {
    return this.http.put<TimeOffScheme>(this.baseUrl + TimeOffSch.id + '/', TimeOffSch, httpOptions).pipe(
      tap((TimeOffSch: TimeOffScheme) => {
        this.logErrorHandle.log('TimeOffScheme', TimeOffSch.schemeCd + ' successfully updated', 0);
        this.router.navigate(['master/timeoffscheme']);
      }),
      catchError(this.logErrorHandle.handleError<TimeOffScheme>('update'))
    );
  }

  deleteData(TimeOffSch: TimeOffScheme): Observable<TimeOffScheme> {
    return this.http.delete<TimeOffScheme>(`${this.baseUrl}${TimeOffSch.id}/`, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('TimeOffScheme', TimeOffSch.schemeCd + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<TimeOffScheme>('delete'))
    );
  }

}
