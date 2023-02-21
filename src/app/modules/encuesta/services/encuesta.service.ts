import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private url = environment.apiurl;
  constructor(private _http: HttpClient) { }

  private getHead(): { headers: HttpHeaders } {
    var _headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return { headers: _headers };
  }

  generalService(params) {
    const paramsPost = {
      ...params
    };
    return this._http.post(
      `${this.url}Encuesta/encuesta`,
      paramsPost,
      this.getHead()
    ).pipe(
      map(resp => {
        return resp;
      }), catchError(err => {
        return throwError(err);
      })
    )
  }
}
