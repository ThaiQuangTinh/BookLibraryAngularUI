import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementServiceService {

  // Define base api url
  private baseApiUrl: string = 'http://localhost:8100/v3';

  // Authen token
  private authenToken: string | null = null;

  constructor(
    private http: HttpClient
  ) {

  }


  // Function to get token from session storage
  private getAuthToken(): string {
    if (!this.authenToken) {
      this.authenToken = sessionStorage.getItem('authen_token');
      if (!this.authenToken) {
        throw new Error('Token was not found');
      }
    }

    return this.authenToken;
  }

  // Function to create header
  private createHeader(): HttpHeaders {
    const token = this.getAuthToken();

    return new HttpHeaders({
      'Authorization': token
    });
  }

  // Function to convert to user array
  private convertToUserArray(data: any[]): User[] {
    return data.map(item => new User(item));
  }

  // Service to get users info (base on page and record perpage)
  public getUsersInfoByRoleName(roleName: string, page: number, recordsPerPage: number): Observable<User[]> {
    let apiUrlBaseOnRole = `${this.baseApiUrl}/get-infos`;

    // Set api base on role name
    switch (roleName) {
      case 'admin': {
        apiUrlBaseOnRole = `${this.baseApiUrl}/get-admin-infos`;
        break;
      }
      case 'librarian': {
        apiUrlBaseOnRole = `${this.baseApiUrl}/get-librarian-infos`;
        break;
      }
      case 'reader': {
        apiUrlBaseOnRole = `${this.baseApiUrl}/get-reader-infos`;
        break;
      }
      default: {
        apiUrlBaseOnRole = `${this.baseApiUrl}/get-infos`;
      }
    }

    // Call api to get user infos
    return this.http.post<any>(apiUrlBaseOnRole,
      {
        page, recordsPerPage
      },
      {
        headers: this.createHeader()
      }
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

