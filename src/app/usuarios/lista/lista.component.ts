import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuarios } from 'src/app/store/actions';
// import { UsuarioService } from 'src/app/services/usuario.service';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {


  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any;

  constructor(
    // public usuarioService: UsuarioService
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {


    this.store.select('usuarios').subscribe(
      ({ users, loading, error }) => {
        console.log(users);
        this.usuarios = users;
        this.loading = loading;
        this.error = error;

      }
    );

    this.store.dispatch(cargarUsuarios());



    // this.usuarioService.getUsers().subscribe(
    //   data => {
    //     console.log(data);
    //     this.usuarios = data;
    //   });

  }

}
