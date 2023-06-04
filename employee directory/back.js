var dump = []; //data form api to array
var unique_depr = []; //get uniqe values of department
var filter_add = ""; //data to save for data in checkbox filter
var validator; //for validation form
var update_data_id; // upadte id for specific location
var b = false;

var story = [];            //department check box arrayselected data 
var tempo = [];            //temporery array for main filter

var alphabet;            //selected alphabet
var card_per_page =10;   //for card per page

var no_pages;                     // no of pages means
var start_pg_btn,end_pg_btn;   // the creater of pagination buttons
var q;


var start_pg = 0,counter=0;
var stop_pg=0;

$(document).ready(function main() {

  read_data();  

});

//events
$("#create_id").click(function () {
  validate("create");
  toggle_input(b);
});

$("#btn_toggle_id").click(function () {
  $("#img_holder").hide();
  $("#update_id").hide();
  // $("#main_label").html("Emp_No");
  $("#create_id").show();
  $("#Modal_Title_id").html("Register User Here");
  $("#Modal_Title_id").css("color", "#198754");
  reset_form();
  var z = document.getElementById("photo_id");
  if (z == null) {
    add_file();
  }
});

$("#update_id").click(function () {
  validate("update");
  toggle_input(b);
});


//////////filters  events

//reset btn
$("#reset_id").click(function () {
  
  reset_form();
  read_data();
  story.length = 0;
  $("#sort_id").val("");
  $("#no_data").hide();
  $("#search_id").val("");
  $("#pg_card_id").val("10");
  $(".form-check-input").val("");
  $(".alpha_sort").css("background-color","");
  $(".alpha_sort").css("color","");
  $("#pg_card_id").val("10");
  card_per_page =10;
});

// search button
$("#btn_search_lazy_loding_idid").click(function () {
    if($("#search_id").val() == "")
    {
      // read_data();
      $("#no_data").show();
     main_filters();
    }
});

//sort input descend and ascending
$("#sort_id").on("input", function () 
{
  main_filters();
});

$("#pg_card_id").on('input',function()                    //was used for pagination
{
  card_per_page = $("#pg_card_id").val();  
  card_maker(0);
});

/// main filter to compare all toagter rather than by differnt function
function main_filters() 
{
  dump = [...duplicate]; //idk
  var a=0;
  $("#no_data").hide();

  // search bar
  if (!($("#search_id").val() == "")) {
    tempo.length = 0;

    a=a+1;
    for (var i = 0; i < dump.length; i++) {
      if (dump[i].employeeName.toLowerCase().includes($("#search_id").val().toLowerCase()) ||dump[i].id.toLowerCase().includes($("#search_id").val().toLowerCase()) ||dump[i].email.toLowerCase().includes($("#search_id").val().toLowerCase()) ||dump[i].phoneNumber.toLowerCase().includes($("#search_id").val().toLowerCase()) ||dump[i].department.toLowerCase().includes($("#search_id").val().toLowerCase())) 
      {
        
        tempo.push(dump[i]);
      }
    }
    dump.length = 0;

    for (var j = 0; j < tempo.length; j++) {
      dump.push(tempo[j]);
    }

    if(dump.length == 0)
    {
      $("#no_data").show();
      // dump.length=0
    }

    card_maker(0);
  }
  
// search A to Z
  if (!(alphabet == "" || alphabet == undefined )) {
    tempo.length = 0;
    a=a+1;

    for (var i = 0; i < dump.length; i++) {
      if (alphabet == dump[i].employeeName[0].toLowerCase()) {
        tempo.push(dump[i]);
      }
    }
    dump.length = 0;
    for (var j = 0; j < tempo.length; j++) {
      dump.push(tempo[j]);
    }

    if(alphabet =="all")
    {
      dump=[...duplicate];
      $(".alpha_sort").css("background-color","");
      $(".alpha_sort").css("color","");
    }

    if (dump.length == 0)
    {
      $("#no_data").show();
    }
    card_maker(0);
  }

// department checkbox
  if (!(story.length == 0)) {
    tempo.length = 0;
    a=a+1;
    if(story.length ==unique_depr.length )
    {
      for(var i=0 ;i< unique_depr.length;i++)
      {
        $("#flexCheckDefault"+i).prop("checked", true);
      }  
      // dump = [...duplicate];
    }

    for (var i = 0; i < dump.length; i++) 
    {
      for (var j = 0; j < story.length; j++) 
      {
        if (story[j].toLowerCase() == dump[i].department.toLowerCase()) 
        {
          tempo.push(dump[i]);
        }
      }
    }

    dump.length = 0;

    for (var j = 0; j < tempo.length; j++) {
      dump.push(tempo[j]);
    }

    if(dump.length ==0)
    {
      $("#no_data").show();
    }

    card_maker(0);
  }

// ascending and desending
  if ($("#sort_id").val() == "asc") 
  {
    a=a+1;
    dump.sort(compare);
    
    if(dump.length ==0)
    {
      $("#no_data").show();
    }
    
    card_maker(0);
  } 
  if($("#sort_id").val() == "dsc") 
  {
    a=a+1;
    dump.sort(compare);
    dump.reverse();

    if(dump.length ==0)
    {
      $("#no_data").show();
    }

    card_maker(0);
  }

  if(a ==0)
  {
    $("#reset_id").click();
    read_data();
  }
}


