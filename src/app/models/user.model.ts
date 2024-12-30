export class User {

  public fullname: string;
  
  public phoneNumber: string;
  
  public roleId: number;
  
  public updatedAt: Date;
  
  public isActivated: boolean;
  
  public initDate: Date;
  
  public delFlg: boolean;
  
  public username: string;
  
  public email: string;
  
  public imageUrl: string;
  
  public isChecked?: boolean
  

  constructor(data?: Partial<User>) {
    this.fullname = data?.fullname || '';
    this.phoneNumber = data?.phoneNumber || '';
    this.roleId = data?.roleId || 0;
    this.updatedAt = data?.updatedAt || new Date();
    this.isActivated = data?.isActivated || false;
    this.initDate = data?.initDate || new Date();
    this.delFlg = data?.delFlg || false;
    this.username = data?.username || '';
    this.email = data?.email || '';
    this.imageUrl = 'http://localhost:8100' + data?.imageUrl || '';
    this.isChecked = data?.isChecked || false;
  }
  
}
