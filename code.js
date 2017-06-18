$(document).ready(function(){

    //Start page
    if (!window.location.hash) {
      $("#meleetohit").show();
      document.location.hash = "meleetohit";
    }

    //Clear sessionStorage
    window.onbeforeunload = function(event)
        {
          sessionStorage.clear();
        };


    function pagehandler(page)  {
      $(".calculator-wrapper").hide();
      $(page).css({"display":"flex"});
      $(".links").css({"color": "black"});
      $(page + "-link").css({"color": "white"});
    }

    //Load correct page on hash
    if (window.location.hash == "#meleetohit") {
      pagehandler("#meleetohit");
    }
    if (window.location.hash == "#missiletohit") {
      pagehandler("#missiletohit");
    }
    if (window.location.hash == "#spellfatigue") {
      pagehandler("#spellfatigue");
    }
    if (window.location.hash == "#spellpenetration") {
      pagehandler("#spellpenetration");
    }
    if (window.location.hash == "#communion") {
      pagehandler("#communion");
    }
    if (window.location.hash == "#besiegingfortresses") {
      pagehandler("#besiegingfortresses");
      besiegingsticky();
    }

    //Links
    $("#meleetohit-link").click(function(){
      pagehandler("#meleetohit");
      document.location.hash = "meleetohit";
    });
    $("#missiletohit-link").click(function(){
      pagehandler("#missiletohit");
      document.location.hash = "missiletohit";
    });
    $("#spellfatigue-link").click(function(){
      pagehandler("#spellfatigue");
      document.location.hash = "spellfatigue";
    });
    $("#spellpenetration-link").click(function(){
      pagehandler("#spellpenetration");
      document.location.hash = "spellpenetration";
    });
    $("#communion-link").click(function(){
      pagehandler("#communion");
      document.location.hash = "communion";
    });
    $("#besiegingfortresses-link").click(function(){
      pagehandler("#besiegingfortresses");
      document.location.hash = "besiegingfortresses";
      besiegingsticky();
    });
});

function hitcalculation(attackroll, defenseroll, number) {
  var ptable = [1, 1, 2, 3, 3, 5, 6, 8, 11, 14, 18, 24, 30, 38, 46, 54, 62, 70, 76, 82, 86, 89, 92, 94, 95, 97, 97, 98, 99];

  var hitdifference = (attackroll - defenseroll);

  var chancetohit = ptable[hitdifference + 14];

  if (hitdifference < -14) {
    chancetohit = 1;
  }
  if (hitdifference > 14) {
    chancetohit = 99;
  }

  var red = Math.floor((100 - chancetohit) * 2.5);
  var green = Math.floor(chancetohit * 2.5);

  $("#card-result-" + number).css({
                  transition: "background-color 1s ease-in-out",
                      "background-color": "rgb(" + red + ", " + green + ", 0)"
  });

  return chancetohit;
}