//////////filters data to send to main filter && lone filters tooo

//for checked and not check data array && then if all checbox are not checked then read_data again 
function check_box(checkboxElem) 
{
  var gym=0;

  if (checkboxElem.checked) 
  {
    story.push(checkboxElem.value);
  } 
  else 
  {
    const index = story.indexOf(checkboxElem.value);
    story.splice(index, 1);
  }

  for(var i=0;i<unique_depr.length;i++)
  {
    if(!(document.getElementById("flexCheckDefault"+i).checked))
    {
      gym=gym+1;
    }
  }
  if(gym == unique_depr.length)
  {
    document.getElementById("flexCheckDefault").checked =false;
    // read_data();
  }

  main_filters();
}

// just to send all cehcked value to main function and click all to uncheck all boxes
function all_depart(oie)
{
  if(oie.checked == true)
  {
    story=[...unique_depr];
    main_filters();
  }
  else
  {
    for(var i=0 ;i< unique_depr.length;i++)
    {
      $("#flexCheckDefault"+i).prop("checked", false);
      story.length=0;

      read_data();
    }
  };
}

// just for setting alphabet values
function search_alpha(a) {
  $(".alpha_sort").css("background-color","");
  $(".alpha_sort").css("color","");
  
  $("#sort_id_"+a).css("color","white");
  $("#sort_id_"+a).css("background-color","#0f1e33");
  alphabet = a;
  main_filters();
}

//ascemding && decending
function compare(a, b) {
  if (a.employeeName.toLowerCase() < b.employeeName.toLowerCase()) {
    return -1;
  }
  if (a.employeeName.toLowerCase() > b.employeeName.toLowerCase()) {
    return 1;
  }
  return 0;
}

//validate on input on form
function toggle_input(b) {
  $("#form_id").on(
    "input",
    function () ///turning on input type(these does not submitt form)
    {
      validate("input");
    }
  );
  if (b == "yes") {
    ///condition for turning off input type
    $("#form_id").off();
    b = false;
  }
}


// get data(read)
function read_data() {
  $.ajax({
    type: "GET",
    url: "https://647cb714c0bae2880ad11999.mockapi.io/employee",

    success: function (data) {
      dump=data.reverse();
      duplicate = dump;
      card_maker(0);
      department_checkbox();
    },
    error: function () {
      console.error("there was a error reading the data");
    },
  });
}



//making show card
function card_maker(start_pg) 
{
  start_pg=parseInt(start_pg);
  stop_pg =parseInt(stop_pg);
  card_per_page=parseInt(card_per_page);


  counter =start_pg;
  
  stop_pg = (start_pg) + (card_per_page);
  Paggie();


  $("a").css("background-color","");                    // on click pagination clear all css bacckground
  $("a").css("color","");
 
  
  $("#cards_store_div_id .card_body").remove();
  
  
  var add = ""; //data to save for data in cards


  if(start_pg == 0)                                           //start page shoul not have backward arow
  {
    $(".back").hide();
  }
  else
  {
    $(".back").show();
  }

  if(((no_pages*card_per_page)) <= stop_pg )                       
  {
    stop_pg= dump.length;
    $(".front").hide();                           //start page should not have forward arow
  }
  else
  {
    $(".front").show();
  }

  $("#page_"+start_pg).css("background-color","#051428");     // on click pagination add css bacckground
  $("#page_"+start_pg).css("color","white");

  for (var i = start_pg; i < stop_pg; i++) {
    add =add +
      `<div class="col-3 card_body" data-original>
         <div class="card-group">
            <div class="card">
                 
               <div class="card-header">
                <div class="row" style="max-height:41px">
                   <p class="col-7 header_name_id" >` +dump[i].id +`</p>

                  <div class="col-5 text-end">
                   <button class="border-0 " onclick="delete_data(` +dump[i].id +`)"><i class="fa-solid fa-trash text-danger bg-white"></i></button>
                   <button class="border-0" data-bs-toggle="modal" data-bs-target="#exampleModalLong" onclick="set_data(` +dump[i].id +`)"><i class="fas fa-edit text-warning bg-light"></i></button>
                  </div>   
                </div> 
            </div>
            <div class="img_div">
            <img class="card-img-top" src="` +dump[i].avatar +`" alt="Card image cap" >
            </div>  
            <div class="card-body text-center d-flex flex-column justify-content-between" >
                    <p class="card-text">` +dump[i].employeeName +`</p>
                    <p class="card-text">` +dump[i].department +`</p>
                    <p class="card-text">` +dump[i].location +`(address)</p>
                    <p class="card-text">` +dump[i].email +`</p>
                    <p class="card-text">` +dump[i].phoneNumber +`</p>
                    <p class="card-text">` +dump[i].companyName +`</p>
                </div>
            </div>
         </div>
        </div >`;
  }

  $("#cards_store_div_id").append(add);
}



