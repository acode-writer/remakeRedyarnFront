import { Referentiel } from './referentiel.models';
import { Admin } from './admin.models';
import { Formateur } from './formateur.models';
import { Groupe } from './groupe.models';
export interface Promo {
  id: number|null;
  language: string;
  title: string;
  description: string;
  location: string|null;
  referenceAgate: string;
  startedAt: Date;
  previsionalEndDate: Date;
  fabrique: string;
  realEndDate: Date|null;
  isDeleted: boolean;
  groupes: Groupe[];
  formateurs: Formateur[];
  creataor: Admin;
  referentiel: Referentiel;
  avatar: string;
}
