function Movie(id, title, showtimes, firstRun) {
  this.id = id;
  this.title = title;
  this.showtimes = showtimes;
  this.firstRun = firstRun;
}

function Ticket(age, firstRun, matinee, quantity) {
  this.age = age;
  this.firstRun = firstRun;
  this.matinee = matinee;
  this.quantity = quantity;
}

function clearStorage() {
  localStorage.clear();
}

function buildMovies() {
  var objectContainer = [];
  var rockyHorror = new Movie('rockyHorror', 'Rocky Horror', ['10:00am','1:00pm','6:45pm'], false);
  var deadpool = new Movie('deadpool', 'Deadpool', ['Noon','5:30pm','10:00pm'], true);
  var littleMermaid = new Movie('littleMermaid', 'Little Mermaid', ['9:00am','Noon','3:00pm'], false);
  var scorpionKing = new Movie('scorpionKing', 'Scorpion King', ['N/A','N/A','Midnight'], false);

  objectContainer.push(rockyHorror, littleMermaid, deadpool, scorpionKing);
  loadStorage(objectContainer);
}

function loadStorage(container) {
  for(var i = 0; i < container.length; i++) {
    addToStorage(container[i]);
  }
}

function addToStorage(item) {
  var key = item.id;
  var item = JSON.stringify(item);
  localStorage.setItem(key, item);
}

function loadMovieData(option) {
  var movie = parseObject(localStorage.getItem(option));
  displayMovieData(movie);
}

function parseObject(option) {
  var parsed = JSON.parse(option);
  return parsed;
}

function displayMovieData(movie) {
  $("#time1").text(movie.showtimes[0]);
  $("#time2").text(movie.showtimes[1]);
  $("#time3").text(movie.showtimes[2]);
}

function hideAll() {
  $('#showtimesSection, #ageSection, #quantitySection').hide();
}

function showNext(elementId) {
  $(elementId).fadeIn(800);
}

function calculatePrice(ticket) {
  var initialPrice = isFirstRun(ticket.firstRun);
  var ageDiscount = isAdult(ticket.age);
  var quantity = ticket.quantity;
  var price = (initialPrice - ageDiscount) * quantity;
  return price[0] += '$';
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

function displayPrice(price) {
  console.log(price);
  $("#price").text(price).fadeIn(800);
}

$(document).ready(function() {
  clearStorage();
  buildMovies();

 $('#submit').click(function(event) {
   event.preventDefault();

   var movieTitle = $('#movieList').val();
   var movieMatinee = $('.time-clicked').text();
   var movieAge = $('input[name=age]:checked').val();
   var movieQuantity = $('#quantity').val();
   var firstRun = parseObject(localStorage.getItem(movieTitle)).firstRun;
   var ticket = new Ticket (movieAge, firstRun, movieMatinee, movieQuantity);
   var price = calculatePrice(ticket);
   displayPrice(price);
 });

 $('#movieList').change(function() {
   hideAll();
   showNext('#showtimesSection');
   var option = $(this).val();
   (option === "") ? hideAll() : loadMovieData(option);
 });

 $('.show-button').click(function(event) {
   $(this).toggleClass('time-clicked');
   showNext('#ageSection');
 });

 $('input:radio').click(function(event) {
   showNext('#quantitySection');
 });
});
