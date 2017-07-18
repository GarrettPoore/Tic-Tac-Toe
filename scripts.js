$(document).ready(function() {
  $(".space").click(function(event) {
    var val = event.target.value;
    makeMove(val);
  });
});
