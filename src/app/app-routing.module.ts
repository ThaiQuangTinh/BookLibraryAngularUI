import { ExportTemplateComponent } from './common/popup/export-template/export-template.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { ForgotPassowrdComponent } from './common/forgot-passowrd/forgot-passowrd.component';
import { ResetPasswordComponent } from './common/reset-password/reset-password.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { VerifyAccountComponent } from './common/verify-account/verify-account.component';
import { ReaderDashboardComponent } from './reader/reader-dashboard/reader-dashboard.component';
import { ReaderHomeComponent } from './reader/reader-home/reader-home.component';
import { ReaderFavroutiesComponent } from './reader/reader-favrouties/reader-favrouties.component';
import { ReaderBorrowingHistoryComponent } from './reader/reader-borrowing-history/reader-borrowing-history.component';
import { ReaderCurrentBorrowedComponent } from './reader/reader-current-borrowed/reader-current-borrowed.component';
import { LibrarianDashboardComponent } from './librarian/librarian-dashboard/librarian-dashboard.component';
import { BookManagementComponent } from './librarian/book-management/book-management.component';
import { BookLendingComponent } from './librarian/book-lending/book-lending.component';
import { BookReturnComponent } from './librarian/book-return/book-return.component';
import { ReportComponent } from './librarian/report/report.component';
import { ImportTemplateComponent } from './common/popup/import-template/import-template.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPassowrdComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'verify-account', component: VerifyAccountComponent },
  // Test
  { path: 'test', component: ImportTemplateComponent },
  // Routing for admin
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  // Routing for reader
  {
    path: 'reader-dashboard', component: ReaderDashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: ReaderHomeComponent },
      { path: 'favourite', component: ReaderFavroutiesComponent },
      { path: 'borrowing-history', component: ReaderBorrowingHistoryComponent },
      { path: 'current-borrowed', component: ReaderCurrentBorrowedComponent }
    ],
  },
  // Router for librarian
  {
    path: 'librarian-dashboard', component: LibrarianDashboardComponent,
    children: [
      { path: '', redirectTo: 'book-management', pathMatch: 'full' },
      { path: 'book-management', component: BookManagementComponent },
      { path: 'book-lending', component: BookLendingComponent },
      { path: 'book-return', component: BookReturnComponent },
      { path: 'report', component: ReportComponent }
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
