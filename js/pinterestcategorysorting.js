function init() {

 var tabBlock = document.getElementById("tabBlock");

 var title,
     openClose;

 for (var j = 0; j < board.board.length; j++) {
   var categoryTab = document.createElement("li");
   var target = document.createElement("a");
   categoryTab.className = "tab";
   tabBlock.appendChild(categoryTab);
   categoryTab.appendChild(target);
   target.setAttribute("href", "#"+board.board[j].category);
   target.innerHTML = board.board[j].category.replace("_", " ");
   var boardHTML = document.createElement("div");
   document.body.appendChild(boardHTML);
   boardHTML.className = "board";
   boardHTML.id = board.board[j].category;
   title = document.createElement("div");
   title.className = "title";
   title.innerHTML = board.board[j].category.replace("_", " ");
   openClose = document.createElement("div");
   openClose.className = "openClose";
   title.appendChild(openClose);
   boardHTML.appendChild(title);
   openClose.innerHTML = "-";
   var pins = document.createElement("div");
   pins.className = "pins";
   boardHTML.appendChild(pins);

   openClose.addEventListener("click", function(e) {
     var elem = e.target.parentNode.parentNode.querySelector(".pins");
     toggleClass(elem, "hidden");
     if (hasClass(elem, "hidden")) {
       e.target.innerHTML = "+";
     } else {
       e.target.innerHTML = "-";
       openClose.setAttribute("data-content", "-");
     }
   });
 }

 var test = document.querySelectorAll(".board");
 test = Array.prototype.slice.call(test);

   window.addEventListener("scroll", function(el) {
     test.forEach( function(elem) {
     if (isScrolledIntoView(elem)) {
         console.log(elem.getAttribute('id'));
        var id = elem.getAttribute('id');
        //var onBoard = document.getElementById(id);
        console.log(id);
        console.log('.tab [href="#'+ id.replace(" ", "_") +'"]');
        if (document.querySelector('.tab .active')) {
          document.querySelector('.tab .active').className = "";
        }

        document.querySelector('.tab [href="#'+ id.replace(" ", "_") +'"]').className = "active";

     }
   });
   });


 function isScrolledIntoView(el) {
    var elemTop = el.getBoundingClientRect().top + window.scrollY;
    var elemBottom = el.getBoundingClientRect().bottom + window.scrollY;
    var center = window.scrollY + window.innerHeight / 2;
    return (center > elemTop && center < elemBottom);
}

  var tab = document.querySelectorAll(".tab");
  var length = tab.length;
  tab[0].className = "tab top";
  tab[length-1].className = "tab bottom";

  $("#tabBlock .tab a").click(function(e) {
    e.preventDefault();
    var id = $(e.target).attr('href');
    $('html, body').animate({
        scrollTop: $(id).offset().top-60
    }, 500, "easeOutBack");
  });

  function displayBoard() {
    for (var i = 0; i < board.board.length; i++) {
      for (var x = 0; x < board.board[i].url.length; x++) {
        var pins = document.querySelector("#" + board.board[i].category + " .pins");
         var pinHTML = '<a data-pin-do="embedBoard" data-pin-board-width="905" data-pin-scale-height="900" data-pin-scale-width="300" href="https://www.pinterest.com/'+board.board[i].url[x]+'"></a>';
         pins.innerHTML += pinHTML;
      }
    }
    PinUtils.build();
  }

  function hasClass(elem, className) {

      var classNames = elem.className.split(' ');

      return classNames.indexOf(className) !== -1;

  }

  function addClass(elem, className) {

      var classNames = elem.className.split(' ');

      if (!hasClass(elem, className)) {

          classNames.push(className);

      }

      elem.className = classNames.join(' ');

  }

  function removeClass(elem, className) {

      var classNames = elem.className.split(' ');

      if (hasClass(elem, className)) {

          classNames.splice(classNames.indexOf(className), 1);

      }

      elem.className = classNames.join(' ');

  }

  function toggleClass(elem, className) {

      if (!hasClass(elem, className)) {

          addClass(elem, className);

      } else {

          removeClass(elem, className);
      }

  }

displayBoard();
};
window.onload = init();
