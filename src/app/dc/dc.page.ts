import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dc',
  templateUrl: './dc.page.html',
  styleUrls: ['./dc.page.scss'],
})
export class DCPage implements OnInit {

  constructor(private authSvc:AuthService,
    private loadingCtrl:LoadingController,
    private router:Router    ) { }

  ngOnInit() {
  }

  asignarHeroe(heroe:string){
    switch(heroe){
      case 'batman':
        this.authSvc.heroe = "Batman";
        this.authSvc.imagenHeroe = "../../assets/dc/1"
        this.navigateTo('juego');
      break;
      case 'superman':
        this.authSvc.heroe = "Superman";
        this.authSvc.imagenHeroe = "../../assets/dc/2"
        this.navigateTo('juego');
      break;
      case 'flash':
        this.authSvc.heroe = "Flash";
        this.authSvc.imagenHeroe = "../../assets/dc/3"
        this.navigateTo('juego');
      break;
      case 'acuaman':
        this.authSvc.heroe = "Acuaman";
        this.authSvc.imagenHeroe = "../../assets/dc/4"
        this.navigateTo('juego');
      break;
      case 'mujerMaravilla':
        this.authSvc.heroe = "Mujer Maravilla";
        this.authSvc.imagenHeroe = "../../assets/dc/5"
        this.navigateTo('juego');
      break;
    }
  }

  navigateTo(url: string) {
    this.autoHideShow();
    setTimeout(() => {
      this.router.navigateByUrl(url);
    }, 2000);
  }

  autoHideShow() {
    this.loadingCtrl
      .create({
        message: 'Cargando...',
        duration: 2000,
        translucent: true,
        cssClass: 'ion-loading-class',
        spinner: 'crescent',
      })
      .then((res) => {
        res.present();
        res.onDidDismiss().then((res2) => {
          console.log('Loader closed', res2);
        });
      });
  }
}
