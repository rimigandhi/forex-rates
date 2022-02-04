import { Component } from '@angular/core';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
import {FormControl, Validators, FormsModule, Form} from '@angular/forms';

interface Currency {
  symbol: string,
  name : string
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  currencyFromControl = new FormControl('', Validators.required);
  currencyToControl = new FormControl('', Validators.required);

  
  onSubmit(form: any){
    console.log("value 1 is:::"+form.value.currencyFromControl)
  }

  currencies: Currency[] = [
    {symbol:"AED",name:"United Arab Emirates Dirham"},
    {symbol:"ARS",name:"Argentine Peso"},
    {symbol:"AUD",name:"Australian Dollar"},
    {symbol:"BDT",name:"Bangladeshi Taka"},
    {symbol:"BGN",name:"Bulgarian Lev"},
    {symbol:"BHD",name:"Bahraini Dinar"},
    {symbol:"BND",name:"Brunei Dollar"},
    {symbol:"BOB",name:"Bolivian Boliviano"},
    {symbol:"BRL",name:"Brazilian Real"},
    {symbol:"BWP",name:"Botswanan Pula"},

  ]

}
