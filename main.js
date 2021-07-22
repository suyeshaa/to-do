var txt = "";
var num = 0;
var arr = [];
let thm = false;

if (localStorage.getItem("todoItems") != null) {
  getItems();
}
function getItems() {
  var retrieveItems = JSON.parse(localStorage.getItem("todoItems"));
  var curr = localStorage.getItem("theme");
  var number = localStorage.getItem("numb");

  if (curr == "true") {
    thm = true;
    $("body").attr("data-theme", "dark");
    // $("body").reClass("dark-theme");
  } else {
    thm = false;
  }
  console.log(retrieveItems);
  // nArr = [...retrieveItems];

  $.each(retrieveItems, function (i, { txt, cls, txtcls }) {
    add(txt, cls, txtcls);
  });

  $(".itm-left span").text(number);
}

function add(txt, cls, clsTxt) {
  var addItem = document.createElement("div");

  addItem.innerHTML = `<div class="item input-field draggable ">
    <button class="btn btm-btn ${cls ? cls : ""}"></button>
    <div class="descrip ${clsTxt}">${txt}</div>
    <div class ="close-btn"><img src="images/icon-cross.svg" /></div>
  </div>`;

  $(".items").append(addItem);

  arr.push(addItem);
  $(".draggable").draggable({
    axis: "y",
    revert: true,
    scroll: false,
    placeholder: "sortable-placeholder",
    cursor: "move",
  });
}

var arrTxt = [];

$(".main-btn").click(() => {
  var todoItem = $(".inp").val();
  if (todoItem == "") {
  } else {
    add(todoItem);
    arrTxt.push(todoItem);

    $(".btm").css("display", "flex");
    leftItems();
    $(".itm-left span").text(num);
  }
  $("input").val("");
  storeItems();
});

function leftItems() {
  num = 0;
  $.each(arr, function (i, v) {
    if (
      !$(v.firstChild.firstChild.nextElementSibling).hasClass("complete-btn")
    ) {
      num++;
    }
  });

  storeNum(num);
}

var temp = "";

$(".items").on("click", ".btm-btn", function () {
  temp = 1;
  $(this).toggleClass("complete-btn");
  $(this.nextElementSibling).toggleClass("complete-text");

  storeItems();
  leftItems();
  $(".itm-left span").text(num);
});

$(".items").on("mouseenter", ".input-field", function () {
  // console.log(this.lastElementChild);
  $(this.lastElementChild).addClass("disp");
});

$(".items").on("mouseleave", ".input-field", function () {
  $(this.lastElementChild).removeClass("disp");
});

var delEl = "";

$(".items").on("click", ".close-btn", function () {
  // console.log(this.parentElement.parentElement);
  // $(".items").html("");
  delEl = this.parentElement.parentElement;
  $.each(arr, function (i, v) {
    console.log(v);
    if (v === delEl) {
      arr.splice(i, 1);
      $(v.firstChild).remove();
      num--;
      $(".itm-left span").text(num);
    }
  });

  storeItems();
  leftItems();
  $(".itm-left span").text(num);
  // console.log(arrTxt);
});

$(".actv").click(() => {
  $(".all").css("color", "hsl(234, 11%, 52%)");
  $(".cmpl").css("color", "hsl(234, 11%, 52%)");
  $(".actv").css("color", " hsl(220, 98%, 61%)");
  // $(".items").html("");
  $.each(arr, function (i, v) {
    $(v).show();
  });

  $.each(arr, function (i, v) {
    // console.log($(v.firstChild.firstChild.nextElementSibling));
    if (
      $(v.firstChild.firstChild.nextElementSibling).hasClass("complete-btn")
    ) {
      // add(v.firstChild.children[1].textContent);
      // arr.pop();
      $(v).hide();
    }
  });
});

$(".cmpl").click(() => {
  $(".all").css("color", "hsl(234, 11%, 52%)");
  $(".actv").css("color", "hsl(234, 11%, 52%)");
  $(".cmpl").css("color", " hsl(220, 98%, 61%)");
  // $(".items").html("");
  console.log(arr);
  $.each(arr, function (i, v) {
    $(v).show();
  });
  $.each(arr, function (i, v) {
    // console.log($(v.firstChild.firstChild.nextElementSibling));
    if (
      !$(v.firstChild.firstChild.nextElementSibling).hasClass("complete-btn")
    ) {
      $(v).hide();

      // arr.pop();
    } else {
      $(v).show();
    }
  });
});

function showAll() {
  $(".all").click(() => {
    $(".actv").css("color", "hsl(234, 11%, 52%)");
    $(".cmpl").css("color", "hsl(234, 11%, 52%)");
    $(".all").css("color", " hsl(220, 98%, 61%)");
    // $(".items").html("");
    console.log(arr);
    $.each(arr, function (i, v) {
      $(v).show();
    });
  });
}

showAll();

$(".clear").click(function () {
  $(".items").html("");

  let newArr = [];
  $.each(arr, function (i, v) {
    if (
      !$(v.firstChild.firstChild.nextElementSibling).hasClass("complete-btn")
    ) {
      newArr.push(v);
    }
  });

  arr = [];
  // arr = [...newArr];
  // console.log(arr, newArr);
  $.each(newArr, function (i, v) {
    console.log(v.firstChild.children[1].textContent);
    add(v.firstChild.children[1].textContent);
  });
  storeItems();
  leftItems();
  $(".itm-left span").text(num);
});

$(".theme").click(() => {
  // console.log($("body").attr("data-theme"));
  let currTheme = $("body").attr("data-theme");
  $("body").attr("data-theme", `${currTheme == "light" ? `dark` : `light`}`);

  // $("body").attr("data-theme") == "light"
  //   ? $("body").attr("data-theme", "dark")
  //   : $("body").attr("data-theme", "light");
  // $("body").attr("data-theme", "dark");

  $(".theme").toggleClass("thm");
  thm = !thm;
  store(thm);
});

var nArr = [];

function store(thm) {
  localStorage.setItem("theme", thm);
}

function storeNum(num) {
  localStorage.setItem("numb", num);
}

function storeItems() {
  let lclStr = [];
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].firstChild.children[1].classList.value);
    lclStr.push({
      txt: arr[i].firstChild.children[1].textContent,
      cls: arr[i].firstChild.firstChild.nextElementSibling.classList.value,
      txtcls: arr[i].firstChild.children[1].classList.value,
    });
  }
  console.log(lclStr);
  localStorage.setItem("todoItems", JSON.stringify(lclStr));
}

// function getItems() {
//   var retrieveItems = JSON.parse(localStorage.getItem("todoItems"));
//   nArr = [...retrieveItems];

//   $.each(nArr, function (i, v) {
//     if (
//       !$(v.firstChild.firstChild.nextElementSibling).hasClass("complete-btn")
//     ) {
//       add(v.firstChild.children[1].textContent);
//     } else {
//       add(v.firstChild.children[1].textContent, "complete-btn", "complete-txt");
//     }
//   });
// }
