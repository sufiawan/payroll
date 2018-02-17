import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { TimeOffPolicy } from '../models/time-off-policy';
import { Observable } from 'rxjs/Observable';
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
export class TimeOffPolicyService {

  private baseUrl = environment.baseUrl + 'timeoffpolicies/';

  constructor(
    private http: HttpClient,
    private logErrorHandle: LogErrorHandleService,
    private router: Router,
  ) { }

  getList(): Observable<TimeOffPolicy[]> {
    return this.http.get<TimeOffPolicy[]>(this.baseUrl, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError('getTimeOffPolicy', []))
    );
  }

  getData(id: number): Observable<TimeOffPolicy> {
    return this.http.get<TimeOffPolicy>(`${this.baseUrl}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<TimeOffPolicy>('getTimeOffPolicy'))
    );
  }

  addData(timeOff: TimeOffPolicy): Observable<TimeOffPolicy> {
    return this.http.post<TimeOffPolicy>(this.baseUrl, timeOff, httpOptions).pipe(
      tap((timeOff: TimeOffPolicy) => {
        this.logErrorHandle.log('TimeOffPolicy', timeOff.timeOffCd + ' successfully added', 0);
        this.router.navigate(['master/timeoffpolicy']);
      }),
      catchError(this.logErrorHandle.handleError<TimeOffPolicy>('add'))
      );
  }

  updateData(timeOff: TimeOffPolicy) {
    return this.http.put<TimeOffPolicy>(this.baseUrl + timeOff.id + '/', timeOff, httpOptions).pipe(
      tap((timeOff: TimeOffPolicy) => {
        this.logErrorHandle.log('TimeOffPolicy', timeOff.timeOffCd + ' successfully updated', 0);
        this.router.navigate(['master/timeoffpolicy']);
      }),
      catchError(this.logErrorHandle.handleError<TimeOffPolicy>('update'))
    );
  }

  deleteData(timeOff: TimeOffPolicy): Observable<TimeOffPolicy> {
    return this.http.delete<TimeOffPolicy>(`${this.baseUrl}${timeOff.id}/`, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('TimeOffPolicy', timeOff.timeOffCd + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<TimeOffPolicy>('delete'))
    );
  }

}
