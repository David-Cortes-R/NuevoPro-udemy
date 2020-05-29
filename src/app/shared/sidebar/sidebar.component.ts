import { Component, OnInit } from '@angular/core';

import { SidebarService, UsuarioService } from 'src/app/services/index.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    public _sidebar: SidebarService,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
  }

}
