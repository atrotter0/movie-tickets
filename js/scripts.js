function Movie(title, showtimes, firstRun) {
  this.title = title;
  this.showtimes = showtimes;
  this.firstRun = firstRun;
}

function Ticket(title, age, firstRun, showtime, quantity) {
  this.title = title;
  this.age = age;
  this.firstRun = firstRun;
  this.showtime = showtime;
  this.quantity = quantity;
}

Ticket.prototype.addPrice = function(price) {
  return this.price = price;
}

function clearStorage() {
  localStorage.clear();
}

function buildMovies() {
  var objectContainer = [];
  var rockyHorror = new Movie('Rocky Horror', ['10:00am','1:00pm','6:45pm'], false);
  var deadpool = new Movie('Deadpool 2', ['Noon','5:30pm','10:00pm'], true);
  var littleMermaid = new Movie('Little Mermaid', ['9:00am','Noon','3:00pm'], false);
  var scorpionKing = new Movie('The Scorpion King', ['Midnight','Midnight','Midnight'], false);

  objectContainer.push(rockyHorror, littleMermaid, deadpool, scorpionKing);
  loadStorage(objectContainer);
}

function loadStorage(container) {
  for(var i = 0; i < container.length; i++) {
    addToStorage(container[i]);
  }
}

function addToStorage(movie) {
  var key = movie.title;
  var object = JSON.stringify(movie);
  localStorage.setItem(key, object);
}

function loadMovieData(option) {
  var movie = parseObject(localStorage.getItem(option));
  displayMovieData(movie);
}

function parseObject(option) {
  return JSON.parse(option);
}

function createTicket() {
  var movieTitle = $('#movieList').val();
  var movieShowtime = $('.time-clicked').text();
  var movieAge = $('input[name=age]:checked').val();
  var movieQuantity = $('#quantity').val();
  var firstRun = parseObject(localStorage.getItem(movieTitle)).firstRun;
  var ticket = new Ticket(movieTitle, movieAge, firstRun, movieShowtime, movieQuantity);
  return ticket;
}

function validateForm() {
  if (elementHasValue('#quantity') && (elementHasValue('#movieList'))) {
    $('#submit').attr('data-target', '#ticketModal');
    var ticket = createTicket();
    calculatePrice(ticket);
    displayTicket(ticket);
  } else {
    $('#submit').attr('data-target','blank');
    alert("Hey, you need to fill out all fields to buy a ticket!");
  }
}

function elementHasValue(element) {
  if ($(element).val() !== "") return true;
}

function calculatePrice(ticket) {
  var initialPrice = isFirstRun(ticket.firstRun);
  var ageDiscount = isAdult(ticket.age);
  var quantity = ticket.quantity;
  var price = '$' +(initialPrice - ageDiscount) * quantity;
  ticket.addPrice(price);
}

function isFirstRun(firstRun) {
  var price = 0;
  (firstRun) ? price = 12 : price = 10;
  return price;
}

function isAdult(age) {
  var discount = 0;
  age ? discount = 0 : discount = 2;
  return discount;
}

function displayMovieData(movie) {
  console.log(movie);
  $("#time1").text(movie.showtimes[0]);
  $("#time2").text(movie.showtimes[1]);
  $("#time3").text(movie.showtimes[2]);
}

function resetForm() {
  $('#movie-tickets')[0].reset();
  hideAll();
}

function hideAll() {
  $('#showtimesSection, #ageSection, #quantitySection, #ticketBox').hide();
}

function showNext(elementId) {
  $(elementId).fadeIn(800);
}

function clearBtnClass(elementClass) {
  $("#time1, #time2, #time3").removeClass(elementClass);
}

function displayTicket(ticket) {
  console.log(ticket);
  var age = "";
  (ticket.age === "true") ? age = "Adult" : age = "Child/Senior";

  setImage(ticket.title);
  $("#ticketTitle").text(ticket.title);
  $("#ticketShowtime").text(ticket.showtime);
  $("#ticketAge").text(age);
  $("#ticketPrice").text(ticket.price);
}

function setImage(title) {
  var newTitle = title.split(' ').join('');
  console.log(newTitle);
  $('.thumbnail').attr('src', 'img/' + newTitle + '.jpg');
}

$(document).ready(function() {
  clearStorage();
  buildMovies();

 $('#submit').click(function(event) {
   event.preventDefault();
   validateForm();
 });

 $('#movieList').change(function() {
   hideAll();
   showNext('#showtimesSection');
   var option = $(this).val();
   (option === "") ? hideAll() : loadMovieData(option);
 });

 $('.show-button').click(function(event) {
   clearBtnClass('time-clicked');
   $(this).addClass('time-clicked');
   showNext('#ageSection');
 });

 $('input:radio').click(function(event) {
   showNext('#quantitySection');
 });

 $('#done').click(function() {
   resetForm();
 });
});
