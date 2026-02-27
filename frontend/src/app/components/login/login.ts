import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  mensaje: string = '';
  tipo: boolean = false;

  constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      //console.log(code);
      switch (code) {
        case "1":
          this.mensaje = 'Se ha enviado un mensaje de confirmación a su correo electrónico. Por favor confirme en el enlace';
          this.tipo = true;
          this.cd.detectChanges();
          break;
      }

    });
  }
}
