class Todo {
    // En typescript debemos definir antes del constructor los atributos de clase y su tipo
    id: string;
    text: string;

    constructor(todoText: string) {
        this.id = new Date().toISOString();
        this.text = todoText;
    }
}

export default Todo;