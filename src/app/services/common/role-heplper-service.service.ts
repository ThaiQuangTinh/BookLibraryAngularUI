import { Injectable } from '@angular/core';
import { Role } from '../../enums/role-enum';

@Injectable({
  providedIn: 'root'
})
export class RoleHeplperServiceService {

  roles: any[] = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Librarian' },
    { id: 3, name: 'Reader' },
  ]

  constructor() { }

  public getRoleNameById(roleId: number): Role {
    if (roleId == 1) {
      return Role.Admin;
    } else if (roleId == 2) {
      return Role.Librarian;
    } else if (roleId == 3) {
      return Role.Reader;
    } else {
      return Role.All;
    }
  }

  public getRoleIdByName(role: Role): number {
    if (role == Role.Admin) {
      return 1;
    } else if (role == Role.Librarian) {
      return 2;
    } else if (role == Role.Reader) {
      return 3;
    } else {
      return 0;
    }
  }


  public getRoles(): any {
    return this.roles;
  }
}
