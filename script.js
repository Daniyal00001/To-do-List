
let input = document.querySelector(".input1");
let tasks = document.querySelector(".tasks");
let items = JSON.parse(localStorage.getItem("items")) || []; // Retrieve stored items or initialize an empty array


input.addEventListener("keydown", (event) => {
    if (input.value != "") {
        if (event.key === "Enter") {
            let allButtons = document.querySelectorAll(".edit, .delete");
            allButtons.forEach(button => {
                button.disabled = false;
                button.style.opacity = "";
            });
    
            // Push the new input value to the items array
            items.push(input.value);

            // Store the entire array in local storage
            localStorage.setItem("items", JSON.stringify(items));

            add(input.value); // Pass the input value to add()
            input.value = ""; // Clear the input field
        }
    }
});

// Function to add a task to the UI
let add = (taskText) => {
    let a = document.createElement("div");
    a.innerHTML = `
     <div class="taskrow">
                <div class="box">
                    <p class="para">${taskText}</p>
                </div>
                <div class="buttons">
                    <button class="edit">edit</button>
                    <button class="delete">delete</button>
                </div>
            </div>
    `;
    
    tasks.appendChild(a);

    // Delete button functionality-----------------------------------------------------------------
    let deleteButton = a.querySelector(".delete");
    deleteButton.addEventListener("click", () => {
        a.remove(); // Remove the task row

        // Update local storage by removing the deleted item
        items = items.filter(item => item !== taskText);
        localStorage.setItem("items", JSON.stringify(items));
    });

    // Edit button functionality-------------------------------------------------------------------
    let editButton = a.querySelector(".edit");
    editButton.addEventListener("click", () => {
        let text = a.querySelector(".para").innerText;
        input.value = text;

        // Disable all buttons while editing*******
        let allButtons = document.querySelectorAll(".edit, .delete");
        allButtons.forEach(button => {
            button.disabled = true;
            button.style.opacity = "0.5";
        });

        a.remove(); // Remove the task row for editing******

        // Update local storage by removing the edited item******
        items = items.filter(item => item !== taskText);
        localStorage.setItem("items", JSON.stringify(items));
    });

    // Toggle 'done' class on click*****
    let box = a.querySelector(".box");
    box.addEventListener("click", () => {
        box.classList.toggle("done");
    });
};

// On page load, retrieve from local storage and display -----------------------------------------------
window.addEventListener("load", () => {
    let storedItems = JSON.parse(localStorage.getItem("items")) || [];
    storedItems.forEach(item => {
        add(item); // Add each stored item to the UI
    });
});


