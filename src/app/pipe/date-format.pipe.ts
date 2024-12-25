import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return ''; 

    // Create date object from value parameter
    const date = new Date(value); 

    // Get day, month, yeaer from date object
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();

    // Return date format dd/mm/yyyy
    return `${day}/${month}/${year}`;
  }

}
