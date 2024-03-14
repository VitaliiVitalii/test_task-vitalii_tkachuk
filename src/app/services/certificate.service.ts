import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
    })
    export class CertificateService {
    private selectedCertificateSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    setSelectedCertificate(certificate: any): void {
        this.selectedCertificateSubject.next(certificate);
    }

    getSelectedCertificate(): Observable<any> {
        return this.selectedCertificateSubject.asObservable();
    }
}
