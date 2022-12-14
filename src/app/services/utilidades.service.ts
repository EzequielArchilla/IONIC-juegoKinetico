import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor(
    private toastController: ToastController
    
  ) { }

  // reproducirSonidoInicio( ) {
    
  //   let audio = new Audio();
  //   audio.src = './../../assets/sonidos/inicio.mp3'; 
  //     audio.load();
  //     audio.play(); 
  //   }

  //   reproducirSonidoCierre( ) { 
  //     let audio = new Audio();
  //     audio.src = './../../assets/sonidos/inicio.mp3'; 
  //       audio.load();
  //       audio.play();   
  //   }


    //
    // vibracionError(){
    //   this.vibration.vibrate(3000);
    // }

    //toast mostrar mensaje de error
    async mostrartToast(mensaje:string) {

      const toast = await this.toastController.create({
        message: mensaje,
        position: 'bottom',
        duration: 3000
      });
  
      toast.present();
    }

    async successToast(message:string, durationMS?:number) {
      const toast = await this.toastController.create({
        message: message,
        duration: typeof(durationMS) !== 'undefined'? durationMS : 3000,
        position: 'bottom',
        color: 'success',
      });
  
      toast.present();
    }
  
    async warningToast(message:string, durationMS?:number) {
      const toast = await this.toastController.create({
        message: message,
        duration: typeof(durationMS) !== 'undefined' ? durationMS : 3000,
        position: 'bottom',
        color: 'warning',
      });
  
      toast.present();
    }

    async errorToast(message:string, durationMS?:number) {
      const toast = await this.toastController.create({
        message: message,
        duration: typeof(durationMS) !== 'undefined' ? durationMS : 3000,
        position: 'bottom',
        color: 'danger',
      });
  
      toast.present();
    }

    //Spinner

}
