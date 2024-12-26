import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelReaderService {

  constructor() { }

  /**
  * Read Excel file and convert data to an array of objects, removing duplicates.
  * @param file - The uploaded Excel file
  * @param uniqueKeys - An array of keys to identify unique records (e.g., ['username', 'email'])
  * @returns Promise<any[]> - A promise that resolves with the parsed and deduplicated data
  */
  public readExcelFile(file: File, uniqueKeys: string[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Get the first worksheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as (string | null)[][];

        // Convert the data into an array of objects
        const keys = jsonData[0] as string[]; // Assume first row contains headers
        const rawData = jsonData.slice(1).map((row: (string | null)[]) => {
          const obj: any = {};
          keys.forEach((key: string, index: number) => {
            obj[key] = row[index] || null; // Assign null if no value
          });
          return obj;
        });

        // Remove duplicates
        const uniqueData = this.removeDuplicates(rawData, uniqueKeys);

        resolve(uniqueData);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  /**
  * Remove duplicate records from an array of objects.
  * @param data - Array of objects
  * @param uniqueKeys - An array of keys to identify unique records
  * @returns Array of unique objects
  */
  private removeDuplicates(data: any[], uniqueKeys: string[]): any[] {
    if (uniqueKeys.length === 0) {
      // If no uniqueKeys provided, remove duplicates by comparing JSON strings
      return Array.from(new Set(data.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));
    }

    // Remove duplicates based on the specified uniqueKeys
    const seen = new Set();
    return data.filter(item => {
      const compositeKey = uniqueKeys.map(key => item[key]).join('|'); // Combine keys into a single string
      if (seen.has(compositeKey)) {
        return false; // Duplicate, skip it
      }
      seen.add(compositeKey);
      return true; // Unique, include it
    });
  }
}
