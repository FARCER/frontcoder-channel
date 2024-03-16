import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrelloComponent, TrelloListComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

const routes: Routes = [{
  path: '',
  component: TrelloComponent
},];

@NgModule({
  declarations: [TrelloComponent,TrelloListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption,
    MatInput,
    MatButton
  ]
})
export class TrelloModule { }