//making dyanmic checkbox department
function department_checkbox() {
  $("#filter_items_id").remove();

  for (var i = 0; i < dump.length; i++) {
    unique_depr[i] = dump[i].department;
  }

  unique_depr = unique_depr.filter((item, index) => unique_depr.indexOf(item) === index); //filter to get unique values

  filter_add = `<div id="filter_items_id"> <input class="form-check-input" type="checkbox" value="all" id="flexCheckDefault" onclick="all_depart(flexCheckDefault)">
   <label class="form-check-label" for="flexCheckDefault">ALL</label><br>`;

  for (var j = 0; j < unique_depr.length; j++) {
    filter_add =filter_add +
      `<div> <input class="form-check-input" type="checkbox" name="hoii"   value="` +unique_depr[j] +`" id="flexCheckDefault` +j +`" onchange="check_box(this)">
       <label class="form-check-label"  for="flexCheckDefault` +j +`">` +unique_depr[j] +`</label><br> </div>`;
  }
  filter_add = filter_add + `</div>`;

  $("#department_filter_id").append(filter_add);
}


// APllying crud on API

//create user(POST)
function create_data() {

  var aei = document.getElementById("form_id");
  var myFormData = new FormData(aei);
  var formDataObj = {};
  myFormData.forEach(function (value, key) {
    if (!(key == "avatar")) {
      formDataObj[key] = value;
    } else {
      formDataObj[key] = "images\\" + value.name;
    }
  });

  $.ajax({
    url: "https://647cb714c0bae2880ad11999.mockapi.io/employee",
    method: "POST",
    data: formDataObj,
    success: function () {
      alert("Data submitted successfully");
      read_data();
      reset_form();
    },
  });
}

//delets values json file
function delete_data(d_id) {
  var a = confirm(
    "Do u want to permenatly delete Employe_id = " +
      d_id +
      " data from database"
  );
  if (a == true) {
    ///true
    $.ajax({
      url: "https://647cb714c0bae2880ad11999.mockapi.io/employee/" + d_id,
      method: "DELETE",
      success: function () {
        alert("Successfully deleted data form database");
        // $("#department_filter_id div").remove();
        read_data();
      },
      error: function () {
        console.log("error deleting data");
      },
    });
  }
}

// update json valus
function update_data() {
  var aei = document.getElementById("form_id");
  var myFormData = new FormData(aei);
  var uformDataObj = {};

  myFormData.forEach(function (value, key) {
    if (!(key == "avatar")) {
      uformDataObj[key] = value;
    } ///u can not also send and get the avatar.name in table. beaccuse that way server images will not get load
    else {
      uformDataObj[key] = "images\\" + value.name; ///becuse u can not get the values of path directly
    }
  });

  $.ajax({
    url:"https://647cb714c0bae2880ad11999.mockapi.io/employee/" + update_data_id,
    method: "PUT",
    data: uformDataObj,
    success: function (data) {
      alert("Successfully updated data form database");
      read_data();
      reset_form();
    },
  });
}

///set values to table
function set_data(s_id) {
  // $("#form_id :input[name = id]").prop("disabled",true);

  $("#Modal_Title_id").html("Update Employee Data Here");
  $("#Modal_Title_id").css("color", "#ffc107");

  $.ajax({
    url: "https://647cb714c0bae2880ad11999.mockapi.io/employee/" + s_id,
    method: "GET",
    success: function (data) {
      update_data_id = s_id;
      // $("#main_label").html("Emp_Id");          //change no to id bec =id not assign at time of creating
      $("#create_id").hide();
      $("#update_id").show();

      $("#img_holder").show();
      $("#img_holder").html(
        `<img  src="` +
          data.avatar +
          `" alt="Girl" id="new_img" width="90" height="90" ></img>`
      );

      // set values
      $("#name_id").val(data.employeeName);
      $("#department_id").val(data.department);
      $("#country_id").val(data.location);
      $("#email_id").val(data.email);
      $("#company_id").val(data.companyName);
      $("#phone_id").val(data.phoneNumber);

      awz = data.avatar;
    },
  });
}

