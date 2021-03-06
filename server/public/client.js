console.log('hello world');
$(document).ready(readyNow);

function readyNow(){
 console.log('JQ LOADED');
 getToDoList();
 $(document).on('click','#submit-btn', sendToServer);
 $('#view-todo-list').on('click','#delete-btn', deleteItem );
 $('#view-todo-list').on('click','#mark-as-done', markItemAsDone );
//  $(document).on('click','#mark-as-done', changeColor );
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
          <td class="completeStatus">${item.complete}</td>
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
        getToDoList();
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

  function markItemAsDone(event){
    event.preventDefault();
      console.log('In mark item as done function');
      let listId = $(this).parents('tr').data('todo-id');
      console.log(' The thing I want to channge is', listId);
     
    //   $(this).parents('tr').addClass('lightgreen');

      let updateList;

      if($(this).parents('tr').children('.completeStatus').text() === 'No') {
        updateList = {
          complete: 'Yes'
        };
        $(this).parents('tr').addClass('lightgreen');
      }
      else if($(this).parents('tr').children('.completeStatus').text() === 'Yes') {
        updateList = {
          complete: 'No'
        };
      }
      else {
        console.log('Somthing went wrong in Mark Item as Done')
      };

      console.log('Updating my list to', updateList);
    $.ajax({
        method: 'PUT',
        url:`/todo/${listId}`,
        data: updateList
    })
    .then(res => {
        console.log('PUT was successful!')
        getToDoList(); 
    })
    .catch(err => {
        console.log('PUT failed', err);
    });
  };

  // function changeColor(){
  //     $(this).parents('tr').addClass('lightgreen');
  //     console.log('in changeColor')
  //     // $(this).append('.lightgreen');
  // }