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
  var littleMermaid = new Movie('littleMermaid', 'LittleMermaid', ['9:00am','Noon','3:00pm'], false);
  objectContainer.push(rockyHorror, littleMermaid);
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

function showNext(elementId) {
  $(elementId).fadeIn(800);
}

$(document).ready(function() {
  clearStorage();
  buildMovies();

 $('#submit').click(function(event) {
   event.preventDefault();
 });

 $('#movieList').change(function() {
   showNext('#showtimesSection');
   var option = $(this).val();
   loadMovieData(option);
 });

 $('.show-button').click(function(event) {
   showNext('#ageSection');
 });

 $('input:radio').click(function(event) {
   showNext('#quantitySection');
 });
});
