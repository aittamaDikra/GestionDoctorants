import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDoctorant } from '../doctorant.model';
import { DataUtils } from 'app/core/util/data-util.service';
import {Account} from "../../../core/auth/account.model";
import {IFormation} from "../../formation/formation.model";
import {FormationDoctorant, IFormationDoctorant} from "../../formation-doctorant/formation-doctorant.model";
import {Bac, IBac} from "../../bac/bac.model";
import {HttpResponse} from "@angular/common/http";
import {BacService} from "../../bac/service/bac.service";
import {FormationDoctorantService} from "../../formation-doctorant/service/formation-doctorant.service";
import {FormationService} from "../../formation/service/formation.service";
import {DoctorantService} from "../service/doctorant.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AccountService} from "../../../core/auth/account.service";
import {Observable, of} from "rxjs";
import {mergeMap} from "rxjs/operators";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {UserManagementService} from "../../../admin/user-management/service/user-management.service";

@Component({
  selector: 'jhi-doctorant-detail',
  templateUrl: './doctorant-detail.component.html',
  styleUrls: ['./profile.scss'],
})
export class DoctorantDetailComponent implements OnInit {
  doctorant!: IDoctorant ;
  formations!: IFormation[];
  formationDoctorant!:FormationDoctorant[];
  bac!:IBac;
  isLoading = false;
  constructor(private userService: UserManagementService,public _sanitizer: DomSanitizer,protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute, protected bacService: BacService, protected formationDoctorantService:FormationDoctorantService, protected formationService: FormationService, protected serviceDoctorant: DoctorantService, protected modalService: NgbModal, private accountService: AccountService) {}

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(({ doctorant }) => {
      this.doctorant = doctorant;

      this.formationDoctorantService.findByDoctorant(doctorant.id).subscribe({
        next: (res: HttpResponse<IFormationDoctorant[]>) => {
          this.isLoading = true;
          this.formationDoctorant = res.body ?? [];
        },
        error: () => {
          this.isLoading = false;
        },
      });
      this.formationService.findbyDoctorant(doctorant.id).subscribe({
        next: (res: HttpResponse<IFormation[]>) => {
          this.isLoading = false;
          this.formations = res.body ?? [];
        },
        error: () => {
          this.isLoading = false;
        },
      });
      this.up(doctorant.id).subscribe((value:IBac)=>this.bac=value);

    });

  }

  up(id:number): Observable<IBac> | Observable<never> {
    return this.bacService.findBacDoctorant(id).pipe(
      mergeMap((bac: HttpResponse<Bac>) => {
        if (bac.body) {
          return of(bac.body);
        } else {
          return of(new Bac());
        }
      })
    );
  }


  decode2(base64String: string):SafeResourceUrl{
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + base64String);
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