// validation process

// validation form
function validate(valo) {
  var validator = true;
  $("#form_id")
    .find(
      "input[type=text],input[type=file],input[type=number],input[type=email],select"
    )
    .each(function (index, element) {
      if (!(element.id == "photo_id")) {
        //have to remove file becuse can not set it values in js
        this.value = $.trim(this.value); //trim values
      }

      //Blank Values
      if (valo == "update" && element.id == "photo_id" && this.value == "") {
        if (awz == "images\\") {
          $(element).next().show();
          validator = false;
        } else {
          $("#photo_group").remove();
        }
      }

      if (this.value == "") {
        $(element).next().show();
        validator = false;
      } else {
        $(element).next().hide();
      }

      // employee name, company name
      if (element.id == "employee_id" || element.id == "company_id") {
        if (containsNum(this.value)) {
          $(element).next().show();
          validator = false;
        }
      }

      // email
      if (element.id == "email_id") {
        if (!validEmail(this.value)) {
          $(element).next().show();
          validator = false;
        }
      }

      //phone no
      if (element.id == "phone_id") {
        if (
          containsAlphabet(this.value) ||
          this.value.length > 10 ||
          this.value.length < 10 ||
          !(
            this.value.charAt(0) == 6 ||
            this.value.charAt(0) == 7 ||
            this.value.charAt(0) == 8 ||
            this.value.charAt(0) == 9
          )
        ) {
          $(element).next().show();
          validator = false;
        }
      }
    });

  if (validator == true && valo == "create") {
    create_data();
    b = true;
  }
  if (validator == true && valo == "update") {
    update_data();
    b = true;
  }
}

// validates phone no
function containsAlphabet(str) {
  return /[a-z A-Z]/.test(str);
}

/////validate emp-name & comp-name
function containsNum(num) {
  return /[0-9]/.test(num);
}

///validate email
function validEmail(strM) {
  return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
    strM
  );
}



// reaet all 
function reset_form() {
  var z = document.getElementById("photo_group");
  if (z == null) {
    add_file();
  }

  $("span").hide();
  $("#form_id")[0].reset();
  var close = document.getElementById("close_id");
  close.click();
  toggle_input("yes");

  var close = document.getElementById("cards_store_div_id");
}

// add image because we remove it on update peocess

//add image
function add_file() {
  var add = `<div id="photo_group" class="row form-group">
  <div class="col">
      <label for="photo_id">Profile Pic</label>
  </div>
  <div class="col">
      <input type="file" name ="avatar" id="photo_id" class="form-control rounded-pill" name="img" accept="image/*" >
      <span><b>***Error Photo RE-ENTER***</b></span>
  </div>
  </div>`;
  $("#form_id").append(add);
}


//pagination
function Paggie()
{
  $("li").remove();
  no_pages = Math.ceil(dump.length/card_per_page);

  if((counter >= 30 && card_per_page == 10)  || (counter >= 24 && card_per_page == 8) || (counter >=9 && card_per_page == 3 ) ||(counter >=36 && card_per_page == 12))
  {
      start_pg_btn=(counter/card_per_page)-2;
      end_pg_btn = (counter/card_per_page)+3;
  }
  else
  {

    start_pg_btn=0;
    end_pg_btn=5;
  }



  var emp=`<li title="START" class=""  onclick="card_maker(0)"><a  class="back page-link"><i class="fa fa-caret-left"></i><i class="fa fa-caret-left"></i>  </a></li>
    <li class="page-item" onclick="page_sub(counter)"  title="Previsus"><a  class="back page-link"><i class="fa-solid fa-arrow-right fa-rotate-180"></i></a></li>`;
    for(var k=start_pg_btn;k<end_pg_btn;k++)
    {
      if(k>=no_pages)
      {
        break;
      }
      emp = emp+`<li class="page-item" onclick="card_maker(`+(k*card_per_page)+`)"><a id="page_`+ (k*card_per_page)+`"class="page-link" style="font-weight: 500;color:black;">`+(k+1)+`</a></li>`;
    }
    emp = emp+ `<li class="page-item" onclick="page_plus(counter)"><a  class="front page-link" title="Next"><i class="fa-solid fa-arrow-right"></i></a></li>
    <li title="END" class="" onclick="card_maker((no_pages-1)*card_per_page)"><a  class="front page-link"><i class="fa fa-caret-right"></i><i class="fa fa-caret-right"></i></a></li>`;
    $("#pager").append(emp);
    $("a").css("color","black");
}
// //pagination backword
function page_sub(counter)
{
   card_maker(counter-card_per_page);
}

//pagination forword
function page_plus(counter)
{
  card_maker(counter+card_per_page);
}