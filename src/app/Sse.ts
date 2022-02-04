import {Injectable, NgZone } from '@angular/core'
import { Observable } from 'rxjs'
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

const EventSource: any = window['EventSource']
@Injectable(  {providedIn: 'root'})
export class Sse{

    constructor(private zone : NgZone) {}

    EventSourcePolyfill: any;
    EventSource = NativeEventSource || EventSourcePolyfill;

  // Tried using Server Side Event - But it onyl Accepts content type of application/json. 
    observeSse(sseUrl: string) : Observable<any> {
        return new Observable<any>(obs => {
            var es = new EventSourcePolyfill(sseUrl, {
                headers: {
                  'token': '10dc303535874aeccc86a8251e6992f5'
                }
              });
          
              es.onmessage = (evt: any) => {
                const data = JSON.parse(evt.data);
                console.log("data in service is::"+data)
                this.zone.run(() => obs.next());
            };
            return () => es.close(); 
        });
       
    }
}