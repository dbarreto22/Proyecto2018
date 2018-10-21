import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthenticationService]
})
export class AppComponent {
  title = 'MiUdelar';
  idTipo = 4;
}
