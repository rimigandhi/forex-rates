import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { catchError, retry,map,tap,last,switchMap,share,takeUntil} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { ForextRates } from './forex-rates';
import { Observable, throwError,timer,Subject,of, BehaviorSubject, Observer } from 'rxjs';


const httpOptions = {
    headers: new HttpHeaders({
       'token': '10dc303535874aeccc86a8251e6992f5'
    })
  };


@Injectable(  {providedIn: 'root'})
export class RatesService {
    tableData!: Observable<ForextRates[]>
    private stopPolling = new Subject();

    constructor(private http: HttpClient) {}    
  
    ngOnDestroy() {
       this.stopPolling.next();
    }

    getForexRatesForPairs(matChipList: Array<string>) : Observable<ForextRates[]>{

      console.log("inside constutcor for rates service...")
      var url : string = "http://localhost:8080/rates?";
      var i = 0;
      matChipList.forEach( (element) => {
        if(i==0){
          console.log("element in if is:::"+element);
          var concatString = "pair="+element; 
          url = url + concatString;
          i++;
        }
        else{
          var concatString = "&pair="+element; 
          url = url + concatString;
          i++;
        }
      
    });
      return this.http.get<ForextRates[]>(
        url , 
        httpOptions
        ).pipe(
             map((data: ForextRates[]) => {
               return data;
             }), catchError( error => {
               return throwError( 'Capital not found!' );
             })
          )
    }

}