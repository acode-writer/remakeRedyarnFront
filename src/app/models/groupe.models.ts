import { Promo } from './promo.models';
import { Apprenant } from './apprenant.models';
import { Formateur } from './formateur.models';
export interface Groupe {
  id: number| null;
  name: string;
  createdAt: Date;
  status: boolean;
  type: string;
  isDeleted: boolean;
  promo: Promo
  formateurs: Formateur[];
  apprenants: Apprenant[];
}
