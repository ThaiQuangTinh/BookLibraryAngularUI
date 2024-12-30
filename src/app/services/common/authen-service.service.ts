import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenServiceService {

  // Define base api url for all api
  private baseApiUrl: string = 'http://localhost:8100/v3';

  constructor(
    private http: HttpClient
  ) { 
    
  }

  // Service to login, return token if success
  public login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseApiUrl}/login`,
      {
        username, password
      },
    );
  }

  // Service to active account
  public activeAccount(code: string, token: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseApiUrl}/activate-account`,
      { code },
      {
        headers: {
          'Content-type': 'application/json',
          'Authorization': token
        }
      }
    );
  }

  // Service to rest password
  public resetPassword(code: string, email: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/reset-password`,
      {
        email, code, newPassword
      },
    );
  }

  // Service to decode token
  public decodeToken(token: string): JwtPayload {
    return jwtDecode<JwtPayload>(token);
  }

  // Service to save token
  public saveToken(token: string, decodedData: JwtPayload): void {
    sessionStorage.setItem('authen_token', `Bearer ${token}`);
    sessionStorage.setItem('fullname', decodedData.fullname);
    sessionStorage.setItem('role_id', decodedData.roleId.toString());
    sessionStorage.setItem('image_url', decodedData.imageUrl);
    sessionStorage.setItem('email', decodedData.email);
  }

  // Service to get token
  public getToken(): string | null {
    return sessionStorage.getItem('authen_token');
  }

  // Service to clear token
  public clearToken(): void {
    sessionStorage.removeItem('authen_token');
    sessionStorage.removeItem('fullname');
    sessionStorage.removeItem('role_id');
    sessionStorage.removeItem('image_url');
    sessionStorage.removeItem('email');
  }

}

// Define interface for JwtPayload
interface JwtPayload {
  fullname: string,
  roleId: number,
  isActivated: boolean,
  imageUrl: string,
  email: string
}
