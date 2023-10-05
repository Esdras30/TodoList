// Function to save a task
function saveTask(e) {
    e.preventDefault()
    let title = document.getElementById('title').value.trim();
    let description = document.getElementById('description').value.trim();

    if (title !== '' && description !== '') {
        let task = {
            title,
            description
        };

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        if( typeof task === 'object'){
            console.log('Nueva tarea registrada: ', task);
            
        }        

        document.getElementById('title').value = '';
        document.getElementById('description').value = '';

        showTasks();
    } else {
        alert('Por favor, escriba una descripcion de la tarea');
    }

    
}



// Function to show tasks
function showTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let verTareas = document.getElementById('tasks');
    verTareas.textContent = '';

    if (tasks.length === 0) {
        verTareas.textContent = 'No hay tareas disponibles.';
    } else {
        let fragment = document.createDocumentFragment();
        
        tasks.forEach(task => {
            let title = task.title;
            let description = task.description; 

            let paragraph = document.createElement('p');
            paragraph.textContent = `${title} - ${description}`;
            paragraph.style.wordWrap = 'break-word'; // Agregar la propiedad para permitir saltos de línea
            paragraph.style.margin = '0 15px'; // Agregar la propiedad para permitir saltos de línea

            
            let card = document.createElement('div');
            card.className = 'card mb-3';
            card.style.marginBottom = '15px'
            card.style.padding = '20px 20px 20px 30px'
            card.style.marginBottom = '10px'

            let cardBody = document.createElement('div');
            cardBody.className = 'card-body';
                        
            const deleteButton = document.createElement('a');
            deleteButton.href = '#';
            deleteButton.className = 'btn btn-danger ml-5';
            deleteButton.textContent = 'Delete';


            //Esta es una técnica llamada "asignación en lote" (batch assignment) 
            //para definir múltiples propiedades CSS en un solo paso
            Object.assign(deleteButton.style, {
                backgroundColor: '#f72711',
                color: 'white',
                border: 'none',
                padding: '7px 20px 7px 27px',
                fontWeight: '500',
                margin: '10px 5px 0 0',
                fontSize: '12px',
                display: 'block',
                width: '35px',
                textDecoration: 'none'
              })
              
           
             // Ahora, puedes agregar el botón a tu DOM
            document.body.appendChild(deleteButton);


            // Construye la estructura del DOM
            paragraph.appendChild(deleteButton);
            cardBody.appendChild(paragraph);
            card.appendChild(cardBody);
            fragment.appendChild(card);
            card.appendChild(paragraph);



            deleteButton.addEventListener('click', function(event) {
                deleteTask(title, event);
            });

        });

        verTareas.appendChild(fragment);

    }
}

showTasks();

// Function to delete a task
function deleteTask(title, e) {
    e.preventDefault()
    let tareas = JSON.parse(localStorage.getItem('tasks')) || [];
    tareas = tareas.filter(tarea => tarea.title !== title);
    localStorage.setItem('tasks', JSON.stringify(tareas));

    showTasks();
}


// Add events listener to the form to save tasks
document.getElementById('formTask').addEventListener('submit', saveTask);


document.getElementById('formTask').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        saveTask(event);
       
    }
});

