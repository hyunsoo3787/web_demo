// ----- custom js ----- //

// hide initial
$("#searching").hide();
$("#results-table1").hide();
$("#results-table2").hide();
$("#error").hide();
$("#results-btn").hide();
// global
var url = '';
var data = [];

$(function() {

  // sanity check
  console.log( "ready!" );


  // image click
  $(".img").click(function() {

    // empty/hide results

    $("#results-table1").hide();
    $("#results-table2").hide();
    $("#loading-prograss").hide();
    $("#error").hide();
    $("#results-btn").hide();
    // remove active class
    $(".img").removeClass("active")

    // add active class to clicked picture
    $(this).addClass("active")

    // grab image url
    var image = $(this).attr("src")
    console.log(image)

    // show searching text
    $("#searching").show();
    $(document).ajaxStart(function() {
			$('#loading-prograss').show();
    });

    $(document).ajaxStop(function() {
        $('#loading-prograss').hide();
    });
    // ajax request
    $.ajax({
      type: "POST",
      url: "/search",
      data : { img : image },

      // handle success
      success: function(result) {
        console.log(result.results);
        $("#results1").empty();
        $("#results2").empty();

        var data = result.results
        // show table
        $("#results-table1").show();
        $("#results-table2").show();
        $("#results-btn").show();
        // loop through results, append to dom
        for (i = 0; i < data.length; i++) {
          $("#results1").append('<tr><th><img src="'+data[i]["semantic"]+'" class="result-img1"></th></tr>')
        }
        for (i = 0; i < data.length; i++) {
          $("#results2").append('<tr><th><img src="'+data[i]["image"]+'" class="result-img2"></th></tr>')
        }
      },
      // handle error
      error: function(error) {
        console.log(error);
        // append to dom
        $("#error").append()
      }
    });

  });

});

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("results2");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.getElementsByClassName("result-img2")[0].src;
  captionText.innerHTML = this.alt;
}

var img1 = document.getElementById("results1");
img1.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.getElementsByClassName("result-img1")[0].src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

