import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../clases/usuario';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilidadesService } from '../services/utilidades.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Photo } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const auth = getAuth();

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  show_error: boolean = false; //
  descripcion_error: string = '';
  fotoHabilitar:boolean=false;
  scannnedResult: any;
  content_visibility = '';
  scan_visibility = 'hidden';
  scanActive = false;
  dniData:any;

  email: string = '';
  password: string = '';
  password2: string = '';
  nombre: string = '';
  apellido: string = '';
  dni: number = 0;
  error = {
    hasError: false,
    message: '',
  };
  listUsuarios: any[];
  altaForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private authService:AuthService,
    private router: Router,
    public loadingCtrl: LoadingController,
    private usuarioService: UsuarioService,
    private fb:FormBuilder,
    private utilidadesSrv:UtilidadesService,
    private spinner:NgxSpinnerService
  ) {
    this.listUsuarios = [];
    this.altaForm = this.fb.group({
      nombre: ['', Validators.compose([Validators.required])],
      apellido: ['', Validators.compose([Validators.required])],
      email: ["", [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {}

  async successToast() {
    const toast = await this.toastController.create({
      message: 'Registrado correctamente',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });

    toast.present();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: "Error al registrar",
      duration: 2000,
      position: 'bottom',
      color: 'warning',
    });

    toast.present();
  }

  signUp() {
    var usuario = new Usuario();
    usuario.mail = this.altaForm.controls['email']?.value;
    usuario.nombre = this.altaForm.controls['nombre']?.value;
    usuario.apellido = this.altaForm.controls['apellido']?.value;
    this.password = this.altaForm.controls['password'].value;

    console.log(usuario);
    this.authService
    .register(usuario.mail, this.password)
    .then((userCredential) => {
      // Signed in
      this.usuarioService.crearUsuario(usuario).then((ok) => {
        usuario.id = ok.id;
        this.usuarioService.update(usuario.id, {id: usuario.id}).then((ok)=>{
          this.successToast();
          this.authService.usuarioLogueado = usuario;
          this.authService.logueado = true;
          this.navigateTo('main');
        })
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.errorToast();
      setTimeout(()=>{
        this.navigateTo('home');
      },2000)
    });
  }

  // comprobacionDeErrores() {
  //   if (this.email === '' || this.password === '' || this.nombre === '' || this.apellido === '') {
  //     this.error.hasError = true;
  //     this.error.message = 'Faltan completar campos';
  //     return;
  //   }
  //   if (this.password.length < 8) {
  //     this.error.hasError = true;
  //     this.error.message = 'La contraseña no tiene la longitud minima';
  //     return;
  //   }
  // }

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

  ngAfterViewInit(): void {
    BarcodeScanner.prepare();
  }

  Errores(error:any)
  {
    if(error.code == 'auth/email-already-in-use')
      {
        this.utilidadesSrv.errorToast('El correo ya está en uso.');
      }
      else if(error.code == 'auth/missing-email' || error.code == 'auth/internal-error')
      {
        this.utilidadesSrv.errorToast('No pueden quedar campos vacíos');
      }
      else if(error.code == 'auth/weak-password')
      {
        this.utilidadesSrv.errorToast('La contraseña debe tener al menos 8 caracteres');
      }
      else
      {
        this.utilidadesSrv.errorToast('Mail o contraseña invalidos');
      }
  }
}
