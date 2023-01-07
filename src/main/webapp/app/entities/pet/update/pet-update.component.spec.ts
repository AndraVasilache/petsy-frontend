import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PetFormService } from './pet-form.service';
import { PetService } from '../service/pet.service';
import { IPet } from '../pet.model';

import { PetUpdateComponent } from './pet-update.component';

describe('Pet Management Update Component', () => {
  let comp: PetUpdateComponent;
  let fixture: ComponentFixture<PetUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let petFormService: PetFormService;
  let petService: PetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PetUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PetUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PetUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    petFormService = TestBed.inject(PetFormService);
    petService = TestBed.inject(PetService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const pet: IPet = { id: 456 };

      activatedRoute.data = of({ pet });
      comp.ngOnInit();

      expect(comp.pet).toEqual(pet);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPet>>();
      const pet = { id: 123 };
      jest.spyOn(petFormService, 'getPet').mockReturnValue(pet);
      jest.spyOn(petService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pet });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pet }));
      saveSubject.complete();

      // THEN
      expect(petFormService.getPet).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(petService.update).toHaveBeenCalledWith(expect.objectContaining(pet));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPet>>();
      const pet = { id: 123 };
      jest.spyOn(petFormService, 'getPet').mockReturnValue({ id: null });
      jest.spyOn(petService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pet: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pet }));
      saveSubject.complete();

      // THEN
      expect(petFormService.getPet).toHaveBeenCalled();
      expect(petService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPet>>();
      const pet = { id: 123 };
      jest.spyOn(petService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pet });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(petService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
