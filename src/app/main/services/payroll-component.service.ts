import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LogErrorHandleService } from './log-error-handle.service';
import { Router } from '@angular/router';
import { PayrollComponent } from '../models/payroll-component';
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
export class PayrollComponentService {

  private baseUrl: string = 'https://cryptic-citadel-16128.herokuapp.com/payrollcomponents/';
  constructor(
    private http: HttpClient,
    private logErrorHandle: LogErrorHandleService,
    private router: Router,
  ) { }

  getPayrollComponents(): Observable<PayrollComponent[]> {
    return this.http.get<PayrollComponent[]>(this.baseUrl, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError('getComponents', []))
    );
  }

  getPayrollComponent(id: number): Observable<PayrollComponent> {
    return this.http.get<PayrollComponent>(`${this.baseUrl}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<PayrollComponent>('getPayrollComponent'))
    );
  }

  addPayrollComponent(payCompt: PayrollComponent): Observable<PayrollComponent> {
    return this.http.post<PayrollComponent>(this.baseUrl, payCompt, httpOptions).pipe(
      tap((payCompt: PayrollComponent) => {
        this.logErrorHandle.log('PayrollComponent', payCompt.componentCd + ' successfully added', 0);
        this.router.navigate(['master/component']);
      }),
      catchError(this.logErrorHandle.handleError<PayrollComponent>('add'))
      );
  }

  updatePayrollComponent(payCompt: PayrollComponent) {
    return this.http.put<PayrollComponent>(this.baseUrl + payCompt.id + '/', payCompt, httpOptions).pipe(
      tap((payCompt: PayrollComponent) => {
        this.logErrorHandle.log('PayrollComponent', payCompt.componentCd + ' successfully updated', 0);
        this.router.navigate(['master/component']);
      }),
      catchError(this.logErrorHandle.handleError<PayrollComponent>('update'))
    );
  }

  deletePayrollComponent(payCompt: PayrollComponent): Observable<PayrollComponent> {
    return this.http.delete<PayrollComponent>(`${this.baseUrl}${payCompt.id}/`, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('PayrollComponent', payCompt.componentCd + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<PayrollComponent>('delete'))
    );
  }

}
