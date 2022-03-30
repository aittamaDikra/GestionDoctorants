import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { IProfile } from '../profile.model';
import { ProfileService } from '../service/profile.service';
import { ProfileDeleteDialogComponent } from '../delete/profile-delete-dialog.component';
import {AccountService} from "../../../core/auth/account.service";
import {Account} from "../../../core/auth/account.model";
import {mergeMap} from "rxjs/operators";
import {Doctorant, IDoctorant} from "../../doctorant/doctorant.model";
import {Observable, of} from "rxjs";
import {DoctorantService} from "../../doctorant/service/doctorant.service";
import {IFormation} from "../../formation/formation.model";
import {FormationService} from "../../formation/service/formation.service";
import {FormationDoctorant, IFormationDoctorant} from "../../formation-doctorant/formation-doctorant.model";
import {FormationDoctorantService} from "../../formation-doctorant/service/formation-doctorant.service";
import {ILaboratoire} from "../../laboratoire/laboratoire.model";
import {Bac, IBac} from "../../bac/bac.model";
import {BacService} from "../../bac/service/bac.service";

@Component({
  selector: 'jhi-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.scss'],
})
export class ProfileComponent implements OnInit {
  isLoading = false;
  account!: Account;
  doctorant!:IDoctorant;
  formations!: IFormation[];
  formationDoctorant!:FormationDoctorant[];
  bac!:IBac;
  constructor(public _sanitizer: DomSanitizer, protected bacService: BacService, protected formationDoctorantService:FormationDoctorantService, protected formationService: FormationService, protected serviceDoctorant: DoctorantService, protected modalService: NgbModal, private accountService: AccountService) {}

  loadAll(): void {
    this.isLoading = true;
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });
    this.serviceDoctorant.findActiveUser().pipe(
      mergeMap((doctorant: HttpResponse<Doctorant>) => {
        if (doctorant.body) {
          return of(doctorant.body);
        } else {
          return of(new Doctorant());
        }
      })
    ).subscribe(doctorant=>{
        this.doctorant=doctorant;
    });
    this.formationService.getformations().subscribe({
      next: (res: HttpResponse<IFormation[]>) => {
        this.isLoading = false;
        this.formations = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
    this.formationDoctorantService.findformation().subscribe({
      next: (res: HttpResponse<IFormationDoctorant[]>) => {
        this.isLoading = false;
        this.formationDoctorant = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });

  }

  ngOnInit(): void {
    this.loadAll();
    this.up().subscribe((value:IBac)=>this.bac=value);
  }



  up(): Observable<IBac> | Observable<never> {
    return this.bacService.findActive().pipe(
      mergeMap((bac: HttpResponse<Bac>) => {
        if (bac.body) {
          return of(bac.body);
        } else {
          return of(new Bac());
        }
      })
    );
  }
}
