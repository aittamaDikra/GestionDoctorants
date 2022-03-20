import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFormationSuivie } from '../formation-suivie.model';
import { FormationSuivieService } from '../service/formation-suivie.service';
import { FormationSuivieDeleteDialogComponent } from '../delete/formation-suivie-delete-dialog.component';

@Component({
  selector: 'jhi-formation-suivie',
  templateUrl: './formation-suivie.component.html',
})
export class FormationSuivieComponent implements OnInit {
  formationSuivies?: IFormationSuivie[];
  isLoading = false;

  constructor(protected formationSuivieService: FormationSuivieService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.formationSuivieService.query().subscribe({
      next: (res: HttpResponse<IFormationSuivie[]>) => {
        this.isLoading = false;
        this.formationSuivies = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IFormationSuivie): number {
    return item.id!;
  }

  delete(formationSuivie: IFormationSuivie): void {
    const modalRef = this.modalService.open(FormationSuivieDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.formationSuivie = formationSuivie;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
