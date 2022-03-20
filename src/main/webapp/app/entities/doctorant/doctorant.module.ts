import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DoctorantComponent } from './list/doctorant.component';
import { DoctorantDetailComponent } from './detail/doctorant-detail.component';
import { DoctorantUpdateComponent } from './update/doctorant-update.component';
import { DoctorantDeleteDialogComponent } from './delete/doctorant-delete-dialog.component';
import { DoctorantRoutingModule } from './route/doctorant-routing.module';

@NgModule({
  imports: [SharedModule, DoctorantRoutingModule],
  declarations: [DoctorantComponent, DoctorantDetailComponent, DoctorantUpdateComponent, DoctorantDeleteDialogComponent],
  entryComponents: [DoctorantDeleteDialogComponent],
})
export class DoctorantModule {}
