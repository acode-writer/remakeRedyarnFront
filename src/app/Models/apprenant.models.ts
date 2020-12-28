import { ProfilSortie } from './profil-sortie.models';
import { User } from './user.models';
export interface Apprenant extends User {
  profilSortie: ProfilSortie;
}
