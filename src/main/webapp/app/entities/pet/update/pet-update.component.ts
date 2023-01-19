import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { PetFormService, PetFormGroup } from './pet-form.service';
import { IPet } from '../pet.model';
import { PetService } from '../service/pet.service';
import { Category } from 'app/entities/enumerations/category.model';
import { AccountService } from '../../../core/auth/account.service';

@Component({
  selector: 'jhi-pet-update',
  templateUrl: './pet-update.component.html',
})
export class PetUpdateComponent implements OnInit {
  isSaving = false;
  pet: IPet | null = null;
  categoryValues = Object.keys(Category);
  account: any;

  editForm: PetFormGroup = this.petFormService.createPetFormGroup();

  constructor(
    protected petService: PetService,
    protected petFormService: PetFormService,
    protected activatedRoute: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.account = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });
    this.activatedRoute.data.subscribe(({ pet }) => {
      this.pet = pet;
      if (pet) {
        this.updateForm(pet);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pet = this.petFormService.getPet(this.editForm);
    pet.owner = this.account.id;
    if (pet.id !== null) {
      this.subscribeToSaveResponse(this.petService.update(pet));
    } else {
      this.subscribeToSaveResponse(this.petService.create(pet));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPet>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(pet: IPet): void {
    this.petFormService.resetForm(this.editForm, pet);
  }
}
