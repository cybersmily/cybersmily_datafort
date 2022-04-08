import { map, catchError } from 'rxjs/operators';
import { Cp2020EquipmentActionTypes } from './../types/cp2020-equipment-action-types';
import { Cp2020EquipmentDataService } from './../services/cp2020-equipment-data.service';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap,  of } from 'rxjs';

@Injectable()
export class Cp2020EquipmentLoadEffect {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Cp2020EquipmentActionTypes.LOAD_DATA),
      switchMap(() =>
        this.dataService
          .load()
          .pipe(
            map((data) => ({
              type: Cp2020EquipmentActionTypes.LOAD_DATA_SUCCESS,
              props: data
            })),
            catchError((err) => {
              console.error(err);
              return of({
              type: Cp2020EquipmentActionTypes.LOAD_DATA_FAILURE,
              props: err
            })})
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: Cp2020EquipmentDataService
  ) {}
}
