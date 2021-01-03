import { GroupeTag } from './group-tag.models';
export interface Tag {
  id: number|null;
  libelle: string;
  descriptif: string|null;
  groupeTags: GroupeTag[];
  isDeleted: boolean;
}
