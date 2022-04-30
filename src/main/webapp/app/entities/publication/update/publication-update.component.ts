import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPublication, Publication } from '../publication.model';
import { PublicationService } from '../service/publication.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IExtraUser } from 'app/entities/extra-user/extra-user.model';
import { ExtraUserService } from 'app/entities/extra-user/service/extra-user.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

@Component({
  selector: 'jhi-publication-update',
  templateUrl: './publication-update.component.html',
})
export class PublicationUpdateComponent implements OnInit {
  isSaving = false;

  extraUsersSharedCollection: IExtraUser[] = [];
  usersSharedCollection: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    titre: [null, [Validators.required]],
    date: [null, [Validators.required]],
    description: [null, [Validators.required]],
    type: [],
    article: [],
    articleContentType: [],
    extraUser: [],
    chercheurs: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected publicationService: PublicationService,
    protected extraUserService: ExtraUserService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ publication }) => {
      this.updateForm(publication);

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('doctorantApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const publication = this.createFromForm();
    if (publication.id !== undefined) {
      this.subscribeToSaveResponse(this.publicationService.update(publication));
    } else {
      this.subscribeToSaveResponse(this.publicationService.create(publication));
    }
  }

  trackExtraUserById(index: number, item: IExtraUser): number {
    return item.id!;
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  getSelectedUser(option: IUser, selectedVals?: IUser[]): IUser {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPublication>>): void {
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

  protected updateForm(publication: IPublication): void {
    this.editForm.patchValue({
      id: publication.id,
      titre: publication.titre,
      date: publication.date,
      description: publication.description,
      type: publication.type,
      article: publication.article,
      articleContentType: publication.articleContentType,
      extraUser: publication.extraUser,
      chercheurs: publication.chercheurs,
    });

    this.extraUsersSharedCollection = this.extraUserService.addExtraUserToCollectionIfMissing(
      this.extraUsersSharedCollection,
      publication.extraUser
    );
    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(
      this.usersSharedCollection,
      ...(publication.chercheurs ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.extraUserService
      .query()
      .pipe(map((res: HttpResponse<IExtraUser[]>) => res.body ?? []))
      .pipe(
        map((extraUsers: IExtraUser[]) =>
          this.extraUserService.addExtraUserToCollectionIfMissing(extraUsers, this.editForm.get('extraUser')!.value)
        )
      )
      .subscribe((extraUsers: IExtraUser[]) => (this.extraUsersSharedCollection = extraUsers));

    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(
        map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, ...(this.editForm.get('chercheurs')!.value ?? [])))
      )
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }

  protected createFromForm(): IPublication {
    return {
      ...new Publication(),
      id: this.editForm.get(['id'])!.value,
      titre: this.editForm.get(['titre'])!.value,
      date: this.editForm.get(['date'])!.value,
      description: this.editForm.get(['description'])!.value,
      type: this.editForm.get(['type'])!.value,
      articleContentType: this.editForm.get(['articleContentType'])!.value,
      article: this.editForm.get(['article'])!.value,
      extraUser: this.editForm.get(['extraUser'])!.value,
      chercheurs: this.editForm.get(['chercheurs'])!.value,
    };
  }
}
