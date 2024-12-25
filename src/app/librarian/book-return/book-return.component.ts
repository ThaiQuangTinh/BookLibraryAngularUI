import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-return',
  templateUrl: './book-return.component.html',
  styleUrls: [
    './book-return.component.css',
    '../../../assets/styles/table.css'
  ]
})
export class BookReturnComponent implements OnInit{

  // Variable contain types to search
  searchTypes = ['author', 'publisher'];

  constructor() {

  }

  ngOnInit(): void {
      
  }
}
