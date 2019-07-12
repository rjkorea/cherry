import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { EntranceLoaderComponent } from './entrance-loader/entrance-loader.component';
import { SkeletonComponent } from './skeleton/skeleton.component';


@NgModule({
  imports: [CommonModule],
  declarations: [ LoaderComponent, ErrorMessageComponent, EntranceLoaderComponent, SkeletonComponent ],
  exports: [ LoaderComponent, ErrorMessageComponent, EntranceLoaderComponent, SkeletonComponent ]
})
export class SharedComponentsModule {}
