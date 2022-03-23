import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IInformation } from '../information.model';
import { InformationService } from '../service/information.service';

@Component({
  selector: 'jhi-information',
  templateUrl: './information.component.html',
})
export class InformationComponent implements OnInit {
  information?: IInformation[];
  isLoading = false;

  constructor(protected informationService: InformationService) {}

  loadAll(): void {
    this.isLoading = true;

    this.informationService.query().subscribe({
      next: (res: HttpResponse<IInformation[]>) => {
        this.isLoading = false;
        this.information = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IInformation): number {
    return item.id!;
  }
}
