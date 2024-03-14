import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CertificateInfo } from '../../../models/certificateInfo';
import { CertificateService } from '../../../services/certificate.service';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss']
})
export class CertificateListComponent implements OnInit {
  //Прокидаємо пропсами з app-component масив сертифікат з Local storage
  @Input() certificates: CertificateInfo[] = [];
  //Емітимо подію перемикання між компонентами по кліці на кнопку
  @Output() addButtonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  public buttonText: string = 'Додати';
  protected isVisible: boolean = true;

  // Змінна для збереження індексу обраного сертифіката
  public selectedCertificateIndex: number | null = null; // Зберігаємо індекс обраного сертифіката

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    // При завантаженні компонента перевіряємо, чи є сертифікати та вибираємо перший щоб додати стилі для обраного сертифікату
    if (this.certificates && this.certificates.length > 0) {
      this.selectCertificate(0); 

    }

  }

  // Функція вибору сертифіката за індексом
  selectCertificate(index: number): void {
    this.selectedCertificateIndex = index;
    const selectedCertificate = this.certificates[index];
    // Встановлення обраного сертифіката через сервіс
    this.certificateService.setSelectedCertificate(selectedCertificate);

  }

  // Обробник кліку на кнопку "Додати"
  onAddButtonClick(): void {
    this.isVisible = !this.isVisible;
    this.buttonText = this.buttonText === 'Додати' ? 'Назад' : 'Додати';
    this.addButtonClicked.emit(true);
    this.loadCertificatesFromLocalStorage();

  }
  
  // оновлюю список сертифікатів з Local Storage
  private loadCertificatesFromLocalStorage(): void {
    const storedCertificates = localStorage.getItem('certificates');
    if (storedCertificates) {
      this.certificates = JSON.parse(storedCertificates);
      // При оновленні списку, якщо індекс обраного сертифіката є, вибираємо його знову
      if (this.selectedCertificateIndex !== null) {
        this.selectCertificate(this.selectedCertificateIndex);

      }

    }

  }

}
