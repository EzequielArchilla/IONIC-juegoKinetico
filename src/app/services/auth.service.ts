import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public usuarioLogueado = new Usuario();
  public logueado = false;
  public heroe = '';
  public imagenHeroe = '';

  constructor(private afAuth: AngularFireAuth, private afs:AngularFirestore) {}

  public signIn(mail: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, password);
  }

  public register(mail: string, password: string) {
     return this.afAuth.createUserWithEmailAndPassword(mail, password);
  }

  public signOut() {
    this.usuarioLogueado = new Usuario();
    this.logueado = false;
    return this.afAuth.signOut();
  }

  // async register(mail:string, password:string): Promise<any> {
  //   const credential = await this.afAuth.createUserWithEmailAndPassword(
  //     mail,
  //     password
  //   );

  //   const uid = credential.user.uid;
  //     console.log(credential.user.email);
  //   return this.afs.doc(
  //     `users/${uid}`
  //   ).set({
  //     uid,
  //     mail: credential.user.email,
  //   })
  // }
}