"use strict";

// ---------------    OVERLAY ----------------------------
document.getElementById('close-btn-cnt').addEventListener("click", hideOverlay);
document.getElementById('show-overlay-btn').addEventListener("click", function () {
  showOverlay();
});

function hideOverlay() {
  var ele = document.getElementById('overlay-cnt');
  ele.classList.add('hide-overlay');
  ele.classList.remove('show-overlay');
}

function showOverlay() {
  var ele = document.getElementById('overlay-cnt');
  ele.classList.remove('hide-overlay');
  ele.classList.add('show-overlay');
} // ------------------- SEARCH ENGINE ------------------------


$("body").not($("#search-engine-cnt")).click(function () {
  document.getElementById('result-cnt').style.display = "none";
});

function search_engine() {
  fetch('../assets/users_data/pseudo_placeAPI.json').then(function (data) {
    return data.json();
  }).then(function (data) {
    $("#search_input").keyup(function () {
      document.getElementById('result-cnt').style.display = "block";
      var val = $("#search_input").val().toUpperCase();
      var re = "(".concat(val, ")");
      var result = data.filter(function (word) {
        return word.location.match(re);
      });
      result = result.slice(0, 5);
      var lis = '';
      result.forEach(function (element) {
        lis += "<button onclick=\"window.location.href='search?place='+this.innerHTML.toLowerCase()\" >" + element.location + '</button><hr>';
      });
      document.getElementById('geo-data').innerHTML = lis;
    });
  });
} // ------------------- RANDOM POST FOR HOME PAGE ---------------


function display_home_data() {
  fetch('../assets/users_data/posts.json').then(function (data) {
    return data.json();
  }).then(function (data) {
    var num = Math.floor(Math.random() * data.length) % Math.floor(data.length / 8) + 1;
    console.log(num);
    console.log(data.length);
    var arr = [num - 1, num * 2 - 1, num * 3 - 1, num * 4 - 1, num * 5 - 1, num * 6 - 1, num * 7 - 1, num * 8 - 1];
    console.log(arr);
    var p_req = "";
    arr.forEach(function (index) {
      var temp = "<div class=\"sub-post-cnt\"><a href=\"/post/".concat(data[index].post_id, "\" target=\"blank_\" style=\"text-decoration: none; color: black;\"><div class=\"post-header\"><h3 class=\"post-place\">").concat(data[index].location_name, "</h3>&nbsp;&nbsp; <h6 class=\"post-author\">@").concat(data[index].author, "</h6></div><p class=\"post-text\">").concat(data[index].HIRT.slice(0, 400), " ...</p><div class=\"post-review-cnt\"><p><i class=\"fas fa-eye\"></i> : ").concat(data[index].views, "\t&nbsp;\t&nbsp; <i class=\"fas fa-thumbs-up\"></i> : ").concat(data[index].likes, "\t&nbsp;\t&nbsp; <i class=\"fas fa-comments\"></i> : ").concat(data[index].comments_count, "\t&nbsp;</p> </div></a></div><br>");
      p_req += temp;
    });
    document.getElementById('home-post-cnt').innerHTML = p_req;
  });
}