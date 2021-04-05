const url_cat_imgs = config.cat_img;

const url_cat_facts = config.cat_facts;

const api_key = config.API_KEY;

async function facts() {
  const response = await fetch(url_cat_facts);
  const data = await response.json();
  document.getElementById('facts').innerHTML = data[Math.floor(Math.random()*data.length)];
}

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

