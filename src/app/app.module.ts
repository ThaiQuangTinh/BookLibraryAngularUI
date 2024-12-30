import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './common/login/login.component';
import { ForgotPassowrdComponent } from './common/forgot-passowrd/forgot-passowrd.component';
import { ResetPasswordComponent } from './common/reset-password/reset-password.component';
import { HeaderComponent } from './common/header/header.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CreateNewUserComponent } from './admin/components/create-new-user/create-new-user.component';
import { EditUserComponent } from './admin/components/edit-user/edit-user.component';
import { UserProfileComponent } from './common/popup/user-profile/user-profile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ImportTemplateComponent } from './common/popup/import-template/import-template.component';
import { ExportTemplateComponent } from './common/popup/export-template/export-template.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { VerifyAccountComponent } from './common/verify-account/verify-account.component';
import { SpinnerComponent } from './services/spinner/spinner.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReaderDashboardComponent } from './reader/reader-dashboard/reader-dashboard.component';
import { ReaderHomeComponent } from './reader/reader-home/reader-home.component';
import { ReaderFavroutiesComponent } from './reader/reader-favrouties/reader-favrouties.component';
import { ReaderBorrowingHistoryComponent } from './reader/reader-borrowing-history/reader-borrowing-history.component';
import { ReaderCurrentBorrowedComponent } from './reader/reader-current-borrowed/reader-current-borrowed.component';
import { LeftMenuComponent } from './common/left-menu/left-menu.component';
import { MatListModule } from '@angular/material/list';
import { BannerForReaderComponent } from './reader/banner-for-reader/banner-for-reader.component';
import { LibrarianDashboardComponent } from './librarian/librarian-dashboard/librarian-dashboard.component';
import { BookManagementComponent } from './librarian/book-management/book-management.component';
import { BookLendingComponent } from './librarian/book-lending/book-lending.component';
import { BookReturnComponent } from './librarian/book-return/book-return.component';
import { ReportComponent } from './librarian/report/report.component';
import { CreateBookComponent } from './librarian/popup/create-book/create-book.component';
import { EditBookComponent } from './librarian/popup/edit-book/edit-book.component';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { DecimalPrecisionPipe } from './pipe/decimal-precision.pipe';
import { DeleteDialogComponent } from './common/popup/delete-dialog/delete-dialog.component';
import { AdminBannerComponent } from './admin/components/admin-banner/admin-banner.component';
import { UserManagementTableComponent } from './admin/components/user-management-table/user-management-table.component';
import { ItemManagementActionsComponent } from './common/item-management-actions/item-management-actions.component';
import { BaseOverlayComponent } from './common/base-overlay/base-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPassowrdComponent,
    ResetPasswordComponent,
    HeaderComponent,
    CreateNewUserComponent,
    EditUserComponent,
    UserProfileComponent,
    AdminDashboardComponent,
    ImportTemplateComponent,
    ExportTemplateComponent,
    VerifyAccountComponent,
    SpinnerComponent,
    ReaderDashboardComponent,
    ReaderHomeComponent,
    ReaderFavroutiesComponent,
    ReaderBorrowingHistoryComponent,
    ReaderCurrentBorrowedComponent,
    LeftMenuComponent,
    BannerForReaderComponent,
    LibrarianDashboardComponent,
    BookManagementComponent,
    BookLendingComponent,
    BookReturnComponent,
    ReportComponent,
    CreateBookComponent,
    EditBookComponent,
    DateFormatPipe,
    DecimalPrecisionPipe,
    DeleteDialogComponent,
    AdminBannerComponent,
    UserManagementTableComponent,
    ItemManagementActionsComponent,
    BaseOverlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true,
    }),
    OverlayModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    HttpClientModule,
    MatListModule,
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: 'OVERLAY_DATA', useValue: { message: 'Default message', diameter: 40 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
