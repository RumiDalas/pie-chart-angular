import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Location } from '@angular/common';
import { ChartDataSet } from '../model/chart';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input() barChartDataSets!: ChartDataSet | null;

  @Output() barChartClicked = new EventEmitter<ChartEvent>();
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(
    private readonly location: Location
  ) { }


  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.barChartDataSets && this.barChartDataSets.value ) {
      this.barChartData.labels = this.barChartDataSets.labels
      this.barChartData.datasets[0].data = this.barChartDataSets.value[0];
      this.barChartData.datasets[0].backgroundColor = this.barChartDataSets.backgroundColor

      if (
        this.barChartOptions &&
        this.barChartOptions.plugins &&
        this.barChartOptions.plugins.datalabels
      ) {
        this.barChartOptions.plugins.datalabels.color = this.barChartDataSets.textColor;
      }
    }


  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        min: 10,
        grid: {
          display: true,
        },
      }
    },
    plugins: {
      // this portion for showing title
      legend: {
        display: false,
      },
      // All style will be added here
      datalabels: {
        color: '',
        // color: 'white',
        anchor: 'center',
        align: 'center',
        font: {
          weight: 'bold'
        },
      },

    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];


  public barChartData: ChartData<'bar', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
        // label: 'Series A',
        backgroundColor: [],
      },

    ],
  };

  // events
  public chartClicked(event: any): void {
    console.log(event);
    this.barChartClicked.emit(event);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  goToBack() {
    this.location.back();
  }

  changeLabelPosition(event:any){
    console.log(event.value)
    if(event.value==='outside' &&  this.barChartOptions?.plugins?.datalabels ){
      this.barChartOptions.plugins.datalabels.anchor = 'end'
      this.barChartOptions.plugins.datalabels.align = 'end'
    }
    if(event.value==='start' &&  this.barChartOptions?.plugins?.datalabels ){
      this.barChartOptions.plugins.datalabels.anchor = 'end'
      this.barChartOptions.plugins.datalabels.align = 'start'
    }
    if(event.value==='center' && this.barChartOptions?.plugins?.datalabels ){
      this.barChartOptions.plugins.datalabels.anchor = 'center'
      this.barChartOptions.plugins.datalabels.align = 'center'
    }


    this.chart?.render();
  }

  changeBackgroundColor(event:any){

    if(event.value==='seaGreen'  ){
      this.barChartData.datasets[0].backgroundColor =  [ '#63b598','#ce7d78' ]
    }

    if(event.value==='green'  ){
      this.barChartData.datasets[0].backgroundColor =  [ '#008000','#B22222' ]
    }

    if(event.value==='violet'  ){
      this.barChartData.datasets[0].backgroundColor =  [ '#C71585','#800080', ]
    }

    this.chart?.render();
  }

  changeTextColor(event:any){

    if(event.value==='white' && this.barChartOptions?.plugins?.datalabels ){
      this.barChartOptions.plugins.datalabels.color = '#ffffff'
    }

    if(event.value==='black' && this.barChartOptions?.plugins?.datalabels ){
      this.barChartOptions.plugins.datalabels.color= '#000000'
    }

    if(event.value==='green' && this.barChartOptions?.plugins?.datalabels ){
       this.barChartOptions.plugins.datalabels.color = '#04F404'
    }

    this.chart?.render();
  }

  changeGridLine(event:any){
    // scales: {
    //   x: {
    //     grid: {
    //       display: true,
    //     },
    //   },
    // if( this.barChartOptions?.scales ){
    //   this.barChartOptions.scales=true ;
    // }

    this.chart?.render();
  }

}


