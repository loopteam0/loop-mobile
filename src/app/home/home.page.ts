import { Component, OnInit } from '@angular/core';
import { MovieDbService } from '../services/movie-db.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
   
  constructor (private movieDB: MovieDbService){}

  ngOnInit(){

  }
 
  
}
