function init() {

 var tabBlock = document.getElementById("tabBlock");

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
   var title = document.createElement("h1");
   title.className = "title";
   boardHTML.appendChild(title);
   var pins = document.createElement("div");
   pins.className = "pins";
   boardHTML.appendChild(pins);
   title.innerHTML = board.board[j].category.replace("_", " ");
  }

  var tab = document.querySelectorAll(".tab");
  var length = tab.length;
  tab[0].className = "tab top";
  tab[length-1].className = "tab bottom";

  for (var i = 0; i < tab.length; i++) {

   tab[i].addEventListener("click", function() {
     for (var x = 0; x < tab.length; x++) {
       tab[x].className = "tab";
       tab[0].className += " top";
       tab[tab.length-1].className += " bottom";
     }
       this.className = "tab--after";
       tab[0].className += " top";
       tab[tab.length-1].className += " bottom";
   });
  }

  $("#tabBlock .tab a").click(function(e) {
    e.preventDefault();
    var id = $(e.target).attr('href');
    $('html, body').animate({
        scrollTop: $(id).offset().top-60
    }, 500, "easeOutBack");
  });

      function displayBoard() {
        var boards = [];
        for (var z = 0; z < board.board.length; z++) {
          for (var c = 0; c < board.board[z].url.length; c++) {
            boards.push(board.board[z].url[c]);
        }
        }
        console.log(boards);
        // var boards = [ 'zackargyle/burgers','zackargyle/travel-ideas'];
        var BOARD_URL = "https://api.pinterest.com/v1/boards/{{board}}/pins/?access_token=AbIRvv67woWRh2yvuagaQzKMew58FClqyLz187BCtx3yBWBC3AAAAAA&fields=id%2Clink%2Cnote%2Curl%2Ccreated_at%2Cimage";
        var promises = $.map(boards, function(boardOBJ) {
        var boardOBJ = BOARD_URL.replace('{{board}}', boardOBJ);
        return $.get(boardOBJ).then(function(response) {
          return response.data;
         });
      });

      $.when.apply($, promises).done(function() {
        var boards = Array.prototype.slice.call(arguments);
        $.each(boards, function(i, pins) {
          $.each(pins, function(i, pin) {
            var pinHTML = "<a data-pin-do='embedPin' href='"+pin.url+"'></a>";
            var pints = document.getElementsByClassName("pins");

                pints[1].innerHTML += pinHTML;



          })
        });
        PinUtils.build();
      });
      }
displayBoard();
};
window.onload = init();
