import { NgModule, RendererFactory2, Renderer2 } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './GraphQLModule';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    GraphQLModule
  ],
  providers: [
    {
      provide: Renderer2,
      useFactory: (rendererFactory: RendererFactory2) => rendererFactory.createRenderer(null, null),
      deps: [RendererFactory2]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
