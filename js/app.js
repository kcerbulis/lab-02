 'use strict';



// ------------- Initializing global variables---------------------------
const allAnimalObjectArray = [];
const keywordArray = [];






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
  const selected_img = $('#img_1_container').html();

  $('main').append('<div id="next_img_container"></div>');
  $('#next_img_container').html(selected_img);

  $('#next_img_container').find('img').attr('src', this.image_url);
  $('#next_img_container').attr('class', this.keyword);
  $('#next_img_container').find('h2').text(this.title);
  $('#next_img_container').find('p').text(this.description);
  $('#next_img_container').attr('id', '');
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

//Dropdown box selection filtering
$('#dropdown').on('change', function(){
  let $selectedAnimal = $(this).val();
  $('div').hide();
  console.log($(`div[class = "${$selectedAnimal}"]`));
  $(`div[class = "${$selectedAnimal}"]`).show();
});


//-------------------Initializing the content--------------------------
Animal.initialize_the_content = () =>{
  $.get('data/page-1.json', 'json').then(data =>{
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

Animal.initialize_the_content();
