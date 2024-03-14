import { Component } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import * as pkijs from 'pkijs'; 
import * as asn1js from 'asn1js';
import { CertificateInfo } from '../../../models/certificateInfo';

@Component({
  selector: 'app-certificate-add',
  templateUrl: './certificate-add.component.html',
})
export class CertificateAddComponent {

  // Масив файлів які перетягнули на компонент
  public files: NgxFileDropEntry[] = [];
  // Об'єкт з інформацією про сертифікат
  public cerInfo = {} as CertificateInfo;

  // Обробник події перетягування файлів на компонент
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (file.name.toLowerCase().endsWith('.cer')) {
            const reader = new FileReader();

            reader.onload = () => {
              const arrayBuffer = reader.result as ArrayBuffer;
              const uint8Array = new Uint8Array(arrayBuffer);
              
              try {
                const asn1 = asn1js.fromBER(uint8Array.buffer);
                
                const cert = new pkijs.Certificate({ schema: asn1.result });

                // Отримання потрібної інформації про сертифікат
                const subjectName = cert.subject.typesAndValues[0].value.valueBlock.value;
                const issuerName = cert.issuer.typesAndValues[0].value.valueBlock.value;
                const validFromDate = new Date(cert.notBefore.value).toISOString().split('T')[0];
                const validToDate = new Date(cert.notAfter.value).toISOString().split('T')[0];
                
                // Заповнення об'єкта з інформацією про сертифікат
                this.cerInfo = {
                  subjectName: subjectName,
                  issuerName: issuerName,
                  validFrom: validFromDate,
                  validTo: validToDate

                };
                
                // Пуш обєкта з інформацією про сертифікат в масив та у Local Storage
                const certificates: CertificateInfo[] = JSON.parse(localStorage.getItem('certificates') || '[]');
                certificates.push(this.cerInfo);
                localStorage.setItem('certificates', JSON.stringify(certificates));

              } catch (error) {
                console.error('Error parsing certificate:', error);

              }

            };
            reader.readAsArrayBuffer(file);
          } else {
            console.error('Unsupported file type:', file.name);

          }

        });

      }

    }

  }

  public fileOver(event: any){
    console.log(event);

  }

  public fileLeave(event: any){
    console.log(event);

  }
}
