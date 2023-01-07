import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPet, NewPet } from '../pet.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPet for edit and NewPetFormGroupInput for create.
 */
type PetFormGroupInput = IPet | PartialWithRequiredKeyOf<NewPet>;

type PetFormDefaults = Pick<NewPet, 'id' | 'forSale'>;

type PetFormGroupContent = {
  id: FormControl<IPet['id'] | NewPet['id']>;
  forSale: FormControl<IPet['forSale']>;
  category: FormControl<IPet['category']>;
  race: FormControl<IPet['race']>;
  name: FormControl<IPet['name']>;
  owner: FormControl<IPet['owner']>;
  picture: FormControl<IPet['picture']>;
};

export type PetFormGroup = FormGroup<PetFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PetFormService {
  createPetFormGroup(pet: PetFormGroupInput = { id: null }): PetFormGroup {
    const petRawValue = {
      ...this.getFormDefaults(),
      ...pet,
    };
    return new FormGroup<PetFormGroupContent>({
      id: new FormControl(
        { value: petRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      forSale: new FormControl(petRawValue.forSale),
      category: new FormControl(petRawValue.category),
      race: new FormControl(petRawValue.race),
      name: new FormControl(petRawValue.name),
      owner: new FormControl(petRawValue.owner),
      picture: new FormControl(petRawValue.picture),
    });
  }

  getPet(form: PetFormGroup): IPet | NewPet {
    return form.getRawValue() as IPet | NewPet;
  }

  resetForm(form: PetFormGroup, pet: PetFormGroupInput): void {
    const petRawValue = { ...this.getFormDefaults(), ...pet };
    form.reset(
      {
        ...petRawValue,
        id: { value: petRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PetFormDefaults {
    return {
      id: null,
      forSale: false,
    };
  }
}
