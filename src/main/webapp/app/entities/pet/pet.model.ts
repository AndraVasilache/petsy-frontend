import { Category } from 'app/entities/enumerations/category.model';

export interface IPet {
  id: number;
  forSale?: boolean | null;
  category?: Category | null;
  race?: string | null;
  name?: string | null;
  owner?: number | null;
  picture?: string | null;
}

export type NewPet = Omit<IPet, 'id'> & { id: null };
