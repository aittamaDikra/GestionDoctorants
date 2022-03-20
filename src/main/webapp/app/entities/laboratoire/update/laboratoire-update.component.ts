import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ILaboratoire, Laboratoire } from '../laboratoire.model';
import { LaboratoireService } from '../service/laboratoire.service';

@Component({
  selector: 'jhi-laboratoire-update',
  templateUrl: './laboratoire-update.component.html',
})
export class LaboratoireUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    abreviation: [null, [Validators.required]],
  });

  constructor(protected laboratoireService: LaboratoireService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ laboratoire }) => {
      this.updateForm(laboratoire);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const laboratoire = this.createFromForm();
    if (laboratoire.id !== undefined) {
      this.subscribeToSaveResponse(this.laboratoireService.update(laboratoire));
    } else {
      this.subscribeToSaveResponse(this.laboratoireService.create(laboratoire));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILaboratoire>>): void {
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

  protected updateForm(laboratoire: ILaboratoire): void {
    this.editForm.patchValue({
      id: laboratoire.id,
      nom: laboratoire.nom,
      abreviation: laboratoire.abreviation,
    });
  }

  protected createFromForm(): ILaboratoire {
    return {
      ...new Laboratoire(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      abreviation: this.editForm.get(['abreviation'])!.value,
    };
  }
}
