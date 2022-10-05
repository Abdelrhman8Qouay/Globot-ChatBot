let ContentMessages = document.querySelector(".containerBot");
let MessangerBtn = document.getElementById("messangerBtn");

// add classes for page
let expandButton = document.getElementById("expanding");
expandButton.addEventListener("click", ()=> ContentMessages.classList.toggle("exp"))

let closeMessageBtn = document.getElementById("close");
closeMessageBtn.addEventListener("click", ()=> {
    ContentMessages.classList.remove("showIt");
    MessangerBtn.classList.remove("showHide");
})

MessangerBtn.addEventListener("click", ()=> {
    ContentMessages.classList.add("showIt");
    MessangerBtn.classList.add("showHide");
})


// add methods of header
let MainDate = document.querySelector(".content .sp .date");
MainDate.innerText = new Date().toDateString();