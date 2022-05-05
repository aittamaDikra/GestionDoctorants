import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InformationComponent } from './list/information.component';
import { InformationDetailComponent } from './detail/information-detail.component';
import { InformationRoutingModule } from './route/information-routing.module';
import {ChartsModule} from "ng2-charts";

@NgModule({
    imports: [SharedModule, InformationRoutingModule, ChartsModule],
    declarations: [InformationComponent, InformationDetailComponent],
    exports: [
        InformationComponent
    ]
})
export class InformationModule {}
