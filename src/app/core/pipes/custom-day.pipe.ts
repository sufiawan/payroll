import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDay'
})
export class CustomDayPipe implements PipeTransform {

  transform(value: number): string {
    const dayName = [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ];

    return dayName[value - 1];
  }

}
