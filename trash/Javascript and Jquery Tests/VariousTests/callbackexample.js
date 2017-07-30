some_8secs_function(function() {
  some_3secs_function(function() {
    some_5secs_function(function() {
      //All three functions have completed, in order.
    });
  });
});

function some_3secs_function(callback){
  console.log("segundo");  //do stuff
  callback();
}

function some_5secs_function(callback){
  console.log("tercero"); //do stuff
  callback();
}

function some_8secs_function(callback){
  console.log("primero"); //do stuff
  callback();
}
