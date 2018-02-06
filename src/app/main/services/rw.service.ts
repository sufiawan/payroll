import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Rw } from '../models/rw';

const httpOptions = {
  headers: new HttpHeaders(
    { 
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class RwService {
  private rwUrl = 'https://young-eyrie-51496.herokuapp.com/rws/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  getRws(): Observable<Rw[]> {
    return this.http.get<Rw[]>(this.rwUrl, httpOptions)
    .pipe(
      catchError(this.handleError('getRws', []))
    );
  }

  /** POST: add a new hero to the server */
  add (rw: Rw): Observable<Rw> {
    return this.http.post<Rw>(this.rwUrl, rw, httpOptions).pipe(      
      tap((rw: Rw) => this.log('added RW No=' + rw.rwNo, 0)),
      catchError(this.handleError<Rw>('add'))
    );
  }

  update (rw: Rw): Observable<Rw> {
    return this.http.put<Rw>(this.rwUrl + rw.id + '/', rw, httpOptions).pipe(
      tap((rw: Rw) => this.log('Updated RW No=' + rw.rwNo, 0)),
      catchError(this.handleError<Rw>('update'))
    );
  }

  delete (rw: Rw | number): Observable<Rw> {
    const id = typeof rw === 'number' ? rw : rw.id;
    const url = `${this.rwUrl}${id}/`;

    return this.http.delete<Rw>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted RW id=${id}`, 0)),
      catchError(this.handleError<Rw>('delete'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`, 3);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a RwService message with the MessageService */
  private log(message: string, type: number) {
    switch(type) {
      case 0: {
        this.toastr.success('RwService: ' + message, 'RW');
        break;
      }
      case 1: {
        this.toastr.info('RwService: ' + message, 'RW');
        break;
      }
      case 2: {
        this.toastr.warning('RwService: ' + message, 'RW');
        break;
      }
      case 3: {
        this.toastr.error('RwService: ' + message, 'RW');
        break;
      }
      default : {
        break;
      }
    }
  }

}
