 'use strict';



// ------------- Initializing global variables---------------------------
let allAnimalObjectArray = [];
const keywordArray = [];
const hornsArray = [];

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
  $('#next_animal').attr('id', '');

  keywordArray.push(this.keyword);
}


Animal.prototype.render_horns_to_dropdown = function(){
  const check_number = this.horns;
  if (hornsArray.includes(check_number)) {
    return;
  }
  $('#dropdown_horns').append('<option id="next_horn"></option>');

  $('#next_horn').text(this.horns);
  $('#next_horn').attr('id', '');

  hornsArray.push(this.horns);
}

//-------------------Initializing the content--------------------------
Animal.initialize_the_content = (data_set) =>{
  $.get(data_set, 'json').then(data =>{
    data.forEach(animal =>{new Animal (animal);})
    allAnimalObjectArray.forEach(animal => {animal.render_img_to_page();})
    allAnimalObjectArray.forEach(animal => {animal.render_keyword_to_dropdown();})
    allAnimalObjectArray.forEach(animal => {animal.render_horns_to_dropdown();})
  });

}


// Messing with day 4 feature 1 code
// Loads the page 2 p
$('input').on('click', (e) =>{
  if(e.target.checked){
    console.log('Checked');
    allAnimalObjectArray = [];
    // Whipes all of the photos off of the page
    $('section[id="container"]').detach();
    $('main').append('<section id="container" class="deck"></section>');
    Animal.initialize_the_content('data/page-2.json');
  }
  else {
    allAnimalObjectArray = [];
    $('section[id="container"]').detach();
    $('main').append('<section id="container" class="deck"></section>');
    Animal.initialize_the_content('data/page-1.json');
  }
})

//-----------Still working on feature 4----------------------------
$('nav').on('click', 'button.num', function() {
  allAnimalObjectArray.sort((a,b) => {
    if(a.horns > b.horns) return 1;
    if(a.horns < b.horns) return -1;
    return 0;
  })
  $('section[id="container]').detach();
  allAnimalObjectArray.forEach(animal => animal.render_img_to_page());
})

//Dropdown box selection filtering
$('#dropdown_title').on('change', function(){
  let $selectedAnimal = $(this).val();
  $('div').hide();
  $(`div[class = "${$selectedAnimal}"]`).show();
});

//Dropdown horn selection filtering
$('#dropdown_horns').on('change', function(){
  let $selectedHorns = $(this).val();
  $('div').hide();
  $(`div[data-horns = "${$selectedHorns}"]`).show();
});

Animal.initialize_the_content('data/page-1.json');
