(()=>{var e=document.querySelector("#posterFullScreen"),s=e.querySelector("i"),t=document.querySelector(".watch-poster__main__content"),o=document.querySelector(".watch-poster__side-bar"),a=document.querySelector("#poster"),i=JSON.parse(a.dataset.posterInfo).content,n=document.querySelector(".markdown-body"),d=!1,r=!1;function c(e){return e&&(r=!0),d?(t.classList.remove("wide"),t.classList.add("short"),setTimeout((function(){o.classList.add("none-display"),o.classList.remove("none-display"),o.classList.remove("hide"),o.classList.add("show"),s.className="fas fa-expand"}),500),void(d=!1)):d?void 0:(o.classList.remove("show"),o.classList.add("hide"),setTimeout((function(){o.classList.remove("none-display"),o.classList.add("none-display"),t.classList.remove("short"),t.classList.add("wide"),s.className="fas fa-compress"}),400),void(d=!0))}n.innerHTML=i,e.addEventListener("click",c),window.addEventListener("resize",(function(){r||(window.innerWidth<=1125?d||c():d&&c())}))})();