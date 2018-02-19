import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AbsentPattern } from '../models/absent-pattern';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
};


@Injectable()
export class AbsentPatternService {

  private baseUrl: string = environment.baseUrl + 'absentpatterns/';

  constructor(
    private http: HttpClient,
    private logErrorHandle: LogErrorHandleService,
    private router: Router
  ) { }

  getList(): Observable<AbsentPattern[]> {
    return this.http.get<AbsentPattern[]>(this.baseUrl, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError('getAbsentPattern', []))
    );
  }

  getData(id: number): Observable<AbsentPattern> {
    return this.http.get<AbsentPattern>(`${this.baseUrl}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<AbsentPattern>('getAbsentPattern'))
    );
  }

  addData(absPattern: AbsentPattern): Observable<AbsentPattern> {
    return this.http.post<AbsentPattern>(this.baseUrl, absPattern, httpOptions).pipe(
      tap((absPattern: AbsentPattern) => {
        this.logErrorHandle.log('AbsentPattern', absPattern.patternCd + ' successfully added', 0);
        this.router.navigate(['master/absentpattern']);
      }),
      catchError(this.logErrorHandle.handleError<AbsentPattern>('add'))
      );
  }

  updateData(absPattern: AbsentPattern) {
    return this.http.put<AbsentPattern>(this.baseUrl + absPattern.id + '/', absPattern, httpOptions).pipe(
      tap((absPattern: AbsentPattern) => {
        this.logErrorHandle.log('AbsentPattern', absPattern.patternCd + ' successfully updated', 0);
        this.router.navigate(['master/absentpattern']);
      }),
      catchError(this.logErrorHandle.handleError<AbsentPattern>('update'))
    );
  }

  deleteData(absPattern: AbsentPattern): Observable<AbsentPattern> {
    return this.http.delete<AbsentPattern>(`${this.baseUrl}${absPattern.id}/`, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('AbsentPattern', absPattern.patternCd + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<AbsentPattern>('delete'))
    );
  }

}
