import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = `${environment.apiUrl}/send-email`; // URL del backend

  constructor(private http: HttpClient) {}

  enviarCorreo(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }
}
