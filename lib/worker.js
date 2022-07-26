self.addEventListener("message", function(event) {
    var numbers = [...event.data]
    postMessage(numbers.sort())
  });