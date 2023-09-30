export default class LocalStoreService {
    addTodo(title, description, priority, dueDate) {
        const date = new Date()
        const dueDateConvert = new Date(dueDate)
        const todoList = this.getTodoList()

        if (todoList) {
            todoList.push({ 'title': title, 'description': description, 'createDate': date, 'priority': parseInt(priority), 'dueDate': dueDateConvert })
            localStorage.setItem('todoList', JSON.stringify(todoList))
        }
        else {
            const arr = [{ 'title': title, 'description': description, 'createDate': date, 'priority': parseInt(priority), 'dueDate': dueDateConvert }]
            localStorage.setItem('todoList', JSON.stringify(arr))
        }
    }

    getTodoList() {
        const todoList = localStorage.getItem('todoList')
        if (todoList) {
            return JSON.parse(todoList)
        }
        else {
            return false
        }
    }

    getTodoListByIndex(index) {
        const todoList = this.getTodoList()
        return todoList[index]
    }

    editTodo(index, title, description, priority, dueDate) {
        const todoList = this.getTodoList()

        todoList[index].title = title
        todoList[index].description = description
        todoList[index].priority = priority
        todoList[index].dueDate = dueDate

        localStorage.setItem('todoList', JSON.stringify(todoList))
    }

    removeTodo(index) {
        const todoList = this.getTodoList()
        todoList.splice(index, 1)
        localStorage.setItem('todoList', JSON.stringify(todoList))
    }


}