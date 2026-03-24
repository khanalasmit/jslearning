function make_stores_editable(){
    document.querySelectorAll('summary span button').forEach(
        (button)=>{ // Renamed from "span" to "button" to avoid confusion
            button.addEventListener("click",(event)=>{
                // Optional: Prevents the click from bubbling up if your summary has its own click event
                event.stopPropagation(); 
                // Use closest to find the span related to THIS edit button, avoiding the ID duplication bug
                let spanelement = button.closest('summary').querySelector('.store-name-text')
                
                if(!spanelement.isEditing){
                    spanelement.isEditing = true
                    const currentText = spanelement.textContent.trim();
                    const storeId = spanelement.getAttribute('data-id'); // Get the data-id from the span
                    
                    // Replaced the text with an input
                    spanelement.innerHTML = `<input type="text" value="${currentText}">`
                    
                    // FIX 1: Find the input ONLY inside of spanelement
                    const input = spanelement.querySelector('input')
                    const cellElement = spanelement
                    // FIX 2: Explicitly force the browser to focus the input
                    input.focus()

                    input.addEventListener("blur",function(){
                        const newValue = input.value;
                        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                        
                        if (newValue.trim() === "") {
                            // Delete row if name is removed completely
                            fetch(`/deleting_chaistore/${storeId}/`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    "X-CSRFToken": csrfToken
                                }
                            })
                            .then(response => {
                                if(response.ok) {
                                    // Make sure it actually removes it from the screen
                                    cellElement.closest('.store-item').remove();
                                } else {
                                    alert("Error deleting the store!");
                                    cellElement.textContent = currentText;
                                    cellElement.isEditing = false;
                                }
                            })
                            .catch(err => {
                                console.error("Error:", err);
                                cellElement.textContent = currentText;
                                cellElement.isEditing = false;
                            });
                        } else {
                            // Pass the new value to the Django view using fetch
                            fetch(`/updating_chaistore/${storeId}/`, {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json",
                                    "X-CSRFToken": csrfToken // Send CSRF token for security
                                },
                                body: JSON.stringify({ name: newValue }) // Pass the new value as JSON
                            })
                            .then(response => response.json())
                            .then(data => {
                                if(data.success) {
                                    cellElement.textContent = newValue;
                                } else {
                                    alert("Error updating: " + data.message);
                                    cellElement.textContent = currentText; // Revert
                                }
                                cellElement.isEditing = false;
                            })
                            .catch(err => {
                                console.error("Error:", err);
                                cellElement.textContent = currentText; // Revert
                                cellElement.isEditing = false;
                            });
                        }
                    });
                    
                    // Bonus: Allow the user to press the "Enter" key to save the changes
                    input.addEventListener("keypress", function(e) {
                        if(e.key === "Enter"){
                            input.blur(); // Triggers the blur event above
                        }
                    })
                }
            })
        }
    )
}

make_stores_editable()
