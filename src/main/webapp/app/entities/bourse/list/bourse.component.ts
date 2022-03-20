import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBourse } from '../bourse.model';
import { BourseService } from '../service/bourse.service';
import { BourseDeleteDialogComponent } from '../delete/bourse-delete-dialog.component';

@Component({
  selector: 'jhi-bourse',
  templateUrl: './bourse.component.html',
})
export class BourseComponent implements OnInit {
  bourses?: IBourse[];
  isLoading = false;

  constructor(protected bourseService: BourseService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.bourseService.query().subscribe({
      next: (res: HttpResponse<IBourse[]>) => {
        this.isLoading = false;
        this.bourses = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IBourse): number {
    return item.id!;
  }

  delete(bourse: IBourse): void {
    const modalRef = this.modalService.open(BourseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.bourse = bourse;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
