// Typescript tiene tipado estatico
function add(a: number, b: number) {
  return a + b;
}

const result = add(2, 5);

console.log(result);

// Typescript necesita ser compilado para generar ficheros js entendibles por el navegador web. Para compilar usamos
// npx tsc filePath.ts, lo que nos generara un archivo filePath.js