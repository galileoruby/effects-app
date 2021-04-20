import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as usuariosActions from '../actions';
import { cargarUsuariosSuccess } from '../actions';

import { Action, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs'

@Injectable()
export class UsuarioEffects {


    constructor(
        private action$: Actions,
        private usuariosService: UsuarioService

    ) {

    }



    cargarUsuario$ : Observable<Action> = createEffect(
        () =>
            this.action$.pipe(
                ofType(usuariosActions.cargarUsuario),
                mergeMap(
                    (action) => this.usuariosService.getUserById(action.id)
                        .pipe(
                            map(
                                user => usuariosActions.cargarUsuarioSuccess({ usuario: user })),
                            catchError(err => of(usuariosActions.cargarUsuarioError({ payload: err })))
                        )
                )
            )
    );

}