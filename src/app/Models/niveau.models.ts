import { Competence } from './competence.models';
export interface Niveau {
  id: number|null;
  libelle: string;
  critereEvaluation: string;
  groupeAction: string;
  competence: Competence;
  isDeleted: boolean;
}
