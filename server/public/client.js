console.log('hello world');
$(document).ready(readyNow);
// $('#submit-btn').on('click', sendToServer());

function readyNow(){
 console.log('JQ LOADED');
 getToDoList();
 $('#header').on('click','#submit-btn', sendToServer);
 $('#view-todo-list').on('click','#delete-btn', deleteItem );
//  $('#to-do').on('click', '#submit-btn', sendToServer());
};


function getToDoList(){
    console.log( 'In get todo list function' );
    $('#view-todo-list').empty();
    // ajax call to server to get todo list 
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
  };

  function sendToServer(){
      console.log('In send to server client.js');

      let itemToSend = {
          task:$('#toDo').val(),
          complete: ('No')
      };
      console.log('What am I sending over?', itemToSend);
      
      $.ajax({
          method:'POST',
          url:'/todo',
          data: itemToSend
      })
      .then((response) => {
        console.log('POST Sucsessful', response);
        getToDoList
      })
      .catch((err) => {
          console.log('Error Post failed', err)
          alert('check the Client.js POST function')
      })
  };

  function deleteItem(){
    console.log('In delete Item function');
    let listId = $(this).parents('tr').data('todo-id');
    console.log('list item being deleted is', listId);
    
    $.ajax({
        method: 'DELETE',
        url: `/todo/${listId}`
    })
    .then(() =>{
        console.log('Delete Success!');
        getToDoList();
    })
    .catch((err) => {
        console.log('Failed to delete in client.js', err);
    });
  };