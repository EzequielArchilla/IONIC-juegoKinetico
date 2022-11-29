import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Puntaje } from '../clases/puntaje';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuariosRef: AngularFirestoreCollection;
  private puntajesRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.usuariosRef = this.db.collection('usuarios');
    this.puntajesRef = this.db.collection('puntajes');
  }

  public crearUsuario(usuario: Usuario) {
    return this.usuariosRef.add({ ...usuario });
  }

  public obtenerUsuario() {
    return this.usuariosRef.valueChanges() as Observable<Object[]>;
  }

  public update(id: string, data: any) {
    return this.usuariosRef.doc(id).update(data);
  }

  public delete(id: string) {
    return this.usuariosRef.doc(id).delete();
  }

  public obtenerColeccionUsuario() {
    return this.usuariosRef.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a: any) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id,  ...data };
        })
      )
    );
  }
  
  
  public crearPuntaje(puntaje: Puntaje) {
    return this.puntajesRef.add({ ...puntaje });
  }

  public obtenerPuntaje() {
    return this.puntajesRef.valueChanges() as Observable<Object[]>;
  }

  public updatePuntaje(id: string, data: any) {
    return this.puntajesRef.doc(id).update(data);
  }

  public deletePuntaje(id: string) {
    return this.puntajesRef.doc(id).delete();
  }

  public obtenerColeccionPuntaje() {
    return this.puntajesRef.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a: any) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id,  ...data };
        })
      )
    );
  }
}