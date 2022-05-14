import {Component, Input, OnInit} from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IInformation } from '../information.model';
import { InformationService } from '../service/information.service';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {DataUtils} from "../../../core/util/data-util.service";
import {Doctorant, IDoctorant} from "../../doctorant/doctorant.model";
import {IFormation} from "../../formation/formation.model";
import {FormationDoctorant} from "../../formation-doctorant/formation-doctorant.model";
import {IBac} from "../../bac/bac.model";
import {IPublication} from "../../publication/publication.model";
import {CountPub} from "../../ChartsModels/CountPub";
import {CountPubByType} from "../../ChartsModels/CountPubByType";
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Color, Label, SingleDataSet} from "ng2-charts";
import {DoctorantService} from "../../doctorant/service/doctorant.service";
import {PublicationService} from "../../publication/service/publication.service";
import {CountCherchuerExterne} from "../../ChartsModels/CountCherchuerExterne";
import {CountPubByTypeAnnee} from "../../ChartsModels/CountPubByTypeAnnee";

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
  years : Label[]  =[];
  counts : number[] =[];
  yearsChercheur : Label[]  =[];
  countsChercheur : number[] =[];
  years2:Label[]  =[];
  counts3:number[] =[];
  type:Label[]  =[];
  countCherchuerExterne!:CountCherchuerExterne[];
  countPubByTypeAnnee!:CountPubByTypeAnnee[];
  yearspub : Label[]  =[];
  countstype1 : number[] =[];
  countstype2 : number[] =[];
  countstype3 : number[] =[];
  countstype4 : number[] =[];
  countstype5 : number[] =[];
  countstype6 : number[] =[];
  countstype7 : number[] =[];


  @Input() doctorant!: IDoctorant ;
  @Input() formations!: IFormation[];
  @Input() formationDoctorant!:FormationDoctorant[];
  @Input() bac!:IBac;
  @Input() publications?: IPublication[];
  @Input() countPub!: CountPub[];
  @Input() countPubByType!:CountPubByType[];

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
  //Linearchart2
  lineChartData2: ChartDataSets[] = [
    { data: this.countsChercheur, label: 'Nombre de Collaboration' },
  ];
  lineChartLabels2: Label[] = this.yearsChercheur;
  lineChartOptions2: ChartOptions = {
    responsive: true,
    title: {
      text: 'Nombre de Collaboration par année',
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
          labelString: 'Nbr de Collaboration'
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
  lineChartColors2: Color[] = [
    {
      borderColor: 'rgba(252,97,0,0.3)',
      backgroundColor: 'rgba(255,128,0,0.3)',
    },
  ];
  public lineChartLegend2 = true;
  public lineChartType2 : ChartType = 'line';
  public lineChartPlugins2 = [];
  //pie

   pieChartOptions: ChartOptions = {
    responsive: true,
    title: {
      text: 'Nombre de publications par type',
      display: true,
      position: "top"
    }
  };
   pieChartLabels: Label[]=this.type ;
   pieChartData: SingleDataSet =this.counts3;
   pieChartType: ChartType = 'pie';
   pieChartLegend = true;
   pieChartPlugins = [];
   pieChartColors: Array < any > = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)'
      ]
    }
  ];
  //barchart2
  barChartOptions2: ChartOptions = {
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
  barChartLabels2: Label[] = this.years2;
  barChartType2: ChartType = 'bar';
  barChartLegend2= true;
  barChartPlugins2 = [];

  barChartData2: ChartDataSets[] = [
    { data: this.countstype1, label: 'Journal' },
    { data: this.countstype2, label: 'Conférence' },
    { data: this.countstype3, label: 'Communication Orale' },
    { data: this.countstype4, label: 'Poster' },
    { data: this.countstype5, label: 'Ouvrage' },
    { data: this.countstype6, label: 'Revue' },
    { data: this.countstype7, label: 'Autre' },

  ];


  constructor(protected publicationService: PublicationService,protected dataUtils: DataUtils,public _sanitizer: DomSanitizer,protected doctorantService: DoctorantService,protected informationService: InformationService) {}

  loadAll(): void {

    this.isLoading = true;
  }
  decode(base64String: string):SafeResourceUrl{
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + base64String);
  }
  ngOnInit(): void {
    this.loadAll();

    this.publicationService.countTypeCurentUser().subscribe({
      next:(res: HttpResponse<CountPubByType[]>) => {
        this.countPubByType = res.body ?? [];
        for(const a of this.countPubByType){
          this.type.push(a.type.toString())
          this.counts3.push(a.count)
        }
      },
      error: () => {
        this.isLoading = false;
      },
    });
    this.publicationService.count().subscribe({
      next:(res: HttpResponse<CountPub[]>) => {
        this.isLoading = false;
        this.countPub = res.body ?? [];
        for(const a of this.countPub){
          this.years.push(a.annee.toString())
          this.counts.push(a.count)
        }
      },
      error: () => {
        this.isLoading = false;
      },
    })
    this.publicationService.countChercheurExterne().subscribe({
      next:(res: HttpResponse<CountCherchuerExterne[]>) => {
        this.isLoading = false;
        this.countCherchuerExterne = res.body ?? [];
        for(const a of this.countCherchuerExterne){
          this.yearsChercheur.push(a.annee.toString())
          this.countsChercheur.push(a.count)
        }
      },
      error: () => {
        this.isLoading = false;
      },
    })
    this.publicationService.countPubByAnnee().subscribe({
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
  setActive(user: Doctorant, isActivated: number): void {
    this.doctorantService.update({ ...user, etatDossier: isActivated,anneeInscription:new Date().getFullYear() }).subscribe(() => this.loadAll());
  }

}
