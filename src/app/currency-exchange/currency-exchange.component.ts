import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ForextRates } from '../forex-rates';
import { RatesService } from '../rates-service'
import { catchError,filter,map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpHeaders } from '@angular/common/http';
import { Sse } from '../Sse';
import {throwError} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
     'token': '10dc303535874aeccc86a8251e6992f5'
  })
};


interface Currency {
  symbol: string,
  name : string
}

const  currencies: Currency[] = [
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
  {symbol:"BYN",name:"Belarusian Ruble"},
  {symbol:"CAD",name:"Canadian Dollar"},
  {symbol:"CHF",name:"Swiss Franc"},
  {symbol:"CLP",name:"Chilean Peso"},
  {symbol:"CNY",name:"Chinese Yuan"},
  {symbol:"COP",name:"Colombian Peso"},
  {symbol:"CRC",name:"Costa Rican Colón"},
  {symbol:"CZK",name:"Czech Koruna"},
  {symbol:"DKK",name:"Danish Krone"},
  {symbol:"DOP",name:"Dominican Peso"},
  {symbol:"DZD",name:"Algerian Dinar"},
  {symbol:"EGP",name:"Egyptian Pound"},
  {symbol:"EUR",name:"Euro"},
  {symbol:"FJD",name:"Fijian Dollar"},
  {symbol:"GBP",name:"British Pound Sterling"},
  {symbol:"GEL",name:"Georgian Lari"},
  {symbol:"GHS",name:"Ghanaian Cedi"},
  {symbol:"HKD",name:"Hong Kong Dollar"},
  {symbol:"HRK",name:"Croatian Kuna"},
  {symbol:"HUF",name:"Hungarian Forint"},
  {symbol:"IDR",name:"Indonesian Rupiah"},
  {symbol:"ILS",name:"Israeli New Sheqel"},
  {symbol:"INR",name:"Indian Rupee"},
  {symbol:"IQD",name:"Iraqi Dinar"},
  {symbol:"JOD",name:"Jordanian Dinar"},
  {symbol:"JPY",name:"Japanese Yen"},
  {symbol:"KES",name:"Kenyan Shilling"},
  {symbol:"KRW",name:"South Korean Won"},
  {symbol:"KWD",name:"Kuwaiti Dinar"},
  {symbol:"KZT",name:"Kazakhstani Tenge"},
  {symbol:"LBP",name:"Lebanese Pound"},
  {symbol:"LKR",name:"Sri Lankan Rupee"},
  {symbol:"LTL",name:"Lithuanian Litas"},
  {symbol:"MAD",name:"Moroccan Dirham"},
  {symbol:"MMK",name:"Myanma Kyat"},
  {symbol:"MOP",name:"Macanese Pataca"},
  {symbol:"MUR",name:"Mauritian Rupee"},
  {symbol:"MXN",name:"Mexican Peso"},
  {symbol:"MYR",name:"Malaysian Ringgit"},
  {symbol:"NAD",name:"Namibian Dollar"},
  {symbol:"NGN",name:"Nigerian Naira"},
  {symbol:"NIO",name:"Nicaraguan Córdoba"},
  {symbol:"NOK",name:"Norwegian Krone"},
  {symbol:"NPR",name:"Nepalese Rupee"},
  {symbol:"NZD",name:"New Zealand Dollar"},
  {symbol:"OMR",name:"Omani Rial"},
  {symbol:"PEN",name:"Peruvian Nuevo Sol"},
  {symbol:"PHP",name:"Philippine Peso"},
  {symbol:"PKR",name:"Pakistani Rupee"},
  {symbol:"PLN",name:"Polish Zloty"},
  {symbol:"PYG",name:"Paraguayan Guarani"},
  {symbol:"QAR",name:"Qatari Rial"},
  {symbol:"RON",name:"Romanian Leu"},
  {symbol:"RSD",name:"Serbian Dinar"},
  {symbol:"RUB",name:"Russian Ruble"},
  {symbol:"SAR",name:"Saudi Riyal"},
  {symbol:"SEK",name:"Swedish Krona"},
  {symbol:"SGD",name:"Singapore Dollar"},
  {symbol:"SVC",name:"Salvadoran Colón"},
  {symbol:"THB",name:"Thai Baht"},
  {symbol:"TND",name:"Tunisian Dinar"},
  {symbol:"TRY",name:"Turkish Lira"},
  {symbol:"TWD",name:"New Taiwan Dollar"},
  {symbol:"TZS",name:"Tanzanian Shilling"},
  {symbol:"UAH",name:"Ukrainian Hryvnia"},
  {symbol:"UGX",name:"Ugandan Shilling"},
  {symbol:"USD",name:"US Dollar"},
  {symbol:"UYU",name:"Uruguayan Peso"},
  {symbol:"UZS",name:"Uzbekistan Som"},
  {symbol:"VEF",name:"Venezuelan Bolívar"},
  {symbol:"VES",name:"Venezuelan Bolívar"},
  {symbol:"VND",name:"Vietnamese Dong"},
  {symbol:"XOF",name:"CFA Franc BCEAO"},
  {symbol:"ZAR",name:"South African Rand"}
]



