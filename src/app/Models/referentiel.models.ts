import { GroupeCompetence } from './groupe-competence.models';
import { Promo } from './promo.models';
export interface Referentiel {
  id: number|null;
  libelle: string;
  presentation: string;
  critereAdmission: string;
  critereEvaluation: string;
  groupeCompetences: GroupeCompetence[];
  isDeleted: boolean;
  programme: string;
  promos: Promo[];
}
