import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-67c5e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingLIstInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")
const hrs = document.getElementById('hrs')
const min = document.getElementById('min')
const sec = document.getElementById('sec')


addButtonEl.addEventListener("click", function() {
   const inputValue = inputFieldEl.value
    
   push(shoppingLIstInDB, inputValue)
   clearInputFieldEl()
  
})

onValue(shoppingLIstInDB, function(snapshot){
     
    if(snapshot.exists()) {      
       let shoppingArray = Object.entries(snapshot.val())

       console.log(snapshot.val()) 
   
       clearShoppingListEl()
   
       for (let i = 0; i < shoppingArray.length; i++) {
           let currentItem = shoppingArray[i]
           let currentItemID = currentItem[0]
           let currentItemValue = currentItem[1]
   
           appendItemToShoppingListEL(currentItem)
       }
    }
    else {
        shoppingListEl.innerHTML = "No items here...yet"
    }

})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEL(item) {
    let itemID = item[0]
    let itemValue = item[1]


    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
       
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}

// Notification.requestPermission().then(permission => {
//     if (permission === "granted") {
//       // Create a new notification after 5 seconds
//       setTimeout(() => {
//         const notification = new Notification("Reminder", {
//           body: "Don't forget to do something!",
//           icon: "/path/to/icon.png"
//         });
//       }, 5000); // 5000 milliseconds = 5 seconds
//     }
//   });

setInterval(()=> {
    let currentTime = new Date()

    hrs.textContent = (currentTime.getHours()<10?"0":"") + currentTime.getHours()
    min.textContent = (currentTime.getMinutes()<10?"0":"") + currentTime.getMinutes()
    sec.textContent = (currentTime.getSeconds()<10?"0":"") + currentTime.getSeconds()
    
},1000)

