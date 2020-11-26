import { Component } from '@angular/core';
import { GeneralStats } from 'src/app/clases/general';
import { CountryStats } from '../../clases/countrystats';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public countryStats = CountryStats;
  public generalStats = GeneralStats[0];
  public mode: boolean;
  public incoming: number;
  public outgoing: number;
  public selectedCountry: any;
  public disableInput = true;
  public result: number;

  constructor(private message: NzMessageService) { }

  public calculate(outgoing, incoming, selectedCountry): void {
    console.log(incoming, outgoing, selectedCountry);
    switch (this.disableInput) {
      case false: {
        this.calculateSend(incoming, selectedCountry);
        break;
      }
      case true: {
        this.calculateSend(outgoing, selectedCountry);
        break;
      }
    }
  }

  public changeInputStatus(): void {
    this.disableInput = !this.disableInput;
  }

  public calculateSend(incoming, selectedCountry): void {
    if (!incoming || !selectedCountry) {
      this.message.error('Debe llenar todos los campos');
    } else {
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
  }
}
