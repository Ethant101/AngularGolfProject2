import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  mybutton = document.getElementById("scrollButton");



  constructor() { }

  ngOnInit(): void {
  }

  handleToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

}
