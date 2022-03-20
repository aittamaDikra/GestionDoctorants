import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEtablissement } from '../etablissement.model';
import { EtablissementService } from '../service/etablissement.service';
import { EtablissementDeleteDialogComponent } from '../delete/etablissement-delete-dialog.component';

@Component({
  selector: 'jhi-etablissement',
  templateUrl: './etablissement.component.html',
})
export class EtablissementComponent implements OnInit {
  etablissements?: IEtablissement[];
  isLoading = false;

  constructor(protected etablissementService: EtablissementService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.etablissementService.query().subscribe({
      next: (res: HttpResponse<IEtablissement[]>) => {
        this.isLoading = false;
        this.etablissements = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IEtablissement): number {
    return item.id!;
  }

  delete(etablissement: IEtablissement): void {
    const modalRef = this.modalService.open(EtablissementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.etablissement = etablissement;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
