import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import SignaturePad from 'signature_pad';

@Component({
    selector: 'app-bs-element',
    templateUrl: './bs-element.component.html',
    styleUrls: ['./bs-element.component.scss'],
    animations: [routerTransition()]
})
export class BsElementComponent implements OnInit, AfterViewInit {
  @ViewChild('firmaelectronica',{static:true}) signaturePadElement : any;
  signaturePad:any;
  firma:any;
  constructor(){
  }
  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
  }
  ngOnInit(): void {
  }
  title = 'firmaelectronica';
  limpiarfirma(){
    this.signaturePad.clear();
  }

  deshacerfirma(){
    const datos=this.signaturePad.toData();
    if(datos){
      datos.pop();
      this.signaturePad.fromData(datos);
    }
  }
  descargarimagen(dataURL:any,nombre:any){
    if(navigator.userAgent.indexOf('Safari')>-1 && navigator.userAgent.indexOf('Chrome')===-1){
      window.open(dataURL);
    }else{
      const blob= this.URLtoBlob(dataURL);
      const url= window.URL.createObjectURL(blob);
      console.log(blob);
      const a= document.createElement('a');
      a.href=url;
      a.download=nombre;
      this.firma=blob;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);    
    }
  }
  URLtoBlob(dataURL: any) {
    //console.log(dataURL);
    const partes = dataURL.split(';base64,');
    //console.log(partes);
    const contentType = partes[0].split(':')[1];
    //console.log(contentType);
    const raw=window.atob(partes[1]);
    const rawL=raw.length;
    const array =new Uint8Array(rawL);
    for(let i=0;i<rawL;i++){
      array[i]= raw.charCodeAt(i);
    }
    return new Blob([array],{type:contentType});
  }
  guardarImagenpng(){
    if(this.signaturePad.isEmpty()){
      alert('Debe firmar el documento');
    }else{
      const u= this.signaturePad.toDataURL();
      //console.log(u,'otro');
      this.descargarimagen(u,'firmadigital.png');
      this.firma=u;
    }
  }
}
