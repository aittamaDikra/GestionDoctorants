import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDoctorant } from '../doctorant.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-doctorant-detail',
  templateUrl: './doctorant-detail.component.html',
})
export class DoctorantDetailComponent implements OnInit {
  doctorant: IDoctorant | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doctorant }) => {
      this.doctorant = doctorant;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