@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.css'],
  providers: [Sse]
})
export class CurrencyExchangeComponent implements OnInit {

  showMessages = false
  loading = false
  tableData : ForextRates[] = [];
  message!: string
  displayedColumns: string[] = ['from', 'to', 'bid', 'ask', 'price']; 
  currencyExchangeForm: FormGroup;
  fromCurrencies = new FormControl('',Validators.required);
  toCurrencies = new FormControl('',Validators.required);
  snackBarRef !: any
  clickButton = 0;
  removable = true;
  selectable = true;
  toCurrenciessModel :any;
  fromCurrenciessModel: any;
  matChipList: Array<string> = [];
  currencies = currencies;

  ngOnInit(): void {
  }

  constructor(fb: FormBuilder, private ratesService : RatesService, private sse : Sse, private _snackBar: MatSnackBar) {
      this.currencyExchangeForm = fb.group({
      fromCurrencies: this.fromCurrencies,
      toCurrencies: this.toCurrencies,
      
    });
   
  }

  getCurrencyFromError(){
    return 'Please choose currency pairs'
  }
  
  
addCurrencyPairs(){
    console.log("click button value is::"+this.clickButton)
   if(this.clickButton <= 10){
     if(this.fromCurrencies.value === this.toCurrencies.value){
        this.openSnackBar("Cunrrency values cannot be same");
        this.fromCurrenciessModel = "";
        this.toCurrenciessModel = "";
        this.fromCurrencies.reset(); 
        this.toCurrencies.reset();
     }

     else{
      this.clickButton++;
      this.matChipList.push(this.fromCurrenciessModel+this.toCurrenciessModel);
      this.fromCurrenciessModel = "None";
      this.toCurrenciessModel = "None";
     }
   }

  }

  clearCurrencyPairs(){
    this.clickButton = 0;
    this.matChipList = [];
    this.tableData = [];
  }

  remove(matChip: string): void {
    const index = this.matChipList.indexOf(matChip);

    if (index >= 0) {
      this.matChipList.splice(index, 1);
    }
    this.clickButton--;
  }

  openSnackBar(message: string) {
   this.snackBarRef = this._snackBar.open(message, 'Delete');
  }

   getForexRatesFromApi(){
    this.loading = true
    this.ratesService
    .getForexRatesForPairs(this.matChipList).pipe(
      map(data => data), 
      catchError(err => {   
        console.log(this.message)
        this.loading = false
        this.openSnackBar(this.message);
        return throwError(err)
        })
      )
    .subscribe((data:ForextRates[]) => {
      this.tableData=data;
    });
    this.loading = false
   }

}