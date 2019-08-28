document.addEventListener("DOMContentLoaded", main)



function main() {

  let nbt = document.getElementById('newButton')
  nbt.addEventListener('click',newToDoEntry)
};


function newToDoEntry(event) { 
  event.preventDefault()
  console.log('In the creation function')
  
  let desc = document.getElementById("new-task-description").value;
  let list = document.getElementById("tasks");
  
  let item = document.createElement("li")

  let field = document.createElement("input")
  field.value = desc
  item.appendChild(field)

  //document.getElementById("priority_dropdown").value
  let priorityMenu = makePriorityFormForItem(item)
  priorityMenu.value = document.getElementById("priority_dropdown").value
  changeTextColorDefault(priorityMenu)
  

  //Making a delete function
  makeDeleteForItem(item)

  

  if ((Math.random() < 0.1) && (priorityMenu.value == "HIGH")){
    console.log("unicorn")
    item = document.createElement("img")
    item.setAttribute('src','https://cdn-img.fimfiction.net/story/q8d7-1510237532-391373-full')
  }

  list.appendChild(item)
}

function changeTextColor(event){
  //This is an event called from menu (which we made in makePriorityFormForItem)
  //so the event.target is menu
  //event.target.parentElement is the item (the list entry we made in newToDoEntry)
  let choice = event.target.value
  console.log('choice = ' + choice)
  let color = ""
  switch(choice){
    case 'HIGH':
        color = "red"
    break;

    case 'Medium':
        color = "orange"

    break;
    case 'low':
        color = "green"

    break;
    default:
        color = "black"
  }
  //we're changing the color of the item's text
  event.target.parentElement.style.color = color
}

function changeTextColorDefault(menu){
  //This is an event called from menu (which we made in makePriorityFormForItem)
  //so the event.target is menu
  //event.target.parentElement is the item (the list entry we made in newToDoEntry)
  let choice = document.getElementById("priority_dropdown").value
  console.log('choice = ' + choice)
  let color = ""
  switch(choice){
    case 'HIGH':
        color = "red"
    break;

    case 'Medium':
        color = "orange"

    break;
    case 'low':
        color = "green"

    break;
    default:
        color = "black"
  }
  //we're changing the color of the item's text
  menu.parentElement.style.color = color
}

function makePriorityFormForItem(item){
  let menu = document.createElement("select")

  let option = document.createElement("option")
  option.text = "HIGH"
  menu.add(option);

  let option2 = document.createElement("option")
  option2.text = "Medium"
  menu.add(option2);


  let option3 = document.createElement("option")
  option3.text = "low"
  menu.add(option3);

  menu.addEventListener('change',changeTextColor)


  item.appendChild(menu)

  return menu
}

function makeDeleteForItem(item){
  let delbut = document.createElement("button")
  delbut.innerText = "Delete"
  delbut.addEventListener('click',deleteParent)
  item.appendChild(delbut)
}

function deleteParent(event){
    // this == event.target
    event.target.parentElement.remove(); 
}

function sortlist(){
  let list = document.getElementById("tasks");
  let unsortedArray = []
  for (let i = 0; i < list.childNodes.length; i++){
    unsortedArray.push(list.childNodes[i])
  }

  let sortedArray = unsortedArray.sort(function(a,b){

    console.log(a.querySelector('select').value)
    let priority_a = 0
    switch(a.querySelector('select').value){
      case 'HIGH':
          priority_a = 1
      break;
  
      case 'Medium':
          priority_a = 2
  
      break;
      case 'low':
          priority_a = 3
    }



    return priority_a - 2
  });

  while (list.firstChild){
    list.removeChild(list.firstChild)
  }

  sortedArray.forEach(function(child){
    list.appendChild(child)
  })
}