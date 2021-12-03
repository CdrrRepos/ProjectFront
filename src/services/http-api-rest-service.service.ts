import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpApiRestServiceService {
  constructor( public http: HttpClient) { }

  private GetHeaders(header?: HttpHeaders, credentials: boolean = false): HttpHeaders {
    let headerTemp = new HttpHeaders();
    if (header !== undefined && header !== null) {
      Object.assign(headerTemp, header);
    }
    headerTemp = headerTemp.
                set('Content-Type', 'application/json').
                set('Accept', 'application/json')
                ;
    return headerTemp;
  }

  /**
   * Método para realizar peticiones Http GET.
   * @param url: string -> Complemento del url base para poder invocar el método. Ejemplo {endpoint}/{serviceName}/{controller}/api/{metodo}/{parametro}.
   * Para algunos caso el campo {parametro} puede ser vacío.
   */
  public HttpGet(url: string, credentials: boolean = true, header?: HttpHeaders) {
    try {
      return this.http.get(url, {
        headers: this.GetHeaders(header),
        withCredentials: credentials,
      }).pipe(
        map( (data: any) => {
          return data;
        } )
      );
    } catch (error) {
      throw(error);
    }
  }

  /**
   * Método para realizar peticiones Http POST.
   * @param url: string -> Complemento del url base para poder invocar el método. Ejemplo {endpoint}/{serviceName}/{controller}/api/{metodo}.
   * Para algunos caso el campo {parametro} puede ser vacío.
   * @param object: any -> Objeto que se enviará como POST.
   */
  public HttpPost(url: string, object: any, credentials: boolean = true, header?: HttpHeaders) {
    try {
      return this.http.post(url, JSON.stringify(object), {
        headers: this.GetHeaders(header),
        withCredentials: credentials
      }).pipe(
        map( (data: any) => {
          return data;
        } )
      );
    } catch (error) {
      throw(error);
    }
  }
}
