import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ReinscriptionComponent } from './list/reinscription.component';
import { ReinscriptionDetailComponent } from './detail/reinscription-detail.component';
import { ReinscriptionUpdateComponent } from './update/reinscription-update.component';
import { ReinscriptionDeleteDialogComponent } from './delete/reinscription-delete-dialog.component';
import { ReinscriptionRoutingModule } from './route/reinscription-routing.module';

@NgModule({
  imports: [SharedModule, ReinscriptionRoutingModule],
  declarations: [ReinscriptionComponent, ReinscriptionDetailComponent, ReinscriptionUpdateComponent, ReinscriptionDeleteDialogComponent],
  entryComponents: [ReinscriptionDeleteDialogComponent],
})
export class ReinscriptionModule {}
