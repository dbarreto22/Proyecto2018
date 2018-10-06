import { Component, OnInit } from '@angular/core';
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  artistas;

  termino: string = "";

  constructor(private _spotifyService: SpotifyService) {


  }

  buscar() {
    this._spotifyService.getUser(this.termino).subscribe((res) => {
      console.log(res)
    });
  }

  ngOnInit() {

  }

}
