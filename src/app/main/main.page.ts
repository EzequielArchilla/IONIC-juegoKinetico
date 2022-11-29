import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UtilidadesService } from '../services/utilidades.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(
    private router:Router,
    private loadingCtrl:LoadingController,
    private utilidadesSvc:UtilidadesService,
    private authSvc:AuthService
  ) { }

  ngOnInit() {
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

  cerrarSesion(){
    this.utilidadesSvc.successToast("Usuario deslogueado");
    setTimeout(()=>{
      this.authSvc.signOut();
      this.router.navigate(['home']);
    },2000)
  }
}
