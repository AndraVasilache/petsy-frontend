import { Category } from 'app/entities/enumerations/category.model';

import { IPet, NewPet } from './pet.model';

export const sampleWithRequiredData: IPet = {
  id: 62498,
};

export const sampleWithPartialData: IPet = {
  id: 87537,
  category: Category['BIRD'],
  race: 'invoice Internal Borders',
  owner: 38663,
  picture: 'SMS',
};

export const sampleWithFullData: IPet = {
  id: 47968,
  forSale: true,
  category: Category['CAT'],
  race: 'EXE Wooden Technician',
  name: 'Car Compatible efficient',
  owner: 60994,
  picture: 'Specialist',
};

export const sampleWithNewData: NewPet = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
