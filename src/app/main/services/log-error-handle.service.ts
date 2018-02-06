import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LogErrorHandleService {

  constructor(private toastr: ToastrService) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log("Error", `${operation} failed: ${error.message}`, 3);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a RwService message with the MessageService */
  log( title: string, message: string, type: number) {
    switch(type) {
      case 0: {
        this.toastr.success(message, title);
        break;
      }
      case 1: {
        this.toastr.info(message, title);
        break;
      }
      case 2: {
        this.toastr.warning(message, title);
        break;
      }
      case 3: {
        this.toastr.error(message, title);
        break;
      }
      default : {
        break;
      }
    }
  }
}
