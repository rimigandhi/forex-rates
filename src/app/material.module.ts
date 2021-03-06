import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatPaginatorModule } from "@angular/material/paginator";

@NgModule({
  imports: [MatToolbarModule,MatIconModule,MatFormFieldModule,MatSelectModule,MatButtonModule,MatInputModule,MatListModule,MatChipsModule,MatTableModule, MatProgressSpinnerModule,MatSnackBarModule,MatPaginatorModule],
  exports: [MatToolbarModule,MatIconModule,MatFormFieldModule,MatSelectModule,MatButtonModule,MatInputModule,MatListModule,MatChipsModule,MatTableModule,MatProgressSpinnerModule,MatSnackBarModule,MatPaginatorModule]
})
export class MaterialModule{

}