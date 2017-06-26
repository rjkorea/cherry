import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { EntranceLoaderComponent } from './entrance-loader/entrance-loader.component';


@NgModule({
  imports: [CommonModule],
  declarations: [ LoaderComponent, ErrorMessageComponent, EntranceLoaderComponent ],
  exports: [ LoaderComponent, ErrorMessageComponent, EntranceLoaderComponent ]
})
export class SharedComponentsModule {}
