import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthenServiceService } from '../common/authen-service.service';
import { Role } from '../../enums/role-enum';

@Injectable({
  providedIn: 'root'
})
export class UserManagementServiceService {

  // Define base api url
  private baseApiUrl: string = 'http://localhost:8100/v3';

  constructor(
    private http: HttpClient,
    private authenService: AuthenServiceService
  ) {

  }

  // Function to create header
  private createHeader(): HttpHeaders {
    const token = this.authenService.getToken() || '';

    return new HttpHeaders({
      'Authorization': token
    });
  }

  // Function to convert to user array
  private convertToUserArray(data: any[]): User[] {
    return data.map(item => new User(item));
  }

  private getUsersApiByRoleName(roleName: Role): string {
    let apiUrlBaseOnRole = `${this.baseApiUrl}/get-infos`;

    // Set api base on role name
    switch (roleName) {
      case Role.Admin:
        apiUrlBaseOnRole = `${this.baseApiUrl}/get-admin-infos`;
        break;
      case Role.Librarian:
        apiUrlBaseOnRole = `${this.baseApiUrl}/get-librarian-infos`;
        break;
      case Role.Reader:
        apiUrlBaseOnRole = `${this.baseApiUrl}/get-reader-infos`;
        break;
      default:
        apiUrlBaseOnRole = `${this.baseApiUrl}/get-infos`;
    }

    return apiUrlBaseOnRole;
  }

  // Service to get users info (base on page and record perpage)
  public getUsersInfoByRoleName(roleName: Role, page: number, recordsPerPage: number): Observable<User[]> {
    // Call api to get user infos
    return this.http.post<any>(this.getUsersApiByRoleName(roleName),
      { page, recordsPerPage },
      { headers: this.createHeader() }
    ).pipe(
      // Convert response to User array
      map(response => this.convertToUserArray(response.data))
    );
  }

  // Service to get total count of each user type
  public getTotalCount(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/get-total`,
      {
        headers: this.createHeader()
      }
    );
  }

  // Service to update user information
  public updateUserInfo(user: User, imageFile?: File | null): Observable<any> {
    const formData = new FormData();

    // Append user information
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("fullname", user.fullname);
    formData.append("roleId", String(user.roleId));
    formData.append("phoneNumber", user.phoneNumber);

    // Append imageFind if provided  
    if (imageFile) {
      formData.append('imageFile', imageFile, imageFile.name);
    }

    // Call api to update user information
    return this.http.put(`${this.baseApiUrl}/update`,
      formData,
      {
        headers: this.createHeader()
      }
    );
  }

  // Service to get user info via token of user
  public getUserInfoByToken(): Observable<User> {
    return this.http.get(`${this.baseApiUrl}/get-info`,
      {
        headers: this.createHeader()
      }
    ).pipe(
      map(response => new User(response))
    );
  }

  // Service to create a user or many user
  public createNewUser(user: User | User[]): Observable<any> {
    const userArray = Array.isArray(user) ? user : [user];

    const userInfoList = userArray.map(u => ({
      username: u.username,
      email: u.email,
      fullname: u.fullname,
      roleId: u.roleId,
      phoneNumber: u.phoneNumber
    }));

    return this.http.post<any>(
      `${this.baseApiUrl}/register`,
      {
        userInfoList: userInfoList
      },
      {
        headers: this.createHeader()
      });
  }

  // Service to delete a user or many users
  public deleteUser(usernames: string | string[]): Observable<any> {
    const usernameArray = Array.isArray(usernames) ? usernames : [usernames];

    return this.http.delete(`${this.baseApiUrl}/delete-accounts`, {
      headers: this.createHeader(),
      body: { usernames: usernameArray }
    });
  }

  // Service to find user by fullname
  public findUserByFullname(fullname: string, page: number, recordsPerPage: number): Observable<User> {
    return this.http.post<any>(
      `${this.baseApiUrl}/find-user-infos-by-fullname`,
      {
        fullname: fullname,
        page: page,
        recordsPerPage: recordsPerPage
      },
      {
        headers: this.createHeader()
      }).pipe(
        map(response => new User(response.data))
      );
  }


}

