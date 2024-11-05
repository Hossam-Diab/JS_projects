//connecting the elements 
let active_tasks = document.getElementById("active_tasks");
let create = document.getElementById("create");
let confirmBtn = document.getElementById("confirmBtn");
let formTaskContent =document.getElementById("formTaskContent");
let formTaskDue =document.getElementById("formTaskDue");
let formTaskTitle =document.getElementById("formTaskTitle");
let creation_form =document.getElementById("creation_form");


//modes

let mode = "create";
let tmp;









// check for elements in local storage 

let tasksData; // an array to hold the tasks into it 
if (localStorage.tasks != null) {
    tasksData = JSON.parse(localStorage.tasks);
  } else {
    tasksData = [];
  }
 
create.onclick =function(){
    createBtn();
}

function createBtn(){
    setTimeout(function(){
                       
        if(creation_form.classList.contains("show") === true){
            create.innerHTML = "Close"
            create.classList.remove("btn-success")
            create.classList.add("btn-danger")
        }else{
            create.innerHTML = "Add new task"
            create.classList.add("btn-success")
            create.classList.remove("btn-danger")
        }
            } , 400);
}
// create new task 
confirmBtn.onclick = function(){
    let newTask = {
        title :   formTaskTitle.value,
        content: formTaskContent.value,
        due :   formTaskDue.value,
    };
    if(formTaskTitle.value != "" && formTaskContent.value != "" && formTaskDue.value != "" ){
        if(mode === "create"){
            tasksData.push(newTask);
        }else{ //update mode
            tasksData[tmp] = newTask ;

            confirmBtn.innerHTML = "Confirm";
            mode = 'create';
           
            
        }

        creation_form.classList.add("collapsing");
        creation_form.classList.remove("collapse");
        creation_form.classList.remove("show");
        localStorage.tasks= JSON.stringify(tasksData);
        clearForm();
        
    }

    showTasks();
}



//clear the form

function clearForm(){
    formTaskTitle.value = "";
    formTaskContent.value ="";
    formTaskDue.value ="";

}


// show tasks 

function showTasks(){
    active_tasks.innerHTML ="";
    if(tasksData.length > 0){
        for(let i =0 ; i<tasksData.length ; i++){

            active_tasks.innerHTML +=`
            <div id="task" class="border border-light rounded p-3  m-3"   >
          <div class="badge badge-secondary text-capitalize"><h6 style ="word-wrap: break-word ; white-space: normal ; ">#${i+1}  ${tasksData[i].title}</h6></div>
            <div class="task_content m-1 p-1" style ="word-wrap: break-word ; white-space: normal ; ">
            ${tasksData[i].content}
            </div>

             <div class=" d-flex justify-content-between">
                
             <div class="task_due m-1 p-1 ">
            ${tasksData[i].due}</div>
            
                  
                <div class="btn btn-info " onclick="updateTask(${i})"  id="Update_task">Update</div>
                <div class="btn btn-danger " onclick="deleteTask(${i})"  id="delete_task">Delete</div>
             </div>
            </div>
            
            
            `;




        }
        active_tasks.classList.add("show");
        createBtn();
        
    }
}

showTasks();

// delete existing task
function deleteTask(i){
    tasksData.splice(i,1);
    localStorage.tasks = JSON.stringify(tasksData);
    showTasks();



}



// update task
function updateTask(i){
    mode = 'update';
    tmp = i ;
    creation_form.classList.remove("collapsing");
    creation_form.classList.add("collapse");
    creation_form.classList.add("show");

   


    formTaskTitle.value = tasksData[i].title;
    formTaskContent.value =tasksData[i].content;
    formTaskDue.value = tasksData[i].due;
    confirmBtn.innerHTML = `Update Task #${tmp + 1}`;




    showTasks();
    createBtn();


}



















































