"use strict";
$(document).ready(() => {
  //jquery UI widget for tabs.
  $("#tabs").tabs();

  $("#cards").hide();

  //fetch the values from sessionStorage
  const playerName = sessionStorage.playerName;
  const numberOfCards = sessionStorage.numberOfCards;

  //load the values from sessionStorage if it exists else set default values

  $("#player_name").val(playerName ? playerName : "");
  $("#num_cards").val(numberOfCards ? numberOfCards : 48);

  // set player name and show information
  if (playerName) $("#player").text("Player: " + playerName);

  //on click event handler when save settings button is clicked.
  $("#save_settings").click(() => {
    //fetch input values
    const playerName = $("#player_name").val();
    const numberOfCards = $("#num_cards").val();

    //set the user input values in sessionStorage
    sessionStorage.playerName = playerName;
    sessionStorage.numberOfCards = numberOfCards;

    //reload the page
    location.reload();
  });

  const shuffle = (arr_cards) => {
    let currentIndex = arr_cards.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [arr_cards[currentIndex], arr_cards[randomIndex]] = [
        arr_cards[randomIndex],
        arr_cards[currentIndex],
      ];
    }

    return arr_cards;
  };

  // new game
  const newGame = () => {
    let arr_imgs = [];
    let arr_imgs2 = [];
    let arr_cards = [];
    const n_cards = sessionStorage.getItem("numberOfCards") / 2 || 24;
    const imgs_elements = $("#cards").find("a");
    let count = 0;
    for (let i = 0; i < imgs_elements.length; i++) {
      if (
        count < n_cards &&
        !arr_imgs.includes(imgs_elements[i].id) &&
        !arr_imgs2.includes(imgs_elements[i].id)
      ) {
        arr_imgs.push(imgs_elements[i].id);
        arr_imgs2.push(imgs_elements[i].id);
        count++;
      }
    }

    arr_cards = shuffle(arr_imgs.concat(arr_imgs2));

    $("#cards").children("a").remove();
    for (let i = 0; i < arr_cards.length; i++) {
      $("#cards").append(
        `<div class="card"><a id=${arr_cards[i]} href="#"><img src="${arr_cards[i]}" alt="" class="card_front" /><img src="images/back.png" alt="" class="card_back"/></a></div>`
      );
    }

    $("#cards").show();

    const arr_chosen_cards = [];
    let sum_matches = 0;

    $(".card").click(function () {
      if ($(this).find(".card_back").hasClass("fade-out")) {
        $(this).find(".card_back").removeClass("fade-out").addClass("fade-in");
      } else if ($(this).find(".card_back").hasClass("fade-in")) {
        $(this).find(".card_back").removeClass("fade-in").addClass("fade-out");
      } else {
        $(this).find(".card_back").addClass("fade-out");
      }

      if ($(this).find(".card_front").hasClass("fade-out")) {
        $(this).find(".card_front").removeClass("fade-out").addClass("fade-in");
      } else if ($(this).find(".card_front").hasClass("fade-in")) {
        $(this).find(".card_front").removeClass("fade-in").addClass("fade-out");
      } else {
        $(this).find(".card_front").addClass("fade-in");
      }

      if (arr_chosen_cards.length === 2) {
        arr_chosen_cards[0] = arr_chosen_cards[1];
        arr_chosen_cards[1] = $(this);
      } else if (arr_chosen_cards.length < 2) {
        arr_chosen_cards.push($(this));
      }

      // find the matches
      if (arr_chosen_cards.length === 2) {
        if (arr_chosen_cards[0].find("a").attr("id") === arr_chosen_cards[1].find("a").attr("id")) {
          sum_matches = sum_matches + 1;
          if (arr_chosen_cards[0].find(".card_front").hasClass("fade-in")) {
            arr_chosen_cards[0].addClass("fade-out");
          }

          if (arr_chosen_cards[1].find(".card_front").hasClass("fade-in")) {
            arr_chosen_cards[1].addClass("fade-out");
          }
        } else {

          if (arr_chosen_cards[0].find(".card_back").hasClass("fade-out")) {
            arr_chosen_cards[0]
              .find(".card_front")
              .removeClass("fade-in")
              .addClass("fade-out");
            arr_chosen_cards[0]
              .find(".card_back")
              .removeClass("fade-out")
              .addClass("fade-in");
          }

          if (arr_chosen_cards[1].find(".card_back").hasClass("fade-out")) {
            arr_chosen_cards[1]
              .find(".card_front")
              .removeClass("fade-in")
              .addClass("fade-out");
            arr_chosen_cards[1]
              .find(".card_back")
              .removeClass("fade-out")
              .addClass("fade-in");
          }

          arr_chosen_cards.length = 0;
        }
      }
    });
  };

  newGame();
});
