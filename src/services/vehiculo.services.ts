import { Injectable } from '@angular/core';
import { HttpApiRestServiceService } from './http-api-rest-service.service';
import { map } from 'rxjs/operators';
import { modelResponse } from 'src/model/ModelResponse.model';
import { vehiculoModel } from 'src/model/vehiculoModel.model';

@Injectable({
  providedIn: 'root'
})
export class TesoreriaService extends HttpApiRestServiceService {

  private get urlBase(): string {
    return "https://localhost:44394/api/Vehiculo/";
  }
 
  /**
   * Consulta para obtener conteo o recuado de vehiculos
   */
  public async GetObtenerConsultaVehiculos(path: string) {
    const url = `${this.urlBase}${path}`;
    return this.HttpGet(url).pipe(
      map((response: modelResponse<vehiculoModel>) => {
        return response;
      })
    );
  }

}
