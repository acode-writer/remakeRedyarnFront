import { Apprenant } from "./apprenant.models";

export interface ProfilSortie {
  id: number ;
  libelle: string;
  apprenants: Apprenant[];
  isDeleted: boolean;
}
