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
import {IPublication} from "../../publication/publication.model";
import {CountPub} from "../../ChartsModels/CountPub";
import {CountPubByType} from "../../ChartsModels/CountPubByType";

@Component({
  selector: 'jhi-information',
  templateUrl: './information.component.html',
  styleUrls: ['./profile.scss'],
})
export class InformationComponent implements OnInit {
  information?: IInformation[];
  isLoading = false;
  isShown!: boolean;
  map = new Map();
  @Input() doctorant!: IDoctorant ;
  @Input() formations!: IFormation[];
  @Input() formationDoctorant!:FormationDoctorant[];
  @Input() bac!:IBac;
  @Input() publications?: IPublication[];
  @Input() countPub!:CountPub[];
  @Input() countPubByType!:CountPubByType[];
  constructor(protected dataUtils: DataUtils,public _sanitizer: DomSanitizer,protected informationService: InformationService) {}

  loadAll(): void {
    this.isLoading = true;

  }
  decode(base64String: string):SafeResourceUrl{
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + base64String);
  }
  ngOnInit(): void {
    this.loadAll();
    this.isShown=false;

  }
  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  trackId(index: number, item: IInformation): number {
    return item.id!;
  }

  toggleShow():void {
    this.isShown = ! this.isShown;
  }
  toggleShow2(f:any):void {
    if(this.map.has(f)){
      this.map.set(f,!this.map.get(f))
    }else{
      this.map.set(f,true)
    }
  }

}
