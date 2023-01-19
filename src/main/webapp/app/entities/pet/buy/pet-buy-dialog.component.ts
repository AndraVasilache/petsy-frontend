import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPet } from '../pet.model';
import { PetService } from '../service/pet.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './pet-buy-dialog.component.html',
})
export class PetBuyDialogComponent {
  pet?: IPet;

  constructor(protected petService: PetService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.petService.update(this.pet!).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
