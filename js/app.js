 'use strict';

// ------------- Initializing global variables---------------------------
let allAnimalObjectArray = [];
let keywordArray = [];
let hornsArray = [];

const hornHtml = $('#horn-template').html();
const template = Handlebars.compile(hornHtml);


//----------------------Construcor Function-----------------------------
function Animal (animal){
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;

  allAnimalObjectArray.push(this);
}

//-----------------------Other Functions--------------------------------

//Adds images to page
Animal.prototype.render_img_to_page = function (){
  const next_img_html = template(this);
  $('#container').append(next_img_html);
}

//Adds key words to dropdown menu
//Filters out duplicates
Animal.prototype.render_keyword_to_dropdown = function (){
  const check_word = this.keyword;
  if (keywordArray.includes(check_word)) {
    return;
  }
  $('#dropdown_title').append('<option id="next_animal"></option>');

  $('#next_animal').text(this.keyword);
  $('#next_animal').attr('id', 'keywords_on_page');

  keywordArray.push(this.keyword);
}

//Adds number of horms to dropdown menu
//Filters out duplicates
Animal.prototype.render_horns_to_dropdown = function(){
  const check_number = this.horns;
  if (hornsArray.includes(check_number)) {
    return;
  }
  $('#dropdown_horns').append('<option id="next_horn"></option>');

  $('#next_horn').text(this.horns);
  $('#next_horn').attr('id', 'horns_on_page');
  hornsArray.push(this.horns);
}

//Filters images based on title selected from dropdown menu
$('#dropdown_title').on('change', function(){
  let $selectedAnimal = $(this).val();
  $('div').hide();
  $(`div[class = "${$selectedAnimal}"]`).show();
});

//Filteres images based on number of horns from dropdown menu
$('#dropdown_horns').on('change', function(){
  let $selectedHorns = $(this).val();
  $('div').hide();
  $(`div[data-horns = "${$selectedHorns}"]`).show();
});

//--------------Event Listeners--------------------------------
// Toggles data of two pages on click of checkbox
$('input').on('click', (e) =>{
  if(e.target.checked){
    allAnimalObjectArray = [];
    keywordArray = [];
    hornsArray = [];
    // Whipes all the images, keywords, and horns on the page/dropdown
    $('section[id="container"]').detach();
    $('option[id="keywords_on_page"]').detach();
    $('option[id="horns_on_page"]').detach();
    $('main').append('<section id="container" class="deck"></section>');
    Animal.initialize_the_content('data/page-2.json');
  }
  else {
    allAnimalObjectArray = [];
    keywordArray = [];
    hornsArray = [];
    $('section[id="container"]').detach();
    $('option[id="keywords_on_page"]').detach();
    $('option[id="horns_on_page"]').detach();
    $('main').append('<section id="container" class="deck"></section>');
    Animal.initialize_the_content('data/page-1.json');
  }
})

//Sorts images based on number of horns, after button is clicked
$('button.sortNum').on('click', function() {
  $('section[id="container"]').detach();
  allAnimalObjectArray.sort((a,b) => {
    if(a.horns > b.horns) return 1;
    if(a.horns < b.horns) return -1;
    return 0;
  })
  $('main').append('<section id="container" class="deck"></section>');
  allAnimalObjectArray.forEach(animal => animal.render_img_to_page());
})

//Sorts images by title alphabetically, after button is clicked
$('button.sortAlph').on('click', function() {
  $('section[id="container"]').detach();
  allAnimalObjectArray.sort((a,b) => {
    if(a.title > b.title) return 1;
    if(a.title < b.title) return -1;
    return 0;
  })
  $('main').append('<section id="container" class="deck"></section>');
  allAnimalObjectArray.forEach(animal => animal.render_img_to_page());
})

//-------------------Initializing the content--------------------------
Animal.initialize_the_content = (data_set) =>{
  $.get(data_set, 'json').then(data =>{
    data.forEach(animal =>{new Animal (animal);})
    allAnimalObjectArray.forEach(animal => {animal.render_img_to_page();})
    allAnimalObjectArray.forEach(animal => {animal.render_keyword_to_dropdown();})
    allAnimalObjectArray.forEach(animal => {animal.render_horns_to_dropdown();})
  });
}

Animal.initialize_the_content('data/page-1.json');
