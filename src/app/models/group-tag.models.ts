import { Tag } from './tag.models';
export interface GroupeTag {
  id: number|null;
  libelle: string;
  tags: Tag[];
  isDeleted: boolean;
}
