import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FormationDoctorantComponent } from './list/formation-doctorant.component';
import { FormationDoctorantDetailComponent } from './detail/formation-doctorant-detail.component';
import { FormationDoctorantUpdateComponent } from './update/formation-doctorant-update.component';
import { FormationDoctorantDeleteDialogComponent } from './delete/formation-doctorant-delete-dialog.component';
import { FormationDoctorantRoutingModule } from './route/formation-doctorant-routing.module';

@NgModule({
    imports: [SharedModule, FormationDoctorantRoutingModule],
    declarations: [
        FormationDoctorantComponent,
        FormationDoctorantDetailComponent,
        FormationDoctorantUpdateComponent,
        FormationDoctorantDeleteDialogComponent,
    ],
    entryComponents: [FormationDoctorantDeleteDialogComponent],
  exports: [
    FormationDoctorantComponent,
    FormationDoctorantUpdateComponent
  ]
})
export class FormationDoctorantModule {}
