import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InformationComponent } from './list/information.component';
import { InformationDetailComponent } from './detail/information-detail.component';
import { InformationRoutingModule } from './route/information-routing.module';

@NgModule({
  imports: [SharedModule, InformationRoutingModule],
  declarations: [InformationComponent, InformationDetailComponent],
})
export class InformationModule {}
