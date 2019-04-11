 'use strict';



// ------------- Initializing global variables---------------------------
let allAnimalObjectArray = [];
const keywordArray = [];

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
  const option = $('#dropdown').html();
  $('#dropdown').append('<option id="next_animal"></option>');

  $('#next_animal').text(this.keyword);
  $('#next_animal').attr('id', '');

  keywordArray.push(this.keyword);
}



//-------------------Initializing the content--------------------------
Animal.initialize_the_content = (data_set) =>{



  $.get(data_set, 'json').then(data =>{
    data.forEach(animal =>{
      new Animal (animal);
    })
    allAnimalObjectArray.forEach(animal =>{
      animal.render_img_to_page();
    })
    allAnimalObjectArray.forEach(animal =>{
      animal.render_keyword_to_dropdown();
    })
  });

}


// Messing with day 4 feature 1 code
// Loads the page 2 p
$('input').on('click', (e) =>{
  if(e.target.checked){
    allAnimalObjectArray = [];
    // Whipes all of the photos off of the page
    $('div[id="container"]').detach();
    $('body').append('<div id="container"></div>');
    Animal.initialize_the_content('data/page-2.json');
  }
  else {
    allAnimalObjectArray = [];
    $('div[id="container"]').detach();
    $('body').append('<div id="container"></div>');
    Animal.initialize_the_content('data/page-1.json');
  }
})


//Dropdown box selection filtering
$('#dropdown').on('change', function(){
  let $selectedAnimal = $(this).val();
  $('div').hide();
  console.log($(`div[class = "${$selectedAnimal}"]`));
  $(`div[class = "${$selectedAnimal}"]`).show();
});



Animal.initialize_the_content('data/page-1.json');
