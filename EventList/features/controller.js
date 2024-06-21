class EventController{
    constructor(view){
        this.view = view;
        this.initApp();
    }

    initApp(){
        this.fetchTasks();
        this.setUpEvents();
    }

    fetchTasks(){
        fetch('http://localhost:3000/events')
            .then(response => response.json()) 
            .then(data => {
                data.forEach((element, index) => {
                    this.view.addFinalTaskToTable(index+1, element);
                }) 
            })
            .catch(error => {
                console.error('Error fetching todos:', error); 
            });
    }

    setUpEvents(){
        this.setUpAddEvent();
        this.setUpTableEvents();
    }

    setUpAddEvent(){
        this.view.addBtn.addEventListener("click", (e)=>{
            const eventToAdd = {
                "eventName": "",
                "startDate": "",
                "endDate": ""
            }
            this.view.addTempTaskToTable(null, eventToAdd);
        })
    }

    setUpTableEvents(){
        this.view.table.addEventListener("click", (e)=>{
            if(e.target.classList.contains("add")){
                const doubleParent = e.target.parentElement.parentElement;
                const eventName = doubleParent.querySelector('.event-name').value;
                const startDate = doubleParent.querySelector('.start-date').value;
                const endDate = doubleParent.querySelector('.end-date').value;
                const i = doubleParent.rowIndex;
              
                const eventToAdd = {
                    "eventName": eventName,
                    "startDate": startDate,
                    "endDate": endDate
                }

                fetch('http://localhost:3000/events', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(eventToAdd)
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to add event: ' + response.statusText);
                    }
                })
                .then(data => {
                    console.log('Event added:', data);
        
                    this.view.removeTask(i);
                    this.view.addFinalTaskToTable(i, eventToAdd);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
            else if(e.target.classList.contains("cancel")){
                const doubleParent = e.target.parentElement.parentElement;
                const id = doubleParent.getAttribute('id');
                const i = doubleParent.rowIndex;

                console.log(id)
                if(id){
                    fetch(`http://localhost:3000/events/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Failed to fetch event: ' + response.statusText);
                        }
                    })
                    .then(data => {
                        this.view.addFinalTaskToTable(i, data)
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
                this.view.removeTask(i);
            }
            else if(e.target.classList.contains("edit")){
                const doubleParent = e.target.parentElement.parentElement;
                // console.log(doubleParent)
                const eventName = doubleParent.querySelector('.event-name').textContent;
                const startDate = doubleParent.querySelector('.start-date').textContent;
                const endDate = doubleParent.querySelector('.end-date').textContent;
                const i = doubleParent.rowIndex;
                const eventToAdd = {
                    "eventName": eventName,
                    "startDate": startDate,
                    "endDate": endDate,
                    "id": doubleParent.getAttribute('id')
                }
                // console.log(i)
                this.view.removeTask(i);
                this.view.addEditTaskToTable(i-1, eventToAdd);
                // console.log(eventName, startDate, endDate, i)
            }
            else if(e.target.classList.contains("delete")){
                const doubleParent = e.target.parentElement.parentElement;
                const eventId = doubleParent.getAttribute('id')

                fetch(`http://localhost:3000/events/${eventId}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (response.ok) {
                        // console.log('Event deleted:', eventId);
                        const i = doubleParent.rowIndex;
                        this.view.removeTask(i);
                    } else {
                        throw new Error('Failed to delete event: ' + response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
                
            }
            else if(e.target.classList.contains("save-changes")){
                const doubleParent = e.target.parentElement.parentElement;
                const eventName = doubleParent.querySelector('.event-name').value;
                const startDate = doubleParent.querySelector('.start-date').value;
                const endDate = doubleParent.querySelector('.end-date').value;
                const i = doubleParent.rowIndex;
                const id = doubleParent.getAttribute('id');
                console.log(eventName, startDate, endDate, i)


                const eventToUpdate = {
                    eventName: eventName,
                    startDate: startDate,
                    endDate: endDate
                };
            
                fetch(`http://localhost:3000/events/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(eventToUpdate)
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to update event: ' + response.statusText);
                    }
                })
                .then(data => {
                    this.view.addFinalTaskToTable(i, data)

                })
                .catch(error => {
                    console.error('Error:', error);
                });
              
            }
        })
    }
}