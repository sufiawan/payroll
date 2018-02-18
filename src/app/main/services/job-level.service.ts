import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogErrorHandleService } from './log-error-handle.service';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { JobLevel } from '../models/job-level';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class JobLevelService {

  private baseUrl: string = environment.baseUrl + 'joblevels/';
  constructor(
    private http: HttpClient,
    private logErrorHandle: LogErrorHandleService,
    private router: Router
  ) { }

  getJobLevels(): Observable<JobLevel[]> {
    return this.http.get<JobLevel[]>(this.baseUrl, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError('getJobLevels', []))
    );
  }

  getJobLevel(id: number): Observable<JobLevel> {
    return this.http.get<JobLevel>(`${this.baseUrl}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<JobLevel>('getJobLevel'))
    );
  }

  addJobLevel(jobLevel: JobLevel): Observable<JobLevel> {
    return this.http.post<JobLevel>(this.baseUrl, jobLevel, httpOptions).pipe(
      tap((jobLevel: JobLevel) => {
        this.logErrorHandle.log('JobLevel', jobLevel.levelCd + ' successfully added', 0);
        this.router.navigate(['master/joblevel']);
      }),
      catchError(this.logErrorHandle.handleError<JobLevel>('add'))
    );
  }

  updateJobLevel(jobLevel: JobLevel) {
    return this.http.put<JobLevel>(this.baseUrl + jobLevel.id + '/', jobLevel, httpOptions).pipe(
      tap((jobLevel: JobLevel) => {
        this.logErrorHandle.log('JobLevel', jobLevel.levelCd + ' successfully updated', 0);
        this.router.navigate(['master/joblevel']);
      }),
      catchError(this.logErrorHandle.handleError<JobLevel>('update'))
    );
  }

  deleteJobLevel(jobLevel: JobLevel): Observable<JobLevel> {
    return this.http.delete<JobLevel>(`${this.baseUrl}${jobLevel.id}/`, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('JobLevel', jobLevel.levelCd + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<JobLevel>('delete'))
    );
  }

}
