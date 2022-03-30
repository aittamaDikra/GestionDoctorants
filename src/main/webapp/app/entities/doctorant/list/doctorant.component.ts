import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDoctorant } from '../doctorant.model';
import { DoctorantService } from '../service/doctorant.service';
import { DoctorantDeleteDialogComponent } from '../delete/doctorant-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-doctorant',
  templateUrl: './doctorant.component.html',
})
export class DoctorantComponent implements OnInit {
  doctorants?: IDoctorant[];
  isLoading = false;

  constructor(protected doctorantService: DoctorantService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.doctorantService.query().subscribe({
      next: (res: HttpResponse<IDoctorant[]>) => {
        this.isLoading = false;
        this.doctorants = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IDoctorant): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }



  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(doctorant: IDoctorant): void {
    const modalRef = this.modalService.open(DoctorantDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.doctorant = doctorant;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
