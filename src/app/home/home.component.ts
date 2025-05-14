import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { EmailService } from '../services/email.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit {
  @ViewChild('videoElement', { static: false }) video!: ElementRef<HTMLVideoElement>;

  formulario = {
    peso: '',
    altura: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  };
  
  movil = false;

  ngOnInit(): void {
    this.verificarResolucion();
    window.addEventListener('resize', this.verificarResolucion.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.verificarResolucion.bind(this));
  }

  verificarResolucion(): void {
    this.movil = window.innerWidth <= 768;
  }

  constructor(private emailService: EmailService) {}

  //Encargado de abrir links de botones en testimonios
  abrirEnlace(url: string): void {
    window.open(url, '_blank'); // Abre el enlace en una nueva pestaña
  }

  //Encargado de la reproduccion del video
  mostrarBotonSonido = true;

  ngAfterViewInit(): void {
    const videoEl = this.video.nativeElement;
    videoEl.muted = true;
    videoEl.pause(); // Asegura que esté detenido al principio
  }

  activarVideoConSonido(): void {
    const videoEl = this.video.nativeElement;
    videoEl.muted = false;
    videoEl.play();
    this.mostrarBotonSonido = false; // Oculta el botón
  }

  //Encaragdo de enviar correo electronico + show para mensaje de enviado correctamente
  showSuccess = false;
  showError = false;

  enviarFormulario(form: NgForm) {
    // Asegurarse de que todos los campos sean válidos
    if (this.formulario.peso == '' || this.formulario.altura == '' || this.formulario.nombre == '' || this.formulario.apellido == '' || this.formulario.email == '' || this.formulario.telefono == '') {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 5000); // Ocultar la alerta de error después de 5 segundos
      return;
    }else{
      this.emailService.enviarCorreo(this.formulario).subscribe(
        response => {
          // Mostrar alerta de éxito
          this.showSuccess = true;
          
          form.resetForm();
  
          setTimeout(() => {
            this.showSuccess = false;
          }, 10000); // Ocultar la alerta de éxito después de 10 segundos
        },
        error => {
          // Mostrar alerta de error si ocurre algún problema
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 10000); // Ocultar la alerta de error después de 10 segundos
          console.error(error);
        }
      );
    } 
  }
}
