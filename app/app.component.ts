import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
      <div>
        <div>
          <div>A</div>
          <div>B</div>
        </div>
        <div>
          <div>C</div>
          <div>D</div>
        </div>
      </div>`,
  styles: [
`
:host > div {
  width: 75vw;
  height: 75vh;
  display: flex;
  flex-direction: column;
}
:host > div > div {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
}
:host > div > div > div {
  border: 1px solid gray;
  margin: 10px;
  padding: 10px;
  flex-grow: 1;
}
`
  ]
})
export class AppComponent { }
