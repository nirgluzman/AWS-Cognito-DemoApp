export async function test(element: HTMLButtonElement) {
  element.addEventListener('click', () => {
    console.log('test');
  });
}
