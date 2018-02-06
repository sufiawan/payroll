import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Company } from '../models/company';
import { LogErrorHandleService } from './log-error-handle.service';
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
export class CompanyService {
  private baseUrl: string = 'https://cryptic-citadel-16128.herokuapp.com/companies/';
  constructor(
    private http: HttpClient,
    private logErrorHandle: LogErrorHandleService,
    private router: Router,
  ) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.baseUrl, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError('getCompanies', []))
    );
  }

  getCompany(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}${id}`, httpOptions).pipe(
      catchError(this.logErrorHandle.handleError<Company>('getCompany'))
    );
  }

  addCompany(comp: Company): Observable<Company> {
    return this.http.post<Company>(this.baseUrl, comp, httpOptions)
      .pipe(
      tap((comp: Company) => {
        this.logErrorHandle.log('Company', comp.companyCd + ' successfully added', 0);
        this.router.navigate(['master/company']);
      }),
      catchError(this.logErrorHandle.handleError<Company>('add'))
      )
  }

  updateCompany(comp: Company) {
    return this.http.put<Company>(this.baseUrl + comp.id + '/', comp, httpOptions).pipe(
      tap((comp: Company) => {
        this.logErrorHandle.log('Company', comp.companyCd + ' successfully updated', 0);
        this.router.navigate(['master/company']);
      }),
      catchError(this.logErrorHandle.handleError<Company>('update'))
    );
  }

  deleteCompany(comp: Company): Observable<Company> {
    return this.http.delete<Company>(`${this.baseUrl}${comp.id}/`, httpOptions).pipe(
      tap(_ => this.logErrorHandle.log('Company', comp.companyCd + ' successfully deleted', 0)),
      catchError(this.logErrorHandle.handleError<Company>('delete'))
    );
  }
}
