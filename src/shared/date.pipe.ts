import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'dater'
})
export class DaterPipe implements PipeTransform {
    d:any;
    transform(value: number, separator: string) {
        this.d = moment.duration(value, 'minutes');
       return this.d.hours() + 'h ' + this.d.minutes() + 'min';
       
   }
}
