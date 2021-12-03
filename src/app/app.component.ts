import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TesoreriaService } from 'src/services/vehiculo.services';
import { modelResponse } from 'src/model/ModelResponse.model';
import { vehiculoModel } from 'src/model/vehiculoModel.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['estacion', 'sentido', 'hora', 'categoria', 'fecha', 'cantidad'];
  public dataVehiculo: vehiculoModel[] = [];
  filtroConsulta: string = "conteo";
  fecha: string = "";
  complement: string = "";
  tableView: boolean = true;
  report: boolean = false;
  responseMessage: string = "No se encontrares registros con el filtro de ";

  dataSource = new MatTableDataSource<vehiculoModel>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private serviceTesoreria: TesoreriaService
    ,public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  text: any

  /**
   * ConsultaInfromacion
   */
  public async ConsultaInfromacion() {

    if (!this.report) {

      let complementMessage = "";

      this.complement = (this.filtroConsulta == "recaudo" ? "GetRecaudo" : "GetConteo");
      complementMessage = this.filtroConsulta + " de vehiculos";

      if (this.fecha != "" && this.fecha != null) {
        this.complement = (this.filtroConsulta == "recaudo" ? "GetRecaudoFecha?fecha=" : "GetConteoFecha?fecha=");
        this.complement = this.complement + this.fecha;
        complementMessage = this.filtroConsulta + " de vehiculos y la fecha " + this.fecha;
      }

      //Consultar cuentas parametrizadas
      (await this.serviceTesoreria.GetObtenerConsultaVehiculos(this.complement)).subscribe((response: modelResponse<vehiculoModel>) => {
        console.log(response);
        if (response.codigoRespuesta === 200) {
          if(response.data.length > 0){
            this.dataVehiculo = response.data;
            this.dataSource = new MatTableDataSource<vehiculoModel>(this.dataVehiculo);
            this.dataSource.paginator = this.paginator;
            this.visibilityTable(true,false)
          }else{
            this.visibilityTable(true)
            this.dialog.open(DialogComponent, {
              data: { mesnaje: this.responseMessage + complementMessage },
            });
          };
        } else {
          this.visibilityTable(true)
          this.dialog.open(DialogComponent, {
            data: { mesnaje: "Se presento un error al realizar la consulta: " + response.mensaje },
          });
        }
      }, (errorResponse: any) => {
        this.visibilityTable(true)
        this.dialog.open(DialogComponent, {
          data: { mesnaje: "Se presento un error al realizar la consulta: " + errorResponse },
        });
      });
    } else {

      var divElement = document.getElementById('idReportTableau');
      if (divElement != null) {
        var vizElement = divElement.getElementsByTagName('object')[0];
        vizElement.style.width = '100%';
        vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
        var scriptElement = document.createElement('script');
        scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
        if (vizElement.parentNode != null) {
          vizElement.parentNode.insertBefore(scriptElement, vizElement);
        }
      }
    }

  }

  /**
   * Opcion de ver u ocultar tabla
   */
  public visibilityTable(state: boolean = false, limpiaData: boolean = true) {
    this.tableView = state;
    this.report = !state;

    if(limpiaData){
      this.dataSource = new MatTableDataSource<vehiculoModel>();
    }

    var idPaginador = document.getElementById('idPaginator');
    if (idPaginador != null) {
      idPaginador.style.visibility = "visible";
    }
  }

  /**
   * Opcion de ver u ocultar reporte
   */
  public visibilityReport(state: boolean = false) {
    this.report = state;
    this.tableView = !state;
    var idPaginador = document.getElementById('idPaginator');
    if (idPaginador != null) {
      idPaginador.style.visibility = "hidden";
    }
  }
}
