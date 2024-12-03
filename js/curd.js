var bookmarkName=document.getElementById('bookmarkName');
var bookmarkURL=document.getElementById('bookmarkURL');
tableContent=document.getElementById('tableContent');

// var booklist=[];
if (localStorage.getItem("data") !== null) {
    booklist = JSON.parse(localStorage.getItem("data")); 
    showdata();    
  } else {
    var booklist = []; 
  }


 
  function addbook() {
    var nameRegex = /^[a-z A-Z]{3,}$/;
    var urlRegex = /^(https?:\/\/)?([\w\d-]+\.){1,}[\w]{2,}(\/.*)?$/;

    
    if (!nameRegex.test(bookmarkName.value)) {
        showError("Site Name must contain at least 3 characters");
        return;
    }

    
    if (!urlRegex.test(bookmarkURL.value)) {
        showError("Site URL must be a valid one");
        return;
    }

     
    for (var i = 0; i < booklist.length; i++) {
        if (booklist[i].bookname === bookmarkName.value) {
            showError("Site Name is already added!");
            return;
        }
        if (booklist[i].bookurl === bookmarkURL.value) {
            showError("Site URL is already added!");
            return;
        }
    }
    var book = {
        bookname: bookmarkName.value,
        bookurl: bookmarkURL.value
    };

    booklist.push(book);
    localStorage.setItem('data', JSON.stringify(booklist));
    showdata();
}


function showdata(){

    var str="";
    for(var i=0;i<booklist.length;i++){
        str+=`
        <thead>
        <td class="text-capitalize">${[i+1]}</td>
        <td class="text-capitalize">${booklist[i].bookname}</td>
      
        <td><button class="btn btn-visit"  onclick="visitSite(${i})">
        <i class="fa-solid fa-eye pe-2"></i>Visit
    </button></td>
    <td>
        <button class="btn btn-delete pe-2"  onclick="delte(${i})">
            <i class="fa-solid fa-trash-can"></i>Delete
        </button>
    </td>
      </thead>
          
        `;

        tableContent.innerHTML=str;
    }


}


function visitSite(index) {
    
    var url = booklist[index].bookurl;
    window.open(url, '_blank');
}

function delte(index){

    booklist.splice(index, 1);
    localStorage.setItem('data',JSON.stringify(booklist));

    showdata();
}

function showError(message) {
    
    document.getElementById('errorMessage').innerText = message;

   
    var modal = new bootstrap.Modal(document.getElementById('errorModal'));
    modal.show();
}