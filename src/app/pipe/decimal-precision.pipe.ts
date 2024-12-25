import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalPrecision'
})
export class DecimalPrecisionPipe implements PipeTransform {

  transform(value: number, decimals: number = 2): any {
    // Check type of value
    if (typeof value !== 'number') {
      return value;
    }

    // Accomplish
    return value.toFixed(decimals);
  }

}
