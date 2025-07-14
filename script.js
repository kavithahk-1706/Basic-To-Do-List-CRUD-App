
document.addEventListener("DOMContentLoaded", ()=>{


const updateTime=()=>
    {
        const now=new Date();
        const formatted_date=now.toDateString();
        document.getElementById('date').innerHTML=formatted_date;
        const formatted_time=now.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});
        document.getElementById('time').innerHTML=formatted_time;

    }

updateTime();

setInterval(updateTime,1000);

let storedTasks=JSON.parse(localStorage.getItem('Tasks')||"[]");

const taskList=document.getElementById('taskList');



const displayUpdatedList=()=>{

    taskList.replaceChildren();
    
    
    
    
    
    const addToViewableTasks=(item,index)=>{
        
        const taskRow=document.createElement("tr");
        taskRow.classList.add('task-text');
        const taskNo=document.createElement("td");
        taskNo.textContent=`${index+1}. `;

        taskCell=document.createElement('td');

        const taskName=document.createElement('p');
        taskName.textContent=item.text;

        const taskCellEdit=document.createElement('td');
        const editButton=document.createElement('button');
        editButton.title='Edit Task';
        editButton.textContent='✏';
        
        const taskCellDel=document.createElement('td');
        const delButton=document.createElement('button');
        delButton.textContent='🗑️';
        delButton.title='Delete Task';

        const taskCellCompl=document.createElement('td');
        const completeButton=document.createElement('button');
        completeButton.title='Mark Task as Complete';
        completeButton.textContent='✔';

        
        


        
        taskCell.appendChild(taskName);

        taskCellEdit.appendChild(editButton);

        taskCellDel.appendChild(delButton);

        taskCellCompl.appendChild(completeButton);
        
        
        
        taskRow.appendChild(taskNo);
        taskRow.appendChild(taskCell);
        taskRow.appendChild(taskCellEdit);
        taskRow.appendChild(taskCellDel);

        
        taskRow.appendChild(taskCellCompl);
        
        taskList.appendChild(taskRow); 

        delButton.addEventListener('click',function delTask(){
            storedTasks.splice(index,1);
            localStorage.setItem('Tasks',JSON.stringify(storedTasks));
            displayUpdatedList();
    
        });


        completeButton.addEventListener('click',function toggleComplete(){
            if(storedTasks[index].completed){
                completeButton.textContent='✔';
                taskName.style.textDecoration='none';
                storedTasks[index].completed=false;
                localStorage.setItem('Tasks',JSON.stringify(storedTasks));
                    
                ;
            }else{
                taskName.style.textDecoration='line-through';
                completeButton.textContent='✖';
                storedTasks[index].completed=true;
                localStorage.setItem('Tasks',JSON.stringify(storedTasks));
            }  
        });

        

        let isEditing=false;
        function editTask(taskText) {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = item.text;
            input.classList.add('task-edit-input');
            if(!isEditing){
                isEditing=true;
                delButton.disabled=true;
                completeButton.disabled=true;

 
            }else{
                isEditing=false;
                delButton.disabled=false;

                completeButton.disabled=false;


            }
    

            taskText.replaceWith(input);
            input.focus();

            const saveEdit = () => {
                const newText = input.value.trim();
                if (newText !== "") {
                    item.text = newText;
                    storedTasks[index].text = newText;
                    localStorage.setItem("Tasks", JSON.stringify(storedTasks));
                }

                const newTaskText = document.createElement('p');
                newTaskText.textContent = item.text;
                newTaskText.classList.add('task-text'); 
                input.replaceWith(newTaskText);

                newTaskText.addEventListener('dblclick', () => editTask(newTaskText));
            }

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    isEditing=false;
                    delButton.disabled=false;
                    completeButton.disabled=false;
                    saveEdit();
                };
            });
        }


        editButton.addEventListener('click', ()=>{editTask(taskName)});
        taskName.addEventListener('dblclick',()=>{editTask(taskName)});

        const clearButton=document.getElementById('clearTasks'); 

        clearButton.addEventListener('click', function clrTasks(){
            taskList.replaceChildren();
            storedTasks=[];
            localStorage.removeItem('Tasks');
            displayUpdatedList();
        });
    }

    storedTasks.forEach(addToViewableTasks);
    
    const addEmptyTaskRow=()=>{

        const lastTaskRow=document.createElement('tr');
        lastTaskRow.classList.add('task-text');
        const lastTaskNo=document.createElement('td');
        lastTaskNo.textContent=`${storedTasks.length+1}. `;

        const lastTaskInputCell=document.createElement('td');

        const lastTaskInput=document.createElement('input');
        lastTaskInput.placeholder='Enter task...';

        lastTaskInputCell.appendChild(lastTaskInput);

        lastTaskInput.addEventListener('input',()=>{
            lastTaskAddBtn.disabled=(lastTaskInput.value.trim()==="");
            lastTaskDelBtn.disabled=(lastTaskInput.value.trim()==="");
        })

        lastTaskInput.classList.add('input');

        const lastTaskAddBtnCell=document.createElement('td');
        const lastTaskAddBtn=document.createElement('button');
        lastTaskAddBtn.textContent='➕';
        lastTaskAddBtn.disabled=true;
        lastTaskAddBtn.title=(lastTaskAddBtn.disabled?"Type to add a Task":"Add Task");
        lastTaskAddBtnCell.appendChild(lastTaskAddBtn);

        const addNewTask=()=>{
            const taskText=lastTaskInput.value.trim();
            if(taskText!==""){
                storedTasks=[
                    ...storedTasks,
                    {
                        text:lastTaskInput.value,
                        completed:false
                    }
                ];
                localStorage.setItem('Tasks',JSON.stringify(storedTasks));
                displayUpdatedList();
            }
        }
        lastTaskAddBtn.addEventListener('click',addNewTask);
        lastTaskInput.addEventListener('blur',()=>{
            if(lastTaskInput.value.trim()===""){
                addNewTask();
            }
           
        });
        lastTaskInput.addEventListener('keydown',(e)=>{
            if(e.key==='Enter' || lastTaskInput.value.trim()===""){
                addNewTask();
            }
        })

      

        const lastTaskDelBtnCell=document.createElement('td');
        const lastTaskDelBtn=document.createElement('button');
        lastTaskDelBtn.textContent='🗑️';
        lastTaskDelBtn.disabled=true;
        lastTaskDelBtnCell.appendChild(lastTaskDelBtn);
        lastTaskDelBtn.addEventListener('click',()=>{
            lastTaskInput.value="";
        })
        
        lastTaskRow.appendChild(lastTaskNo);
        lastTaskRow.appendChild(lastTaskInputCell);
        lastTaskRow.appendChild(lastTaskAddBtnCell);
        lastTaskRow.appendChild(lastTaskDelBtnCell);

        taskList.appendChild(lastTaskRow);

    }

    addEmptyTaskRow();

}

displayUpdatedList();









});








