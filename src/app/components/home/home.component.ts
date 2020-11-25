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
  public generalStats = GeneralStats[0];
  public mode: boolean;
  public incoming: number;
  public outgoing: number;
  public selectedCountry: any;
  public disableInput = true;
  public result: number;

  constructor() { }

  ngOnInit(): void { }

  public calculate(outgoing, incoming, selectedCountry): void {
    console.log(incoming, outgoing, selectedCountry);
    switch (this.disableInput) {
      case false: {
        this.calculateSend(outgoing, incoming, selectedCountry);
        break;
      }
      case true: {
        this.calculateReciveincoming(outgoing, incoming, selectedCountry);
        break;
      }
    }
  }

  public changeInputStatus(): void {
    this.disableInput = !this.disableInput;
  }

  public calculateSend(outgoing, incoming, selectedCountry): void {
    const incomingToDolar = incoming * selectedCountry.usdValue;
    const spread = incomingToDolar * selectedCountry.spread;
    const spreadPlusConverted = spread + incomingToDolar;
    const dolarToClp = spreadPlusConverted * this.generalStats.usdValue;
    const spreadClpClp = dolarToClp * this.generalStats.spread;
    const spreadPlusConvertedClp = spreadClpClp + dolarToClp;
    const marginCalculated = spreadPlusConvertedClp * selectedCountry.margin;
    const finalNumber = spreadPlusConvertedClp + marginCalculated;
    this.result = Math.floor(finalNumber);
  }

  public calculateReciveincoming(outgoing, incoming, selectedCountry): void {

  }
}