function rounddec(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function cardcolor(card,r,g,b) {
  $(card).css({
                  transition: "background-color 1s ease-in-out",
                      "background-color": "rgb(" + r + ", " + g + ", " + b + ")"
  });
}

function attackcalculation() {

  var attackattribute = $("#attackattribute-1").val();
  var attackfatigue = $("#attackfatigue-1").val();

  var defenseattribute = $("#defenseattribute-1").val();
  var defensefatigue = $("#defensefatigue-1").val();
  var numberofattacks = $("#numberofattacks-1").val();

  var attackroll = (attackattribute - Math.floor(attackfatigue / 20));
  $("#attackroll-1").html(attackroll);

  var defenseroll = (defenseattribute - Math.floor(defensefatigue / 10) - (numberofattacks * 2));
  $("#defenseroll-1").html(defenseroll);

  var difference = (attackroll - defenseroll);
  $("#difference-1").html(Math.abs(difference));

  var chancetohit = hitcalculation(attackroll, defenseroll, 1);
  $("#chancetohit-1").html(chancetohit + "%");

}

function missilecalculation() {
  var size = $("#size-2").val();
  var magicweapon = $("#magicweapon-2").is(":checked");

  var parry = $("#parry-2").val();
  var fatigue = $("#fatigue-2").val();

  if (magicweapon == true) {
    magicweapon = 2;
  } else {
    magicweapon = 0;
  }

  var attackroll = (+ size + magicweapon);
  $("#attackroll-2").html(attackroll);

  var defenseroll = (2 + (parry * 2) - Math.floor(fatigue / 20));
  $("#defenseroll-2").html(defenseroll);

  var difference = (attackroll - defenseroll);
  $("#difference-2").html(Math.abs(difference));

  var chancetohit = hitcalculation(attackroll, defenseroll, 2);
  $("#chancetohit-2").html(chancetohit + "%");
}

function spellfatiguecalculation() {
  var fatigue = $("#fatigue-3").val();
  var minimumskill = $("#minimumskill-3").val();

  var mageskill = $("#mageskill-3").val();
  var encumbrance = $("#encumbrance-3").val();

  var fatiguediscount = 1 / (1 + (mageskill - minimumskill));
  var fatiguecost = (fatigue * fatiguediscount) + (+ encumbrance * 2);

  if (isFinite(fatiguecost)) {
    if ((fatiguecost <= 100) && (fatiguecost >= 0)) {
      $("#fatiguecost-3").html(Math.floor(fatiguecost));
      cardcolor("#card-result-3",0,255,0);
    }
    if (fatiguecost < 0) {
      fatiguecost = $("#fatiguecost-3").html("Can't cast spell");
      cardcolor("#card-result-3",255,0,0);
    }
    if (fatiguecost > 100) {
      $("#fatiguecost-3").html(Math.floor(fatiguecost));
      cardcolor("#card-result-3",100,149,237);
    }
  }
  if (!isFinite(fatiguecost)) {
    fatiguecost = $("#fatiguecost-3").html("Invalid");
    cardcolor("#card-result-3",255,0,0);
  }

  if (isFinite(fatiguediscount)) {
    if (fatiguediscount == 1) {
      $("#fatiguediscount-3").html("None");
    } else {
      $("#fatiguediscount-3").html(rounddec(fatiguediscount, 2));
    }
  } else {
    $("#fatiguediscount-3").html("-");
  }

}

function spellpenetrationcalculation() {
  var additionalskillinpath = $("#additionalskillinpath-4").val();
  var additionalpenetration = $("#additionalpenetration-4").val();

  var magicresistance = $("#magicresistance-4").val();
  var skillinspellpath = $("#skillinspellpath-4").val();

  var casterpenetrationroll = 12 + (Math.ceil(additionalskillinpath / 2)) + (+ additionalpenetration);
  var targetsmrroll = (+ magicresistance) + (Math.ceil(skillinspellpath / 2));

  $("#casterpenetrationroll-4").html(casterpenetrationroll);
  $("#targetsmrroll-4").html(targetsmrroll);

  var difference = casterpenetrationroll - targetsmrroll;
  $("#difference-4").html(difference);

  var chancetopenetrate = hitcalculation(casterpenetrationroll, targetsmrroll, 4);

  $("#chancetopenetrate-4").html(chancetopenetrate + "%");
}

function siegefortresscalculation() {

  var siegingunitstrength = 0;
  var siegingflyingunit = 0;
  var siegingunitamount = 0;

  var besiegingunitstrength = 0;
  var besiegingflyingunit = 0;
  var besiegingunitamount = 0;
  var besiegingmindlessunit = 0;

  var totalreductionstrength = 0;
  var totalrepairstrength = 0;

  var reductionstrengthArray = [];
  var repairstrengthArray = [];

  var fortressdefense = 0;

  var difference = 0;

  var x = 0;
  var y = 0;
  var za = 0;
  var zb = 0;

  //Loop through values and add them to calc variables
  $(".siegingcard").each(function() {

    siegingunitstrength = Number($(this).find(".siegingunitstrength").val());
    siegingunitamount = Number($(this).find(".siegingunitamount").val());
    siegingflyingunit = Number($(this).find(".siegingflyingunit").is(":checked"));

    reductionstrengthArray[x] = (((siegingunitstrength * siegingunitstrength) / 100) + siegingflyingunit) * siegingunitamount;

    x++;

  });

  //Loop trough results and add to total
  $(reductionstrengthArray).each(function() {
    totalreductionstrength += reductionstrengthArray[za];
    za++;
  });

  $(".besiegingcard").each(function() {

    besiegingunitstrength = Number($(this).find(".besiegingunitstrength").val());
    besiegingunitamount = Number($(this).find(".besiegingunitamount").val());
    besiegingflyingunit = Number($(this).find(".besiegingflyingunit").is(":checked"));

    if (Number($(this).find(".besiegingmindlessunit").is(":checked"))) {
      besiegingmindlessunit = 0.1;
    } else {
      besiegingmindlessunit = 1;
    }

    repairstrengthArray[y] = ((((besiegingunitstrength * besiegingunitstrength) / 100) + besiegingflyingunit) * besiegingunitamount) * besiegingmindlessunit;

    y++;

  });

  $(repairstrengthArray).each(function() {
    totalrepairstrength += repairstrengthArray[zb];
    zb++;
  });

  fortressdefense = $("#fortressdefense-5").val();

  difference = totalreductionstrength - totalrepairstrength;

  $("#totalreductionstrength-5").html(rounddec(totalreductionstrength,2));
  $("#totalrepairstrength-5").html(rounddec(totalrepairstrength,2));
  $("#difference-5").html(rounddec(difference,2));

  //Breaching section
  if (fortressdefense === "" || fortressdefense <= 0) {
    $("#defenseleft-5").html("-");

    var turnstobreach = "Nothing to breach";
    cardcolor("#card-result-5",255,255,255);
  }

  if (fortressdefense > 0) {

    var defenseleft = fortressdefense - difference;

    if (difference < 0) {
      if (totalreductionstrength <= 0) {
        var turnstobreach =  "No attackers";
      } else {
        var turnstobreach = "Fortress is being repaired";
      }
      defenseleft = fortressdefense;
      cardcolor("#card-result-5",255,0,0);
    }
    if (difference > 0) {

      cardcolor("#card-result-5",0,255,0);

      if (totalrepairstrength <= 0) {
        var turnstobreach = 1 + " (no defenders)";
        defenseleft = 0;
      } else {
        var turnstobreach = Math.ceil(fortressdefense / difference);
      }

    }
    if (difference == 0) {

      var turnstobreach = "Status quo";
      cardcolor("#card-result-5",100,149,237);
    }
    $("#defenseleft-5").html(Math.round(defenseleft));
  }

  $("#turnstobreach-5").html(turnstobreach);

}

function addunit (type,cardID) {

  if (type == 1) {
    if (sessionStorage.siegingunitID) {
      sessionStorage.siegingunitID = Number(sessionStorage.siegingunitID) + 1;
    } else {
      sessionStorage.siegingunitID = 2;
    }

    var siegingunitID = sessionStorage.siegingunitID;

    siegingcard =
    '<div id="siegingcardID_' + siegingunitID + '" class="card siegingcard">' +
      '<h2>Sieging unit #' + siegingunitID + '</h2>' +
      '<div class="card-category-wrapper">' +
        '<div class="card-category">' +
          '<h3>Strength: <input class="siegingunitstrength" maxlength="3" onchange="siegefortresscalculation()"></input></h3>' +
          '<h3 class="input-long">Number: <input class="siegingunitamount" maxlength="5" onchange="siegefortresscalculation()"></input></h3>' +
        '</div>' +
        '<div class="card-category">' +
          '<h3>Flying: <input class="siegingflyingunit" onchange="siegefortresscalculation()" type="checkbox" class="cbox"></input></h3>' +
        '</div>' +
      '</div>' +
      '<div class="button-wrapper">' +
        '<button class="siegingunit-add" onclick="addunit(1,this)">Add unit</button>' +
        '<button class="siegingunit-remove" onclick="removeunit(1,' + siegingunitID + ')">Remove unit</button>' +
      '</div>' +
    '</div>';

    $(cardID).parent().parent().before(siegingcard).hide().fadeIn("fast");

    //Enable remove unit button when more than one card
    if ($(".siegingunit-remove").length > 1) {
      $(".siegingunit-remove").prop("disabled", false);
    }
  }

  if (type == 2) {
    if (sessionStorage.besiegingunitID) {
      sessionStorage.besiegingunitID = Number(sessionStorage.besiegingunitID) + 1;
    } else {
      sessionStorage.besiegingunitID = 2;
    }

    var besiegingunitID = sessionStorage.besiegingunitID;

    besiegingcard =
    '<div id="besiegingcardID_' + besiegingunitID + '" class="card besiegingcard">' +
      '<h2>Besieged unit #' + besiegingunitID + '</h2>' +
      '<div class="card-category-wrapper">' +
        '<div class="card-category">' +
          '<h3>Strength: <input class="besiegingunitstrength" maxlength="3" onchange="siegefortresscalculation()"></input></h3>' +
          '<h3 class="input-long">Number: <input class="besiegingunitamount" maxlength="5" onchange="siegefortresscalculation()"></input></h3>' +
        '</div>' +
        '<div class="card-category">' +
          '<h3>Flying: <input class="besiegingflyingunit" onchange="siegefortresscalculation()" type="checkbox" class="cbox"></input></h3>' +
          '<h3>Mindless: <input class="besiegingmindlessunit" onchange="siegefortresscalculation()" type="checkbox" class="cbox"></input></h3>' +
        '</div>' +
      '</div>' +
      '<div class="button-wrapper">' +
        '<button class="besiegingunit-add" onclick="addunit(2,this)">Add unit</button>' +
        '<button class="besiegingunit-remove" onclick="removeunit(2,' + besiegingunitID + ')">Remove unit</button>' +
      '</div>' +
    '</div>';

    $(cardID).parent().parent().before(besiegingcard).hide().fadeIn("fast");

    //Enable remove unit button when more than one card
    if ($(".besiegingunit-remove").length > 1) {
      $(".besiegingunit-remove").prop("disabled", false);
    }
  }
}

function removeunit(type,cardID) {
  if (type == 1) {
    $("#siegingcardID_" + cardID).fadeOut("fast",function() {
      $(this).remove();
      siegefortresscalculation();
      //Check if last card
      if ($(".siegingunit-remove").length == 1) {
        $(".siegingunit-remove").prop("disabled", true);
      }
    });
  }

  if (type == 2) {
    $("#besiegingcardID_" + cardID).fadeOut("fast",function() {
      $(this).remove();
      siegefortresscalculation();
      //Check if last card
      if ($(".besiegingunit-remove").length == 1) {
        $(".besiegingunit-remove").prop("disabled", true);
      }
    });
  }
}

function besiegingsticky() {
  var distance = $(".fixed-block-wrapper").offset().top;
  var $w = $(window);

    $w.scroll(function() {
      if ($w.scrollTop() >= distance) {
        $(".fixed-block-wrapper").addClass("sticky");
      }
      if ($w.scrollTop() < distance) {
        $(".fixed-block-wrapper").removeClass("sticky");
      }
    });
}

function communioncalculation() {

  //gathering input values
  var spellfatigue = $("#spell-fatigue-6").val();
  var spellminimumskill = $("#spell-minimumskill-6").val();
  var magicscale = $("#magic-scale-6").val();

  var masterskill = $("#master-skill-6").val();
  var masterencumbrance = $("#master-encumbrance-6").val();
  var extragems = $("#extra-gems-6").val();

  var slavesskill = $("#slaves-skill-6").val();
  var slavesamount = $("#slaves-amount-6").val();

  //intermediate values
  if (slavesamount > 0) {
      var communionskillboost = console.log(Math.floor(Math.log2(slavesamount)));
  }

}
