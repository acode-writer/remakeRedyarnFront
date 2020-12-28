import { Profil } from './profil.models';
export interface User {
  id: number|null;
  fistname: string;
  lastname: string;
  email: string;
  password: string|null;
  avatar: any;
  isDeleted: boolean;
  username: string;
  profil: Profil;
  role: string;
}
