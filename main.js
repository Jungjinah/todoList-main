/*
* top
- 즐겨찾기
- ALL TODAY YEAR TRAVEL

* main
- 리스트 생성 (with 오늘 날짜)
- done
- delete
- return

* footer
- 할 일 등록
*/

let taskContent = document.getElementById("task-content");  //할 일 내용
let addButton = document.getElementById("add-button");  //등록버튼
let taskList = [];  //할 일 list
let filterList = [];    //진행중, 끝난 list
let isComplete = false;
let isStar = false;
let tabs = document.querySelectorAll(".task-tabs a");
let mode = 'all';
let underLine = document.getElementById("under-line");

//오늘날짜
let today = new Date();
let month = today.getMonth() + 1;
let date = today.getDate();

//탭 클릭 이벤트
// tabs.forEach(menu=>menu.addEventListener("click", (e)=>filter(e)));

for(let i=0; i < tabs.length; i++) {
    let list = '';
    tabs[i].addEventListener("click", function(event) {
        filter(event);
    })
}

//등록버튼 클릭 이벤트
addButton.addEventListener("click",addTask);

//등록버튼 클릭 > 할 일 추가
function addTask() {
    let task =  {
        id: randomIDGenerate(),
        content: taskContent.value,
        isComplete: false
    }

    if(task.content == null || task.content == "") { 
        alert("할 일을 입력하시오")
    } else {
        taskList.push(task);
        render();
    }

    taskContent.focus();
}

//할 일 리스트
function render() {
    let resultHTML = '';
    let list = [];
    if(mode === "all") {
       list = taskList;
    } else if (mode === "ongoing" || mode === "done" || mode ==="star") {
        list = filterList;
    }
    
    //함수 안에 변수를 넣을 떈 ${}를 뺵틱으로 감싸야함!
    for(let i=0; i < list.length; i++) {
        console.log(list[i]);
        if(list[i].isComplete === true) {
            if (list[i].isStar === true) {
                console.log("여기!!");
                resultHTML += `<div class="task">
                    <div class="task-star task-done">
                    ${month + "." + date}
                        <span> | </span>
                        ${list[i].content}
                    </div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')" class="btn-area">CHECK</button>
                        <button onclick="deleteTask('${list[i].id}')" class="btn-area">DELETE</button>
                        <button onclick="starTask('${list[i].id}')" class="btn-area">★</button>
                    </div>
                </div>`;
            } else {
            resultHTML += `<div class="task">
                <div class="task-done">
                ${month + "." + date}
                    <span> | </span>
                    ${list[i].content}
                </div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')" class="btn-area">CHECK</button>
                    <button onclick="deleteTask('${list[i].id}')" class="btn-area">DELETE</button>
                    <button onclick="starTask('${list[i].id}')" class="btn-area">★</button>
                </div>
            </div>`;
        }
        } else if(list[i].isComplete === false) {
            if (list[i].isStar === true) {
                console.log("여기!!");
                resultHTML += `<div class="task">
                    <div class="task-star task-ongoing">
                    ${month + "." + date}
                        <span> | </span>
                        ${list[i].content}
                    </div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')" class="btn-area">CHECK</button>
                        <button onclick="deleteTask('${list[i].id}')" class="btn-area">DELETE</button>
                        <button onclick="starTask('${list[i].id}')" class="btn-area">★</button>
                    </div>
                </div>`;
            } else {
                resultHTML += `<div class="task">
                    <div class="task-ongoing">
                    ${month + "." + date}
                        <span> | </span>
                        ${list[i].content}
                    </div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')" class="btn-area">CHECK</button>
                        <button onclick="deleteTask('${list[i].id}')" class="btn-area">DELETE</button>
                        <button onclick="starTask('${list[i].id}')" class="btn-area">★</button>
                    </div>
                </div>`;
            }
        } 
    }

    document.getElementById("main").innerHTML = resultHTML;
    
    // inputBox 초기화 (inputBox 컴포넌트의 value를 갖고와야함)
    taskContent.value = "";
}

//엔터키 이벤트
function enterKey(e) {
    if(e.keyCode == "13") {
        let content1 = taskContent.value;
        if(content1 == null || content1 == "") { 
            alert("할 일을 입력하시오")
        } else {
            addTask();
        }
    }
    
    taskContent.focus();

    /* 혹은
    if(e.key === "Enter") {
        addTask();
    }
    */
}

//check버튼 클릭 이벤트
function toggleComplete(id) {
    for(let i=0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            //버튼 클릭하고 다시 클릭했을 때 원복하는 경우
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

//랜덤 아이디 갖고오기
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substring(2, 9);
}

//리스트 삭제
function deleteTask(id) {
    for(let i=0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            //배열 리스트에서 id 삭제
            taskList.splice(i, 1);
            break;
        }
    }
    filter();
}

//즐겨찾기
function starTask(id) {
    for(let i=0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            //버튼 클릭하고 다시 클릭했을 때 원복하는 경우
            taskList[i].isStar = !taskList[i].isStar;
            break;
        }
    }
    filter();
}

//done, ongoing 탭 내용
function filter(e) {
    if(e) {
        mode = e.target.id;
        underLine.style.left = e.currentTarget.offsetLeft + "px";
        underLine.style.width = e.currentTarget.offsetWidth - 8 + "px";
        underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 6 + "px";
    }
    filterList = [];
    console.log("mode : ", mode);

   if(mode === "ongoing") {
        //filter 아이템
        for(let i=0; i < taskList.length; i++) {
            if(taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            }
        }
    } else if(mode === "done") {
        //filter 아이템
        for(let i=0; i < taskList.length; i++) {
            if(taskList[i].isComplete === true) {
                filterList.push(taskList[i]);
            }
        }
    } else if(mode === "star") {
        for(let i=0; i < taskList.length; i++) {
            if(taskList[i].isStar === true) {
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}