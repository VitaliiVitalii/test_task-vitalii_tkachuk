import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CertificateService } from '../../../services/certificate.service';
import { CertificateInfo } from '../../../models/certificateInfo';

@Component({
  selector: 'app-certificate-info',
  templateUrl: './certificate-info.component.html',
  styleUrls: ['./certificate-info.component.scss']
})
export class CertificateInfoComponent implements OnInit, OnDestroy {
  // Поточний вибраний сертифікат
  public selectedCertificate: CertificateInfo | null = null; 
  // Підписка на сервіс для отримання сертифікату
  private subscription: Subscription | undefined; 

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    this.subscription = this.certificateService.getSelectedCertificate().subscribe(certificate => {
      this.selectedCertificate = certificate;
      
    });

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); 

    }

  }

}
