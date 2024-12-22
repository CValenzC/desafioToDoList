const tasks = [
    { id: 1, name: 'Ordenar la habitación y hacer aseo', completed: false },
    { id: 2, name: 'Poner a lavar ropa', completed: false },
    { id: 3, name: 'Ordenar y ventilar la oficina', completed: false },
    { id: 4, name: 'Ponerme al día con mi podcast', completed: false }
]

const addInput = document.querySelector('.addInput')
const addButton = document.querySelector('.addButton')
const tasksContainer = document.getElementById('tasks')
const totalElement = document.getElementById('total')
const doneElement = document.getElementById('done')

const renderTasks = () => {
    tasksContainer.innerHTML = tasks
        .map(
            (task) => `
            <tr>
                <td>${task.id}</td>
                <td class="${task.completed ? 'completed' : ''}">${task.name}</td>
                <td>
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onchange="changeStatus(${task.id})">
                </td>
                <td>
                    <i class="fa-solid fa-circle-minus" onclick="deleteTask(${task.id})"></i>
                    <span>Borrar</span>
                </td>
            </tr>
        `
        )
        .join('')

    totalElement.textContent = tasks.length
    doneElement.textContent = tasks.filter((task) => task.completed).length
}

const addTask = () => {
    const taskName = addInput.value.trim()
    if (taskName === '') return alert('Por favor, ingresa una tarea válida.')

    const lastId = tasks.length > 0 
        ? Math.max(...tasks.map(task => task.id))
        : 0

    const newTask = {
        id: lastId + 1,
        name: taskName,
        completed: false
    }

    tasks.push(newTask)
    addInput.value = ''
    renderTasks()
};

const changeStatus = (id) => {
    const task = tasks.find((task) => task.id === id)
    if (task) task.completed = !task.completed
    renderTasks()
};

const deleteTask = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id)
    if (taskIndex !== -1) tasks.splice(taskIndex, 1)
    renderTasks()
};

addButton.addEventListener('click', addTask)
renderTasks()
