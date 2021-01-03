import { Referentiel } from './referentiel.models';
import { Competence } from './competence.models';
export interface GroupeCompetence {
  id: number|null;
  libelle: string;
  descriptif: string;
  competences: Competence[];
  referentiels: Referentiel[];
  isDeleted: boolean;
}
