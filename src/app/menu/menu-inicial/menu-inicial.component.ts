import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.scss']
})
export class MenuInicialComponent implements OnInit {

  username:any = '';

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
    this.username = params['username'];
  });}

  ngOnInit(): void {
    console.log(this.username)
  }

}
