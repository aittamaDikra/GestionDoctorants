import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFormationSuivie } from '../formation-suivie.model';

@Component({
  selector: 'jhi-formation-suivie-detail',
  templateUrl: './formation-suivie-detail.component.html',
})
export class FormationSuivieDetailComponent implements OnInit {
  formationSuivie: IFormationSuivie | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formationSuivie }) => {
      this.formationSuivie = formationSuivie;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
