import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DoctorantComponent } from './list/doctorant.component';
import { DoctorantDetailComponent } from './detail/doctorant-detail.component';
import { DoctorantUpdateComponent } from './update/doctorant-update.component';
import { DoctorantDeleteDialogComponent } from './delete/doctorant-delete-dialog.component';
import { DoctorantRoutingModule } from './route/doctorant-routing.module';
import {InformationModule} from "../information/information.module";
import {DataTablesModule} from "angular-datatables";

@NgModule({
    imports: [SharedModule, DoctorantRoutingModule, InformationModule, DataTablesModule],
  declarations: [DoctorantComponent, DoctorantDetailComponent, DoctorantUpdateComponent, DoctorantDeleteDialogComponent],
  entryComponents: [DoctorantDeleteDialogComponent],
})
export class DoctorantModule {}
