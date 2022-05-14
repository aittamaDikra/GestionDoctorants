import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { IInformation } from '../information.model';
import {PublicationService} from "../../publication/service/publication.service";
import {DoctorantService} from "../../doctorant/service/doctorant.service";
import {CountPub} from "../../ChartsModels/CountPub";
import {CountPubByType} from "../../ChartsModels/CountPubByType";
import {CountDoc} from "../../ChartsModels/CountDoc";
import {DoctorantSalariee} from "../../ChartsModels/DoctorantSalariee";
import {HttpResponse} from "@angular/common/http";
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Color, Label, SingleDataSet} from "ng2-charts";
import {Account} from "../../../core/auth/account.model";
import {takeUntil} from "rxjs/operators";
import {AccountService} from "../../../core/auth/account.service";
import {Subject} from "rxjs";
import {DoctorantSalariee2} from "../../ChartsModels/DoctorantSalariee2";
import {CountPubByTypeAnnee} from "../../ChartsModels/CountPubByTypeAnnee";
import {CountChercheurPays} from "../../ChartsModels/CountChercheurPays";

@Component({
  selector: 'jhi-information-detail',
  templateUrl: './information-detail.component.html',
})
export class InformationDetailComponent implements OnInit {
  account: Account | null = null;
  information: IInformation | null = null;
  countPub!:CountPub[];
  countPubByType!:CountPubByType[];
  countDoc!:CountDoc[];
  doctorantSalariee!:DoctorantSalariee[];
  doctorantSalariee2!:DoctorantSalariee2[];
  years:Label[]  =[];
  years2:Label[]  =[];
  type:Label[]  =[];
  counts:number[] =[];
  anneee!:number;
  counts2:number[] =[];
  counts3:number[] =[];
  yearspub:Label[]  =[];
  countspub1:number[] =[];countspub2:number[] =[];countspub3:number[] =[];
  typepub:string[]  =[];
  isLoading = false;
  countChercheurPays!:CountChercheurPays[];
  countstype1 : number[] =[];
  countstype2 : number[] =[];
  countstype3 : number[] =[];
  countstype4 : number[] =[];
  countstype5 : number[] =[];
  countstype6 : number[] =[];
  countstype7 : number[] =[];
  countPubByTypeAnnee!:CountPubByTypeAnnee[]
  //Linearchart
   lineChartData: ChartDataSets[] = [
    { data: this.counts, label: 'Nombre de publications' },
  ];
   lineChartLabels: Label[] = this.years;
   lineChartOptions: ChartOptions = {
    responsive: true,
     title: {
       text: 'Nombre de publications par année',
       display: true,
       position: "top"
     },
     scales:{
       yAxes: [{
         ticks:{
           beginAtZero:true
         },
         scaleLabel: {
           display: true,
           labelString: 'Nbr de publications'
         }
       }],
       xAxes: [{
         scaleLabel: {
           display: true,
           labelString: 'Année'
         }
       }]
     }

  };
   lineChartColors: Color[] = [
    {
      borderColor: 'rgba(252,97,0,0.3)',
      backgroundColor: 'rgba(255,128,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType : ChartType = 'line';
  public lineChartPlugins = [];
  //piechart
  public pieChartOptions: ChartOptions = {
    responsive: true,
    title: {
      text: 'Nombre de publications par type',
      display: true,
      position: "top"
    }
  };
  public pieChartLabels: Label[] = this.type;
  public pieChartData: SingleDataSet = this.counts3;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array < any > = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)'
      ]
    }
  ];
  //barchart
  barChartOptions: ChartOptions = {
    responsive: true,
    title: {
      text: 'Nombre de doctorants inscrits par année',
      display: true,
      position: "top"
    },
    scales:{
      yAxes: [{
        ticks:{
          beginAtZero:true
        },
        scaleLabel: {
          display: true,
          labelString: 'Nbr de doctorants'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Année'
        }
      }]
    }
  };
  barChartLabels: Label[] = this.years2;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: this.counts2, label: 'Nombre de doctorants' }
  ];

  //barchart2
  barChartOptions2: ChartOptions = {
    responsive: true,
    title: {
      text: 'Nombre de doctorants par état professionnel et année',
      display: true,
      position: "top"
    },
    scales:{
      yAxes: [{
        ticks:{
          beginAtZero:true
        },
        scaleLabel: {
          display: true,
          labelString: 'Nbr de doctorants'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Année'
        }
      }]
    }
  };
  barChartLabels2: Label[] = this.years2;
  barChartType2: ChartType = 'bar';
  barChartLegend2= true;
  barChartPlugins2 = [];

  barChartData2: ChartDataSets[] = [
    { data: this.countspub1, label: 'Sans emploi' },
    { data: this.countspub2, label: 'Salarié' },
    { data: this.countspub3, label: 'Fonctionnaire' }
  ];
  //3
  //barchart2
  barChartOptions3: ChartOptions = {
    responsive: true,
    title: {
      text: 'Nombre de Publication par type et année',
      display: true,
      position: "top"
    },
    scales:{
      yAxes: [{
        ticks:{
          beginAtZero:true
        },
        scaleLabel: {
          display: true,
          labelString: 'Nbr de Publication'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Année'
        }
      }]
    }
  };
  barChartLabels3: Label[] = this.years;
  barChartType3: ChartType = 'bar';
  barChartLegend3= true;
  barChartPlugins3= [];

  barChartData3: ChartDataSets[] = [
    { data: this.countstype1, label: 'Journal' },
    { data: this.countstype2, label: 'Conférence' },
    { data: this.countstype3, label: 'Communication Orale' },
    { data: this.countstype4, label: 'Poster' },
    { data: this.countstype5, label: 'Ouvrage' },
    { data: this.countstype6, label: 'Revue' },
    { data: this.countstype7, label: 'Autre' },

  ];


  private readonly destroy$ = new Subject<void>();

  constructor(protected activatedRoute: ActivatedRoute,protected publicationService: PublicationService,protected doctorantService: DoctorantService,private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => {(this.account = account)
    if(account !== null){
      this.doctorantService.countByAnnee().subscribe({
        next: (res: HttpResponse<CountDoc[]>) => {
          this.isLoading = true;
          this.countDoc = res.body ?? [];
          this.countDoc.forEach((a)=>{this.years2.push(a.annee.toString())});
          this.countDoc.forEach((a)=>{this.counts2.push(a.count)});
        },
        error: () => {
          this.isLoading = false;
        },
      });
      this.doctorantService.countSalariee().subscribe({
        next: (res: HttpResponse<DoctorantSalariee2[]>) => {
          this.isLoading = true;
          this.doctorantSalariee2 = res.body ?? [];
          this.doctorantSalariee2[0].count.forEach((a)=>{this.countspub1.push(a)})
          this.doctorantSalariee2[1].count.forEach((a)=>{this.countspub2.push(a)})
          this.doctorantSalariee2[2].count.forEach((a)=>{this.countspub3.push(a)})

        },
        error: () => {
          this.isLoading = false;
        },
      });
      this.publicationService.countAll().subscribe({
        next: (res: HttpResponse<CountPub[]>) => {
          this.isLoading = false;
          this.countPub = res.body ?? [];
          this.countPub.forEach((a)=>{this.years.push(a.annee.toString())});
          this.countPub.forEach((a)=>{this.counts.push(a.count)});
        },
        error: () => {
          this.isLoading = false;
        },
      });
      this.publicationService.countchercheur().subscribe({
        next: (res: HttpResponse<CountChercheurPays[]>) => {
          this.isLoading = false;
          this.countChercheurPays = res.body ?? [];
        },
        error: () => {
          this.isLoading = false;
        },
      });
      this.publicationService.countTypeAll().subscribe({
        next: (res: HttpResponse<CountPubByType[]>) => {
          this.isLoading = true;
          this.countPubByType = res.body ?? [];
          this.countPubByType.forEach((a)=>{this.type.push(a.type.toString())});
          this.countPubByType.forEach((a)=>{this.counts3.push(a.count)});
        },
        error: () => {
          this.isLoading = false;
        },
      });}
    }
      );
    this.publicationService.countAllPubByAnnee().subscribe({
      next:(res: HttpResponse<CountPubByTypeAnnee[]>) => {
        this.isLoading = false;
        this.countPubByTypeAnnee = res.body ?? [];

        for(const a of this.countPubByTypeAnnee){
          if(a.type==="Journal"){
            this.countstype1.push(a.count)
          }
          if(a.type==="Conférence"){
            this.countstype2.push(a.count)
          }
          if(a.type==="Communication Orale"){
            this.countstype1.push(a.count)
          }
          if(a.type==="Poster"){
            this.countstype1.push(a.count)
          }
          if(a.type==="Ouvrage"){
            this.countstype1.push(a.count)
          }
          if(a.type==="Revue"){
            this.countstype1.push(a.count)
          }
          if(a.type==="Autre"){
            this.countstype1.push(a.count)
          }
        }
      },
      error: () => {
        this.isLoading = false;
      },
    })


  }

  previousState(): void {
    window.history.back();
  }
  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
