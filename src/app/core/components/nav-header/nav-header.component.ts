import { Component, OnInit } from '@angular/core';
import {NAV_LINKS} from '../../constants/app-constants';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {
//  navLinks:any = NAV_LINKS;

  constructor() { }

  ngOnInit(): void {
  }

}
