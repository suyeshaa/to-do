var txt = "";
var num = 0;

function add(txt) {
  var addItem = document.createElement("div");

  addItem.innerHTML = `<div class="item input-field">
    <button class="btn btm-btn"></button>
    <div class="descrip">${txt}</div>
    <div class ="close-btn"><img src="images/icon-cross.svg" /></div>
  </div>`;
  document.querySelector(".items").appendChild(addItem);
  // $(".btm-btn").click(() => {
  //   $(".btm-btn").toggleClass("complete-btn");
  //   $(".descrip").toggleClass("complete-text");
  // });
}

$(".main-btn").click(() => {
  var todoItem = $(".inp").val();
  if (todoItem == "") {
    //error
  } else {
    add(todoItem);
    num++;
    $(".itm-left span").text(num);
  }
  $("input").val("");
  console.log($(".btm-btn"));
});

$(".items").on("click", ".btm-btn", function () {
  console.log(this);
  $(this).toggleClass("complete-btn");
  $(this.nextElementSibling).toggleClass("complete-text");
});

$(".items").mouseenter(function () {
  console.log($(this).children().children()[0].lastElementChild);
  $($(this).children().children()[0].lastElementChild).addClass("disp");
});

$(".items").mouseleave(() => {
  $($(this).children().children()[0].lastElementChild).removeClass("disp");
});

$(".close-btn").click(() => {
  alert();
});

var arr = [];

$(".actv").click(() => {
  arr = $(".btm-btn").toArray();
  $(".actv").css("color", "white");
  // $(".items").css("display", "none");
  $(".items").html("");
  var result = true;
  $.each(arr, function (i, v) {
    if (!$(v).hasClass("complete-btn")) {
      result = false;
      console.log(v.parentElement.children[1].textContent);
      add(v.parentElement.children[1].textContent);
    }
  });
  console.log(result);
});

$(".cmpl").click(() => {
  arr = $(".btm-btn").toArray();
  $(".cmpl").css("color", "white");
  // $(".items").css("display", "none");
  $(".items").html("");
  var result = true;
  $.each(arr, function (i, v) {
    if ($(v).hasClass("complete-btn")) {
      console.log(v.classList.value);
      result = false;
      console.log(v.parentElement.children[1].textContent);
      add(v.parentElement.children[1].textContent);
    }
  });
  console.log(result);
});
