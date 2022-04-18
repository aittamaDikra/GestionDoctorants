import {Component, Input, OnInit} from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IInformation } from '../information.model';
import { InformationService } from '../service/information.service';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {DataUtils} from "../../../core/util/data-util.service";
import {IDoctorant} from "../../doctorant/doctorant.model";
import {IFormation} from "../../formation/formation.model";
import {FormationDoctorant} from "../../formation-doctorant/formation-doctorant.model";
import {IBac} from "../../bac/bac.model";

@Component({
  selector: 'jhi-information',
  templateUrl: './information.component.html',
  styleUrls: ['./profile.scss'],
})
export class InformationComponent implements OnInit {
  information?: IInformation[];
  isLoading = false;
  @Input() doctorant!: IDoctorant ;
  @Input() formations!: IFormation[];
  @Input() formationDoctorant!:FormationDoctorant[];
  @Input() bac!:IBac;
  constructor(protected dataUtils: DataUtils,public _sanitizer: DomSanitizer,protected informationService: InformationService) {}

  loadAll(): void {
    this.isLoading = true;

    this.informationService.query().subscribe({
      next: (res: HttpResponse<IInformation[]>) => {
        this.isLoading = false;
        this.information = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
  decode(base64String: string):SafeResourceUrl{
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + base64String);
  }
  ngOnInit(): void {
    this.loadAll();
  }
  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  trackId(index: number, item: IInformation): number {
    return item.id!;
  }
}
