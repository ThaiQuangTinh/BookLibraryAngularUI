export class User {
  fullname: string;
  phoneNumber: string;
  roleId: number;
  updatedAt: Date;
  isActivated: boolean;
  initDate: Date;
  delFlg: boolean;
  username: string;
  email: string;
  imageUrl: string;
  isChecked?: boolean

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
