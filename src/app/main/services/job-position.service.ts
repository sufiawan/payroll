import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogErrorHandleService } from './log-error-handle.service';
import { Observable } from 'rxjs/Observable';
import { JobPosition } from '../models/job-position';
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
export class JobPositionService {

  private baseUrl: string = 'https://cryptic-citadel-16128.herokuapp.com/jobpositions/';
  constructor(
    private http: HttpClient,
    private logErrorHandle: LogErrorHandleService,
    private router: Router
  ) { }

  getJobPositions(): Observable<JobPosition[]> {
    return this.http.get<JobPosition[]>(this.baseUrl, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError('getJobPositions', []))
    );
  }

  getJobPosition(id: number): Observable<JobPosition> {
    return this.http.get<JobPosition>(`${this.baseUrl}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<JobPosition>('getJobPosition'))
    );
  }

  addJobPosition(jobpos: JobPosition): Observable<JobPosition> {
    return this.http.post<JobPosition>(this.baseUrl, jobpos, httpOptions).pipe(
      tap((jobpos: JobPosition) => {
        this.logErrorHandle.log('JobPosition', jobpos.positionCd + ' successfully added', 0);
        this.router.navigate(['master/jobposition']);
      }),
      catchError(this.logErrorHandle.handleError<JobPosition>('add'))
    );
  }

  updateJobPosition(jobpos: JobPosition) {
    return this.http.put<JobPosition>(this.baseUrl + jobpos.id + '/', jobpos, httpOptions).pipe(
      tap((jobpos: JobPosition) => {
        this.logErrorHandle.log('JobPosition', jobpos.positionCd + ' successfully updated', 0);
        this.router.navigate(['master/jobposition']);
      }),
      catchError(this.logErrorHandle.handleError<JobPosition>('update'))
    );
  }

  deleteJobPosition(jobpos: JobPosition): Observable<JobPosition> {
    return this.http.delete<JobPosition>(`${this.baseUrl}${jobpos.id}/`, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('JobPosition', jobpos.positionCd + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<JobPosition>('delete'))
    );
  }

}
