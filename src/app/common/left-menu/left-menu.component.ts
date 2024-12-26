import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Page {
  link: string;
  name: string;
  icon: string;
  isSelectedPage?: boolean;
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.css',
})
export class LeftMenuComponent implements OnInit {

  public sideNavState: boolean = false;

  public roleId!: number;

  public pages: Page[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.roleId = +(sessionStorage.getItem('role_id') || 0);
    if (this.roleId == 3) {
      this.pages = [
        { name: 'Home', link: 'reader-dashboard/reader-home', icon: 'fa-house', isSelectedPage: true },
        { name: 'Favroutie', link: 'reader-dashboard/reader-favourite', icon: 'fa-star' },
        { name: 'Borrowing history', link: 'reader-dashboard/reader-borrowing-history', icon: 'fa-clock-rotate-left' },
        { name: 'Current borrwed', link: 'reader-dashboard/reader-current-borrowed', icon: 'fa-ticket' },
      ];
    } else if (this.roleId == 2) {
      this.pages = [
        { name: 'Book management', link: 'librarian-dashboard/book-management', icon: 'fa-bars-progress', isSelectedPage: true },
        { name: 'Book lending', link: 'librarian-dashboard/book-lending', icon: 'fa-handshake' },
        { name: 'Book return', link: 'librarian-dashboard/book-return', icon: 'fa-droplet' },
        { name: 'Report', link: 'librarian-dashboard/report', icon: 'fa-flag' },
      ];
    }

    // this.pages[0].isSelectedPage = true;
    this.checkActivePage();
  }

  selectPage(page: Page) {
    this.pages.forEach(p => p.isSelectedPage = false);
    page.isSelectedPage = true;

    this.router.navigate([page.link]);
  }

  checkActivePage() {
    const currentUrl = this.router.url.split('?')[0];

    this.pages.forEach(page => {
      if (currentUrl.includes(page.link)) {
        page.isSelectedPage = true;
      } else {
        page.isSelectedPage = false;
      }
    });
  }

}
