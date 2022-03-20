import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PublicationComponent } from './list/publication.component';
import { PublicationDetailComponent } from './detail/publication-detail.component';
import { PublicationUpdateComponent } from './update/publication-update.component';
import { PublicationDeleteDialogComponent } from './delete/publication-delete-dialog.component';
import { PublicationRoutingModule } from './route/publication-routing.module';

@NgModule({
  imports: [SharedModule, PublicationRoutingModule],
  declarations: [PublicationComponent, PublicationDetailComponent, PublicationUpdateComponent, PublicationDeleteDialogComponent],
  entryComponents: [PublicationDeleteDialogComponent],
})
export class PublicationModule {}
