// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
   var searchTeam = req.query.q;
   console.log("Search", searchTeam);
   let filteredTodos = todos.filter(function(ele){
     return (ele.task.toLowerCase().includes(searchTeam.toLowerCase()) || ele.description.toLowerCase().includes(searchTeam.toLowerCase()));
   });
   res.json({data : filteredTodos});
});


app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   var index = req.params.id;
   res.json({data: todos});
});


app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   var iden = req.params.id;
  //this filter function works too! just trying out the find function
  //  var result = todos.filter(function(ele){
  //    return ele._id == iden;
  //  })[0];
  var result = todos.find(function(ele){
    return ele._id == iden;
  })
   res.json(result);
});


var iden = Math.floor(Math.random()) * 100;
app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
  * and respond with the newly created todo.
  */
  var task = req.body.task;
  var desc = req.body.description;

  var newTodoList = {_id: iden, task: task, description: desc};
  todos.push(newTodoList);
  iden += 1;
  res.json(newTodoList);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
  * id specified in the route parameter (:id) and respond
  * with success.
  */

  var result = parseInt(req.params.id);
  // console.log("THIS IS RESULT", result);
  //filter function returns only whatever is equal to the result from the ele array
  var newTodoList = todos.find(function(ele){
    return ele._id == result
  });
  todos.splice(todos.indexOf(newTodoList), 1);

  res.json(newTodoList);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   var todoId = parseInt(req.params.id);
   var updateTodo = todos.filter(function(ele){
     return ele._id === todoId;
   })[0];

   updateTodo.task = req.body.task;

   updateTodo.description = req.body.description;

   res.json(updateTodo)
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function(){
  console.log('Server running on http://localhost:3000');
});
