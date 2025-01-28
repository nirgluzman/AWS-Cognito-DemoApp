import './style.css';

import { test } from './login';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <button id="counter" type="button">Test authN</button>
    </div>
  </div>
`;

test(document.querySelector<HTMLButtonElement>('#counter')!);
