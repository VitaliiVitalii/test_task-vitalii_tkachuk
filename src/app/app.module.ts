import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CertificateListComponent } from './components/certificates/certificate-list/certificate-list.component';
import { CertificateAddComponent } from './components/certificates/certificate-add/certificate-add.component';
import { CertificateInfoComponent } from './components/certificates/certificate-info/certificate-info.component'


@NgModule({
  declarations: [
    AppComponent,
    CertificateListComponent,
    CertificateAddComponent,
    CertificateInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxFileDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
