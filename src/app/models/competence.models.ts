import { Niveau } from './niveau.models';
import { GroupeCompetence } from './groupe-competence.models';
export interface Competence {
  id: number|null;
  libelle: string;
  groupeCompetences: GroupeCompetence[];
  niveaux: Niveau[];
  isDeleted: boolean;
}
