import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-marvel',
  templateUrl: './marvel.page.html',
  styleUrls: ['./marvel.page.scss'],
})
export class MarvelPage implements OnInit {

  constructor(private authSvc:AuthService,
    private loadingCtrl:LoadingController,
    private router:Router    ) { }

  ngOnInit() {
  }

  asignarHeroe(heroe:string){
    switch(heroe){
      case 'ironMan':
        this.authSvc.heroe = "Iron Man";
        this.authSvc.imagenHeroe = "../../assets/marvel/1"
        this.navigateTo('juego');
      break;
      case 'capitanAmerica':
        this.authSvc.heroe = "Capitan America";
        this.authSvc.imagenHeroe = "../../assets/marvel/2"
        this.navigateTo('juego');
      break;
      case 'thor':
        this.authSvc.heroe = "Thor";
        this.authSvc.imagenHeroe = "../../assets/marvel/3"
        this.navigateTo('juego');
      break;
      case 'spiderman':
        this.authSvc.heroe = "Spiderman";
        this.authSvc.imagenHeroe = "../../assets/marvel/4"
        this.navigateTo('juego');
      break;
      case 'vision':
        this.authSvc.heroe = "Vision";
        this.authSvc.imagenHeroe = "../../assets/marvel/5"
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
