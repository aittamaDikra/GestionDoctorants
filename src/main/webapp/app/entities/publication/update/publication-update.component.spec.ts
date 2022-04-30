import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PublicationService } from '../service/publication.service';
import { IPublication, Publication } from '../publication.model';
import { IExtraUser } from 'app/entities/extra-user/extra-user.model';
import { ExtraUserService } from 'app/entities/extra-user/service/extra-user.service';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

import { PublicationUpdateComponent } from './publication-update.component';

describe('Publication Management Update Component', () => {
  let comp: PublicationUpdateComponent;
  let fixture: ComponentFixture<PublicationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let publicationService: PublicationService;
  let extraUserService: ExtraUserService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PublicationUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PublicationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PublicationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    publicationService = TestBed.inject(PublicationService);
    extraUserService = TestBed.inject(ExtraUserService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ExtraUser query and add missing value', () => {
      const publication: IPublication = { id: 456 };
      const extraUser: IExtraUser = { id: 91620 };
      publication.extraUser = extraUser;

      const extraUserCollection: IExtraUser[] = [{ id: 49791 }];
      jest.spyOn(extraUserService, 'query').mockReturnValue(of(new HttpResponse({ body: extraUserCollection })));
      const additionalExtraUsers = [extraUser];
      const expectedCollection: IExtraUser[] = [...additionalExtraUsers, ...extraUserCollection];
      jest.spyOn(extraUserService, 'addExtraUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ publication });
      comp.ngOnInit();

      expect(extraUserService.query).toHaveBeenCalled();
      expect(extraUserService.addExtraUserToCollectionIfMissing).toHaveBeenCalledWith(extraUserCollection, ...additionalExtraUsers);
      expect(comp.extraUsersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call User query and add missing value', () => {
      const publication: IPublication = { id: 456 };
      const chercheurs: IUser[] = [{ id: 46332 }];
      publication.chercheurs = chercheurs;

      const userCollection: IUser[] = [{ id: 9629 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [...chercheurs];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ publication });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const publication: IPublication = { id: 456 };
      const extraUser: IExtraUser = { id: 58747 };
      publication.extraUser = extraUser;
      const chercheurs: IUser = { id: 17160 };
      publication.chercheurs = [chercheurs];

      activatedRoute.data = of({ publication });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(publication));
      expect(comp.extraUsersSharedCollection).toContain(extraUser);
      expect(comp.usersSharedCollection).toContain(chercheurs);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Publication>>();
      const publication = { id: 123 };
      jest.spyOn(publicationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ publication });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: publication }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(publicationService.update).toHaveBeenCalledWith(publication);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Publication>>();
      const publication = new Publication();
      jest.spyOn(publicationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ publication });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: publication }));
      saveSubject.complete();

      // THEN
      expect(publicationService.create).toHaveBeenCalledWith(publication);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Publication>>();
      const publication = { id: 123 };
      jest.spyOn(publicationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ publication });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(publicationService.update).toHaveBeenCalledWith(publication);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackExtraUserById', () => {
      it('Should return tracked ExtraUser primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackExtraUserById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackUserById', () => {
      it('Should return tracked User primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUserById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedUser', () => {
      it('Should return option if no User is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedUser(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected User for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedUser(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this User is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedUser(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
