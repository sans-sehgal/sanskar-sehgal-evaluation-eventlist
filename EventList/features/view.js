class EventView{
    constructor(){
        this.addBtn = document.querySelector(".add-btn")
        this.table = document.getElementById("my-table")
        this.tableBody = document.getElementById("eventTableBody");


    }

    addTempTaskToTable(index, {eventName, startDate, endDate}){
        // console.log(index)

        const newRow = this.table.insertRow(index+1);

        const eventCell = document.createElement('td');
        const eventInput = document.createElement('input');
        eventInput.type = 'text';
        eventInput.value = eventName
        eventInput.placeholder = 'Event Name';
        eventInput.classList.add('event-name');

        eventCell.appendChild(eventInput);

        const startCell = document.createElement('td');
        const startInput = document.createElement('input');
        startInput.type = 'date';
        startInput.value = startDate
        startInput.classList.add('start-date');
        startCell.appendChild(startInput);

        const endCell = document.createElement('td');
        const endInput = document.createElement('input');
        endInput.type = 'date';
        endInput.value = endDate
        endInput.classList.add('end-date');
        endCell.appendChild(endInput);

        const actionCell = document.createElement('td');
        actionCell.classList.add('actions');
        const addButton = document.createElement('button');
        addButton.classList.add('add');
        addButton.innerText = '✔';
        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel');
        cancelButton.innerText = '✗';

        actionCell.appendChild(addButton);
        actionCell.appendChild(cancelButton);

        newRow.appendChild(eventCell);
        newRow.appendChild(startCell);
        newRow.appendChild(endCell);
        newRow.appendChild(actionCell);

        if(index==null)
            this.tableBody.appendChild(newRow);
        else{
            this.table.insertRow(index)
        }
    }
    

    addEditTaskToTable(index, {id, eventName, startDate, endDate}){
        // console.log(index)

        const newRow = this.table.insertRow(index+1);
        newRow.setAttribute('id', id)

        const eventCell = document.createElement('td');
        const eventInput = document.createElement('input');
        eventInput.type = 'text';
        eventInput.value = eventName
        eventInput.placeholder = 'Event Name';
        eventInput.classList.add('event-name');

        eventCell.appendChild(eventInput);

        const startCell = document.createElement('td');
        const startInput = document.createElement('input');
        startInput.type = 'date';
        startInput.value = startDate
        startInput.classList.add('start-date');
        startCell.appendChild(startInput);

        const endCell = document.createElement('td');
        const endInput = document.createElement('input');
        endInput.type = 'date';
        endInput.value = endDate
        endInput.classList.add('end-date');
        endCell.appendChild(endInput);

        const actionCell = document.createElement('td');
        actionCell.classList.add('actions');
        const addButton = document.createElement('button');
        addButton.classList.add('save-changes');
        addButton.innerText = '💾';
        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel');
        cancelButton.innerText = '✗';

        actionCell.appendChild(addButton);
        actionCell.appendChild(cancelButton);

        newRow.appendChild(eventCell);
        newRow.appendChild(startCell);
        newRow.appendChild(endCell);
        newRow.appendChild(actionCell);

        if(index==null)
            this.tableBody.appendChild(newRow);
        else{
            this.table.insertRow(index)
        }
    }

    addFinalTaskToTable(index, {id, eventName, startDate, endDate}){

        // console.log(index)
        const tr = this.table.insertRow(index);
        tr.setAttribute('id', id)

        const tdEvent = document.createElement('td');
        tdEvent.textContent = eventName;
        tdEvent.classList.add('event-name')

        const tdStartDate = document.createElement('td');
        tdStartDate.textContent = startDate;
        tdStartDate.classList.add('start-date')

        const tdEndDate = document.createElement('td');
        tdEndDate.textContent = endDate;
        tdEndDate.classList.add('end-date')

        const tdActions = document.createElement('td');
        tdActions.classList.add('actions');

        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.textContent = '✏️';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = '🗑️';

        tdActions.appendChild(editButton);
        tdActions.appendChild(deleteButton);

        tr.appendChild(tdEvent);
        tr.appendChild(tdStartDate);
        tr.appendChild(tdEndDate);
        tr.appendChild(tdActions);


        // this.tableBody.appendChild(tr);
    }

    removeTask(rowIdx){
        this.table.deleteRow(rowIdx);
    }
    
}