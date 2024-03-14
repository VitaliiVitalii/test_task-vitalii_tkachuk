import { Component, OnInit } from '@angular/core';
import { CertificateInfo } from './models/certificateInfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //Масив існуючих сертифікатів
  public existingCertificates: CertificateInfo[] = [];
  //Логічні значення для керування відображенням компоненту з короткою інформацією та компоненту з додаванням нових сертифікатів
  public showCertificateInfo: boolean = true;
  public showCertificateAdd: boolean = false;
  
  ngOnInit(): void {
    this.loadCertificatesFromLocalStorage();
    
  }

  //Функція для отримання існуючих сертифікатів З localStorage.
  loadCertificatesFromLocalStorage(): void {
    // Отримуємо збережені сертифікати в змінну
    const storedCertificates = localStorage.getItem('certificates');

    // Перевіряємо якщо збережені сертифікати є, то присвоюємоїх у змінну
    if (storedCertificates) {
      this.existingCertificates = JSON.parse(storedCertificates);

    }

  }

  //Функція для переключення відображення компонентів
  toggleCertificateInfo(): void {
    this.showCertificateInfo = !this.showCertificateInfo;
    this.showCertificateAdd = !this.showCertificateInfo;

  }

}
