import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UtilidadesService } from '../services/utilidades.service';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@awesome-cordova-plugins/device-motion/ngx';
import { UsuarioService } from '../services/usuario.service';
import { Puntaje } from '../clases/puntaje';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
})
export class JuegoPage implements OnInit {
  estilo:string = 'margin-left:43vw;margin-top:43vh;';
  acceleration: any;
  iniciado: boolean = false;
  subscription: any;
  vertical: number = 43;
  horizontal: number = 43;
  listaPuntajes:any[] = [];

  valorV:number = 0;
  valorH:number = 0;

  aumento = 1;
  decremento = -1;

  imagenHeroe:string = '';
  timer:number = 0;
  //inicia en 43:35
  //0 - 85
  //0 - 93

  constructor(private router:Router,
    private authSvc:AuthService,
    private utilidadesSvc:UtilidadesService,
    private loadingCtrl:LoadingController,
    private deviceMotion:DeviceMotion,
    private platform:Platform,
    private firestore:UsuarioService) { 
      platform.ready().then(() => {
        console.log(platform.width());
        console.log(platform.height());
  })}

  ionViewDidEnter(){
    this.imagenHeroe = this.authSvc.imagenHeroe + ".png";
    console.log(this.imagenHeroe);
  }

  ngOnInit() {
    this.firestore.obtenerPuntaje().subscribe((data)=>{
      this.listaPuntajes = data.sort((a:any,b:any)=>a.puntaje - b.puntaje);
      this.listaPuntajes = this.listaPuntajes.slice(0, 4);
      console.log(this.listaPuntajes);
    })
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


  iniciarJuego()
  {
        let optionsDeviceMotion: DeviceMotionAccelerometerOptions = {
          frequency: 30,
        };

        this.subscription = this.deviceMotion
          .watchAcceleration(optionsDeviceMotion)
          .subscribe((acceleration: DeviceMotionAccelerationData) => {

            this.timer++;

            if(this.timer == 500){
              this.aumento = 1.5
              this.decremento = -1.5
            }
            if(this.timer == 1000)
            {
              this.aumento = 2
              this.decremento = -2

            }
            if(this.timer == 1500)
            {
              this.aumento = 3
              this.decremento = -3
            }

            if(acceleration.x > 1 && (acceleration.y > -1 && acceleration.y <= 1))
            {
              this.valorH = this.decremento
              this.valorV = 0
            }
            if(acceleration.x < -1 && (acceleration.y > -1 && acceleration.y <= 1))
            {
              this.valorH = this.aumento
              this.valorV = 0
            }
            if(acceleration.y > 1 && (acceleration.x > -1 && acceleration.x <= 1))
            {
              this.valorV = this.aumento
              this.valorH = 0
            }
            if(acceleration.y < -1 && (acceleration.x > -1 && acceleration.x <= 1))
            {
              this.valorV = this.decremento
              this.valorH = 0
            }
            if(acceleration.x > 1 && acceleration.y > 1)
            {
              this.valorV = this.aumento
              this.valorH = this.decremento
              
            }
            if(acceleration.x > 1 && acceleration.y < -1)
            {
              this.valorV = this.decremento
              this.valorH = this.decremento
              
            }
            if(acceleration.x < -1 && acceleration.y > 1)
            {
              this.valorV = this.aumento
              this.valorH = this.aumento
              
            }
            if(acceleration.x < -1 && acceleration.y < -1)
            {
              this.valorV = this.decremento
              this.valorH = this.aumento
              
            }

            this.horizontal += this.valorH;
            this.vertical += this.valorV;
            this.estilo = 'margin-left:'+this.horizontal+'vw;margin-top:'+this.vertical+'vh;';

            if(this.vertical > 93 || this.horizontal > 85 || this.vertical < 0 || this.horizontal < 0)
            {
              this.vertical = 43;
              this.horizontal = 43;
              this.aumento = 1;
              this.decremento = -1;
              this.iniciado = false;
              let puntaje = new Puntaje();
              puntaje.puntaje = this.timer;
              puntaje.usuario = this.authSvc.usuarioLogueado;
              this.firestore.crearPuntaje(puntaje).then((ok)=>{
                this.utilidadesSvc.successToast("Puntaje cargado correctamente");
                this.timer = 0;
                this.subscription.unsubscribe();
              }).catch((err)=>{
                this.utilidadesSvc.errorToast("Error al grabar puntaje");
              this.subscription.unsubscribe();
              })
              return;
            }
          });
        this.iniciado = true;
  }
  
  moverPersonaje()
  {

  }
}
