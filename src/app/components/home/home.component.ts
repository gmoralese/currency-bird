import { Component, OnInit } from '@angular/core';
import { GeneralStats } from 'src/app/clases/general';
import { CountryStats } from '../../clases/countrystats';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public countryStats = CountryStats;
  public generalStats = GeneralStats;

  constructor() { }

  ngOnInit(): void {
    console.log(this.countryStats);
    console.log(this.generalStats);
  }

}
