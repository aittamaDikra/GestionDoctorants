import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FormationSuivieDetailComponent } from './formation-suivie-detail.component';

describe('FormationSuivie Management Detail Component', () => {
  let comp: FormationSuivieDetailComponent;
  let fixture: ComponentFixture<FormationSuivieDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormationSuivieDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ formationSuivie: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(FormationSuivieDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FormationSuivieDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load formationSuivie on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.formationSuivie).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
