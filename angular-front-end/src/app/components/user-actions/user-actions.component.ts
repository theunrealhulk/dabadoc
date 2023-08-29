import { Component } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.css']
})
export class UserActionsComponent {
  constructor(private apiService: ApiServiceService) { }
  signOut(){
    console.log('loging out...')
    this.apiService.signOut().subscribe(data => {
      //console.log("signedout",data)
      localStorage.removeItem('api_key');
      location.href="http://localhost:4200"

    })
  }
  favorites(){
    console.log("favorites")
  }
}
