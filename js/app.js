 'use strict';



// ------------- Initializing global variables---------------------------
const allAnimalObjectArray = [];








function Animal (animal){
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;

  allAnimalObjectArray.push(this);
}




Animal.prototype.render_to_page = function (){
  const selected_img = $('#img_1_container').html();


  $('main').append('<div id="next_img_container"></div>');
  $('#next_img_container').html(selected_img);




  $('#next_img_container').find('img').attr('src', this.image_url);

  $('#next_img_container').find('h2').text(this.title);

  $('#next_img_container').find('p').text(this.description);

  $('#next_img_container').attr('id', '');

}







Animal.getting_horns = () =>{
  $.get('data/page-1.json', 'json').then(data =>{
    data.forEach(animal =>{
      new Animal (animal);
    })
    allAnimalObjectArray.forEach(animal =>{
    animal.render_to_page();
    })
  });
}

Animal.getting_horns();
console.log(allAnimalObjectArray);
