// Primitives: number, string, boolean
// More complex types: arrays, object
// Function types, parameters


// Primitives
let age: number;

age = 1;
age = 1.12;
age = '1';

let userName: string;
userName = 'Adri';
userName = 1;

let isInstructor: boolean;
isInstructor = false;
isInstructor = 'true';

// More complex types
let hobbies: string[]; // Array of strings
hobbies = ['Sports', 'Reading', 1];

let person: { // Esto no crea un objeto, si no que forma parte de la sintaxis de TypeScript para definir el tipado dentro del objeto
    name: string,
    age: number
};

person = {
    name: 'Adri',
    age: 29
};

person = {
    city: 'Madrid'
};

let people: { // Array de objetos con tipado
    name: string,
    age: number
}[];

// Type inference
let course = 'React - The complete guide'; // Por defecto typescript asigna el tipado a partir del valor de la variable
course = 1234;

// Union types
let city: string | number = 'Madrid';
city = 28;

// Type aliases
type Person = {
    name: string,
    age: number
}

let user: Person;
user = {
    name: 'Adri',
    age: 29
};
user = {
    city: 'Madrid'
};

let users: Person[];

// Function and Functions Types
function add(a: number, b: number): number { // poner el tipo de retorno aqui es redundante gracias a Type inference
    return a + b; // Typescript sabe que se va a retornar un valor de tipo number gracias a su Type inference
}

function printLog(value: any) { // Las funciones que no retornan nada especificarian un tipo de retorno :void
    console.log(value);
}

// Generics
/* De esta forma por defecto se retornara un valor de tipo any, lo que puede provocar errores como el split de abajo
function insertAtBeginning(array: any[], value: any) {
    const newArr = [value, ...array];
    return newArr;
}*/
function insertAtBeginning<T>(array: T[], value: T) { // Con <T> (puede ser cualquier nombre) indicamos que se debe mirar los valores concretos para determinar el valor de retorno
    const newArr = [value, ...array];
    return newArr;
}
const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
updatedArray[0].split(''); // Definiendo la funcion con 'Generics' nos indica este error, que de otra forma pasaria desapercibido
const stringArray = ['asdf', 'asdfr'];
const updatedStringArray = insertAtBeginning(stringArray, 'aaaa'); 
const updatedStringArray2 = insertAtBeginning<string>(stringArray, 'aaaa'); // De esta forma definimos nosotros el tipado de <T>, en lugar de dejar a typescript que lo escoja a partir del valor
updatedStringArray[0].split('');