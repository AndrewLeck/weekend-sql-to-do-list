console.log('hello world');
$(document).ready(readyNow);


function readyNow(){
 console.log('JQ LOADED');
 getToDoList()
};


function getToDoList(){
    console.log( 'In get todo list function' );
    $('#view-todo-list').empty();
    // ajax call to server to get koalas
    $.ajax({
      method: 'GET',
      url: '/todo'
    })
    .then(function(response) {
      console.log('getting todo list from server',response);
      for (item of response) {
        $('#view-todo-list').append(`
        <tr data-todo-id= "${item.id}">
          <td>${item.task}</td>
          <td>${item.complete}</td>
          <td>
            <button id="mark-as-done">Mark as done</button>
          </td>
          <td>
            <button id="delete-btn"> Remove </button>
          </td>
         </tr> 
        `);
      }
    })
    .catch(function(err){
    alert(' Failed to get the to do list from server')
    console.log('in ajax.catch',err);
    });
  } // end getKoalas