import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IBourse, Bourse } from '../bourse.model';
import { BourseService } from '../service/bourse.service';
import { IDoctorant } from 'app/entities/doctorant/doctorant.model';
import { DoctorantService } from 'app/entities/doctorant/service/doctorant.service';

@Component({
  selector: 'jhi-bourse-update',
  templateUrl: './bourse-update.component.html',
})
export class BourseUpdateComponent implements OnInit {
  isSaving = false;

  doctorantsCollection: IDoctorant[] = [];

  editForm = this.fb.group({
    id: [],
    somme: [],
    doctorant: [],
  });

  constructor(
    protected bourseService: BourseService,
    protected doctorantService: DoctorantService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bourse }) => {
      this.updateForm(bourse);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bourse = this.createFromForm();
    if (bourse.id !== undefined) {
      this.subscribeToSaveResponse(this.bourseService.update(bourse));
    } else {
      this.subscribeToSaveResponse(this.bourseService.create(bourse));
    }
  }

  trackDoctorantById(index: number, item: IDoctorant): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBourse>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(bourse: IBourse): void {
    this.editForm.patchValue({
      id: bourse.id,
      somme: bourse.somme,
      doctorant: bourse.doctorant,
    });

    this.doctorantsCollection = this.doctorantService.addDoctorantToCollectionIfMissing(this.doctorantsCollection, bourse.doctorant);
  }

  protected loadRelationshipsOptions(): void {
    this.doctorantService
      .query({ filter: 'bourse-is-null' })
      .pipe(map((res: HttpResponse<IDoctorant[]>) => res.body ?? []))
      .pipe(
        map((doctorants: IDoctorant[]) =>
          this.doctorantService.addDoctorantToCollectionIfMissing(doctorants, this.editForm.get('doctorant')!.value)
        )
      )
      .subscribe((doctorants: IDoctorant[]) => (this.doctorantsCollection = doctorants));
  }

  protected createFromForm(): IBourse {
    return {
      ...new Bourse(),
      id: this.editForm.get(['id'])!.value,
      somme: this.editForm.get(['somme'])!.value,
      doctorant: this.editForm.get(['doctorant'])!.value,
    };
  }
}
