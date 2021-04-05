alert('red');
/*Learning to hide variables using .gitignore */

// From: https://docs.thecatapi.com
const url_cat_imgs = config.cat_img;
// A fake REST APi made by Typicode
const url_cat_facts = config.cat_facts;

const api_key = config.API_KEY;

/* get cat facts
   datas from:  https://github.com/vadimdemedes/cat-facts/blob/master/cat-facts.json
*/
async function facts() {
  const response = await fetch(url_cat_facts);
  const data = await response.json();
  document.getElementById('facts').innerHTML = data[Math.floor(Math.random()*data.length)];
}

// get cat images from thecatapi.com
async function cats() {
  const response = await fetch(url_cat_imgs,
  {
    method: 'GET',
    headers: { "x-api-key" : api_key }
  });
  const data = await response.json();
  
  document.getElementById('cats').src = data[0].url;
}

facts().catch((error) => {
    alert(error);
});

cats().catch((error) => {
    alert(error);
});
