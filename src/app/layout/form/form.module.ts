import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule as Ng2Forms } from '@angular/forms';
import { PageHeaderModule } from './../../shared';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';

@NgModule({
    imports: [CommonModule, FormRoutingModule, PageHeaderModule],
    declarations: [FormComponent]
})
export class FormModule {}
