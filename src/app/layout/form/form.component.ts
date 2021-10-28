import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

class Historia{
    constructor(
        public nombrescompleto: string = '',
        public direccion: string = '',
        public ci: string = '',
        public tel: string = ''
    ) {}
}

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class FormComponent implements OnInit {
    historias: Historia[] = [];
  // Mantiene el modelo de registro
  regModel: Historia;
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
    this.historias.push(new Historia('Jorge Aguirre', 'Calle Colon','1261079','6243595'));
    // this.historias.push(new Historia('Belen Campana', 'Av Americas','1261080','72442328'));
    // this.historias.push(new Historia('Sergio Eguivar', 'Calle Hoyos', '6668930','72404217'));
  }
    
  ngOnInit() {}

  // Este método se asocia a New Button.
  onNew() {
    // Inicie un nuevo registro.
    this.regModel = new Historia();
    // Cambie submitType a 'Guardar'.
    this.submitType = 'Guardar';
    // mostrar la sección de entrada de registro.
    this.showNew = true;
  }

  // Este método se asocia al botón Guardar.
  onSave() {
    if (this.submitType === 'Guardar') {
      // Empuje el objeto del modelo de registro en la lista de registro.
      this.historias.push(this.regModel);
    } else {
      // Actualice los valores de las propiedades existentes según el modelo.
      this.historias[this.selectedRow].nombrescompleto = this.regModel.nombrescompleto;
      this.historias[this.selectedRow].direccion = this.regModel.direccion;
      this.historias[this.selectedRow].ci = this.regModel.ci;
      this.historias[this.selectedRow].tel = this.regModel.tel;
    }
    // Ocultar la sección de entrada de registro.
    this.showNew = false;
  }

  // Este método se asocia al botón Editar.
  onEdit(index: number) {
    // Asignar índice de fila de tabla seleccionado.
    this.selectedRow = index;
    // Inicie un nuevo registro.
    this.regModel = new Historia();
    // Recupere el registro seleccionado de la lista y asígnelo al modelo.
    this.regModel = Object.assign({}, this.historias[this.selectedRow]);
    // Cambie submitType a Update.
    this.submitType = 'Actualizar';
    // Muestra la sección de entrada de registro.
    this.showNew = true;
  }

  // Este método se asocia al botón Eliminar.
  onDelete(index: number) {
    // Elimine la entrada de registro correspondiente de la lista.
    this.historias.splice(index, 1);
  }

  // Este método se asocia al botón Cancelar.
  onCancel() {
    // Ocultar la sección de entrada de registro.
    this.showNew = false;
  }

}
