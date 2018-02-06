import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Rt } from '../models/rt';

const httpOptions = {
  headers: new HttpHeaders(
    { 
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class RtService {
  private url = 'https://young-eyrie-51496.herokuapp.com/rts/';  // URL to web api
  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  getRows(): Observable<Rt[]> {
    return this.http.get<Rt[]>(this.url, httpOptions)
    .pipe(
      catchError(this.handleError('getRows', []))
    );
  }

  /** POST: add a new hero to the server */
  add (rt: Rt): Observable<Rt> {
    return this.http.post<Rt>(this.url, rt, httpOptions).pipe(      
      tap((rt: Rt) => this.log('added RT No=' + rt.rtNo, 0)),
      catchError(this.handleError<Rt>('add'))
    );
  }

  update (rt: Rt): Observable<Rt> {
    return this.http.put<Rt>(this.url + rt.id + '/', rt, httpOptions).pipe(
      tap((rt: Rt) => this.log('Updated RT No=' + rt.rtNo, 0)),
      catchError(this.handleError<Rt>('update'))
    );
  }

  delete (rt: Rt | number): Observable<Rt> {
    const id = typeof rt === 'number' ? rt : rt.id;
    const url = `${this.url}${id}/`;

    return this.http.delete<Rt>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted RT id=${id}`, 0)),
      catchError(this.handleError<Rt>('delete'))
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
        this.toastr.success('RtService: ' + message, 'RT');
        break;
      }
      case 1: {
        this.toastr.info('RtService: ' + message, 'RT');
        break;
      }
      case 2: {
        this.toastr.warning('RtService: ' + message, 'RT');
        break;
      }
      case 3: {
        this.toastr.error('RtService: ' + message, 'RT');
        break;
      }
      default : {
        break;
      }
    }
  }

}
