import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

class Registration{
    constructor(
        public nombres: string ='',
        public apellidos: string ='',
        public email: string = '',
        public password: string = '',
        // public country: string = 'Select country'
    ) {}
}

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {
    // Mantiene lista de inscripciones
  registrations: Registration[] = [];
  // Mantiene el modelo de registro
  regModel: Registration;
  // Mantiene el estado de visualización del formulario de registro. Por defecto será falso.
  showNew: Boolean = false;
  // Será 'Guardar' o 'Actualizar' según la operación.
  submitType: string = 'Guardar';
  // Mantiene el índice de filas de la tabla según la selección.
  selectedRow: number;
  // Mantiene Matriz de países.
  //countries: string[] = ['US', 'UK', 'India', 'UAE'];
  constructor() {
    // Agregue datos de registro predeterminados.
    this.registrations.push(new Registration('Daniel', 'Magne','isired@gmail.com', 'isiret123'));
    this.registrations.push(new Registration('Mohamed', 'Ali','box@gmail.com', 'box245'));
    this.registrations.push(new Registration('Nirmal', 'Kumar', 'nirmal@gmail.com', 'nirmal123'));
  }
    
  ngOnInit() {}

  // Este método se asocia a New Button.
  onNew() {
    // Inicie un nuevo registro.
    this.regModel = new Registration();
    // Cambie submitType a 'Guardar'.
    this.submitType = 'Guardar';
    // mostrar la sección de entrada de registro.
    this.showNew = true;
  }

  // Este método se asocia al botón Guardar.
  onSave() {
    if (this.submitType === 'Guardar') {
      // Empuje el objeto del modelo de registro en la lista de registro.
      this.registrations.push(this.regModel);
    } else {
      // Actualice los valores de las propiedades existentes según el modelo.
      this.registrations[this.selectedRow].nombres = this.regModel.nombres;
      this.registrations[this.selectedRow].apellidos = this.regModel.apellidos;
      this.registrations[this.selectedRow].email = this.regModel.email;
      this.registrations[this.selectedRow].password = this.regModel.password;
    }
    // Ocultar la sección de entrada de registro.
    this.showNew = false;
  }

  // Este método se asocia al botón Editar.
  onEdit(index: number) {
    // Asignar índice de fila de tabla seleccionado.
    this.selectedRow = index;
    // Inicie un nuevo registro.
    this.regModel = new Registration();
    // Recupere el registro seleccionado de la lista y asígnelo al modelo.
    this.regModel = Object.assign({}, this.registrations[this.selectedRow]);
    // Cambie submitType a Update.
    this.submitType = 'Actualizar';
    // Muestra la sección de entrada de registro.
    this.showNew = true;
  }

  // Este método se asocia al botón Eliminar.
  onDelete(index: number) {
    // Elimine la entrada de registro correspondiente de la lista.
    this.registrations.splice(index, 1);
  }

  // Este método se asocia al botón Cancelar.
  onCancel() {
    // Ocultar la sección de entrada de registro.
    this.showNew = false;
  }

  // Este método asociado al cambio de selección desplegable de Bootstrap.
//   onChangeCountry(country: string) {
//     // Assign corresponding selected country to model.
//     this.regModel.country = country;
//   }
}
