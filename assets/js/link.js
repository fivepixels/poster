(()=>{var e=document.querySelectorAll("#createNewPosterBtn"),t=document.querySelector("#watchRandomPosterBtn"),n=document.querySelector("#watchRandomTopicBtn"),c=document.querySelector("#editBtn"),o=null,r=document.querySelector("#edit-profile-btn");function i(e){window.location.href=e}if(e)for(var d=0;d<e.length;d++)e[d].addEventListener("click",(function(){i("/new")}));t&&t.addEventListener("click",(function(){i("/random/poster")})),n&&n.addEventListener("click",(function(){i("/random/topic")})),c&&(o=c.dataset.redirectTo||null,c.addEventListener("click",(function(){i(o)}))),r&&r.addEventListener("click",(function(){i("/edit")}))})();