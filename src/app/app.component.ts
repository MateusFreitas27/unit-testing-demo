import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {}

  /**
   * Função que realiza a adição de dois números.
   *
   * @param a O primeiro número a ser adicionado.
   * @param b O segundo número a ser adicionado.
   * @returns O resultado da adição dos dois números.
   */
  add(a: number, b: number) {
    return a + b;
  }
}
