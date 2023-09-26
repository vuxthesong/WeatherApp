import { OnInit, Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    @Input() model: any[];

    constructor() {}
    ngOnInit() {}
}
