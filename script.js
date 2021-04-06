
const url_cat_imgs = config.cat_img;

const url_cat_facts = config.cat_facts;

const api_key = config.API_KEY;

async function facts() {
  const response = await fetch(url_cat_facts);
  const data = await response.json();
  return data[Math.floor(Math.random()*data.length)];
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

var Animation = function(el) {
    'use strict';
    var a = this;
    
    a.init = async function() {
        a.el = el;
        a.letters = "abcdefghijklmnopqrstuvwxyz";
        a.current_length = 0;
        a.fadeBuffer = false;
        a.message = await facts();
        setTimeout(a.animate, 100);
    };
    
    a.randomizeString = function(length) {
        
        let random_text = '';
        
        while(random_text.length < length) {
            random_text += a.letters.charAt(Math.floor(Math.random() * a.letters.length));
        }
        
        return random_text;
    };
    
    a.animate = function() {
        if(a.current_length < a.message.length) {
            a.current_length += 2;
            if (a.current_length > a.message.length) {
                a.current_length = a.message.length;
            }
            
            let message = a.randomizeString(a.current_length);
            a.el.innerHTML = message;
            
            setTimeout(a.animate, 30);
        } else {
            setTimeout(a.animateFadeBuffer, 30);
        }
    };
    
    a.animateFadeBuffer = function() {
        
        if(a.fadeBuffer === false) {
            a.fadeBuffer = [];
            for(let i = 0; i < a.message.length; i++) {
                a.fadeBuffer.push({
                    c: (Math.floor(Math.random() * Math.floor(a.message.length / 4)) + 1),
                    l: a.message.charAt(i)
                });
            }
        }
        
        let do_cycles = false;
        let message = '';
        
        for(let i = 0; i < a.fadeBuffer.length; i++) {
            let fader = a.fadeBuffer[i];
            if(fader.c > 0) {
                do_cycles = true;
                fader.c--;
                message += a.letters.charAt(Math.floor(Math.random() * a.message.length));
            } else {
                message += fader.l;
            }
        }
        
        a.el.innerHTML = message;
        
        if(do_cycles === true) {
            setTimeout(a.animateFadeBuffer, 30);
        }
    };
    
    a.init();
};

var anime = new Animation(document.getElementById('facts'));