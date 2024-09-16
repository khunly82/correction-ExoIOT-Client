import { Component } from '@angular/core';
import { TemperatureService } from '../../services/temperature.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-temperature',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './temperature.component.html',
  styleUrl: './temperature.component.scss'
})
export class TemperatureComponent {

  public labels: string[] = [];

  public datasets: any =  [];

  constructor(
    private readonly temperatureService: TemperatureService
  ) {
    temperatureService.get().subscribe({next: (data) => {
      data = data.reduce((prev, current) => {
        let idGroup: Date;
        if(!prev.length) {
          idGroup = new Date(data[0].date);
        }
        else {
          idGroup = prev[prev.length - 1].idGroup; 
        }
        const endGroup: Date = new Date(idGroup.toISOString());
        endGroup.setMinutes(endGroup.getMinutes() + 10);

        if(new Date(current.date) > endGroup) {
          idGroup = endGroup;
        }
        let group = prev.find((item: any) => item.idGroup === idGroup);
        if(!group) {
          group = { idGroup: idGroup, values: [] };
          prev.push(group);
        }
        group.values.push(current.value);
        return prev;
      }, []);

      this.labels = data.map(i => i.idGroup),
      this.datasets = [{
        data: data.map(g => g.values.reduce((prev: any, current: any) => {
          return prev + (current) / g.values.length
        }, 0)),
        label: 'Maison Khun'
      }]
    }});
  }
}
