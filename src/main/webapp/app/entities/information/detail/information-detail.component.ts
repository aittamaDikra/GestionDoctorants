import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInformation } from '../information.model';
import {PublicationService} from "../../publication/service/publication.service";
import {DoctorantService} from "../../doctorant/service/doctorant.service";
import {CountPub} from "../../ChartsModels/CountPub";
import {CountPubByType} from "../../ChartsModels/CountPubByType";
import {CountDoc} from "../../ChartsModels/CountDoc";
import {DoctorantSalariee} from "../../ChartsModels/DoctorantSalariee";
import {HttpResponse} from "@angular/common/http";
import {IPublication} from "../../publication/publication.model";

@Component({
  selector: 'jhi-information-detail',
  templateUrl: './information-detail.component.html',
})
export class InformationDetailComponent implements OnInit {
  information: IInformation | null = null;
  countPub!:CountPub[];
  countPubByType!:CountPubByType[];
  countDoc!:CountDoc[];
  doctorantSalariee!:DoctorantSalariee[];
  isLoading = false;

  constructor(protected activatedRoute: ActivatedRoute,protected publicationService: PublicationService,protected doctorantService: DoctorantService) {}

  ngOnInit(): void {
    this.doctorantService.countByAnnee().subscribe({
      next: (res: HttpResponse<CountDoc[]>) => {
        this.isLoading = true;
        this.countDoc = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
    this.doctorantService.countSalariee().subscribe({
      next: (res: HttpResponse<DoctorantSalariee[]>) => {
        this.isLoading = true;
        this.doctorantSalariee = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
    this.publicationService.countAll().subscribe({
      next: (res: HttpResponse<CountPub[]>) => {
        this.isLoading = false;
        this.countPub = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
    this.publicationService.countTypeAll().subscribe({
      next: (res: HttpResponse<CountPubByType[]>) => {
        this.isLoading = true;
        this.countPubByType = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });


  }

  previousState(): void {
    window.history.back();
  }
}
