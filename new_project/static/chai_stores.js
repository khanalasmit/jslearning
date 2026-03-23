function make_stores_editable(){
    document.querySelectorAll('summary span button').forEach(
        span,()=>{
            span.addEventListener("click",()=>{
                let spanelement = document.querySelector('#store-name')
                if(!spanelement.isEditing){
                    spanelement.isEditing = true
                    const currentText = spanelement.textContent
                    spanelement.textContent = `<input type = "text" value =>"${currentText}" autofocus >`
                    const input = document.querySelector('input')
                }
            })
        }
    )
}