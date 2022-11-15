

var ingredientSearchItem = document.querySelector("#ingredient");
var recipeSearchItem = document.querySelector("#recipe");
var button1 = document.querySelector("#button1");
var button2 = document.querySelector("#button2");

var ingredientsOfRecepieSearchItem = '';
var openNav;
var closeNav;
var list1 = document.getElementById('recipeList1');
var list2 = document.getElementById("recipeList2");

function addToShoppingCart(){

  console.log('reeeeeeeeeeeeeeeeeeeeeeeeee') //literally dying
}

function clearList1(){
  if(list1.hasChildNodes()){
    list1.removeChild(list1.firstChild)
  }
  return;
}

function clearList2(){
  if(list2.hasChildNodes()){
    list2.removeChild(list2.firstChild)
  }
  return;
}

// function clearList1(){
//   if(.hasChildNodes()){
//     list1.removeChild(list1.firstChild)
//   }
//   return;
// }
//grabs recepies based on single item input
function getRecipesByIngredient(){
  
  var requestUrl = 'https://russelldev-cors-anywhere.herokuapp.com/https://api.edamam.com/search?q='+ingredientSearchItem.value+'&app_id=b958af72&app_key=46b1301f63cc0535dde1e7187e2ff26b';
  
  console.log(requestUrl)

  fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //targeting the list by id. in this case the placeholder is, recepieList1
    var recipeLog = document.getElementById('recipeInformation');       
    console.log(data.q);
    clearList1();
    clearList2();
    var list1Div = document.createElement('div')
    list1Div.setAttribute('id', 'list1Div')
    list1.appendChild(list1Div)
    console.log(list1.hasChildNodes())
      //makes list of recipes that use the item in the search function and console logs for good measure
      for(i=0; i < data.hits.length; i++) {
      console.log(data.hits[i].recipe.label);
      currentLabel = data.hits[i].recipe.label;
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = "#"+currentLabel;
      a.textContent = currentLabel;
      recipeName = document.createElement('h2');
      recipeName.setAttribute('id', currentLabel)
      recipeName.textContent = currentLabel;
      li.appendChild(a);
      list1Div.appendChild(li);

      var recipeIngredientList = document.createElement('ul');
      // adding ingredients to the second list
          for(y=0; y <data.hits[i].recipe.ingredients.length; y++){
            var li2 = document.createElement('li');
            console.log(data.hits[i].recipe.ingredients[y].text)
            li2.textContent = data.hits[i].recipe.ingredients[y].text;
            recipeIngredientList.appendChild(li2)
            recipeIngredientList.querySelectorAll('li').forEach(item =>{
            item.addEventListener('click', addToShoppingCart);
      });
      } 
      recipeName.appendChild(recipeIngredientList)
      recipeLog.appendChild(recipeName)
      
      }
    });
  };
  
  function getRecipesByName(){
    
    var requestUrl = 'https://russelldev-cors-anywhere.herokuapp.com/https://api.edamam.com/search?q='+recipeSearchItem.value+'&app_id=b958af72&app_key=46b1301f63cc0535dde1e7187e2ff26b';
    
fetch(requestUrl)
.then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //targeting the list by id. in this case the placeholder is, recepieList2     
        var recipeLog = document.getElementById('recipeInformation');       
        console.log(data);
        clearList1();
        clearList2();
        //makes list of recipes that use the item in the search function then use that to make another list to add ingredients to
        for(i=0; i < data.hits.length; i++) {
          currentLabel = data.hits[i].recipe.label;
          var li = document.createElement('li');
          var a = document.createElement('a');
          a.href = "#"+currentLabel;
          a.textContent = currentLabel;
          recipeName = document.createElement('h2');
          recipeName.setAttribute('id',currentLabel)
          recipeName.textContent = currentLabel;
          li.appendChild(a);
          list2.appendChild(li);
          var recipeIngredientList = document.createElement('ul'); 
         // adding ingredients to the second list
          for(y=0; y <data.hits[i].recipe.ingredients.length; y++){
            var li2 = document.createElement('li');
            console.log(data.hits[i].recipe.ingredients[y].text)
            li2.textContent = data.hits[i].recipe.ingredients[y].text;
            recipeIngredientList.appendChild(li2)
            recipeIngredientList.querySelectorAll('li').forEach(item =>{
            item.addEventListener('click', addToShoppingCart);
            });
          }
          recipeName.appendChild(recipeIngredientList)
          recipeLog.appendChild(recipeName)
      };     
    });
}

function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}
       
button1.addEventListener("click", getRecipesByName);
button2.addEventListener("click", getRecipesByIngredient);

const classNames = {
  DELETE: "delete" };
 
const logger = {
  logging: false,
  log(msg) {
    if (this.logging) console.log(msg);
  } };
 
const itemProto = {
  bought: false,
  toggle() {
    this.bought = !this.bought;
    this.trigger("toggled", this);
  } };
 
const items = {
  list: [],
 
  add(item) {
    let newItem = Object.create(itemProto);
    Object.assign(newItem, item, Backbone.Events);
    newItem.on("toggled", function (item) {
      logger.log("toggled");
      view.addToList(item);
    });
    newItem.id = _.uniqueId();
    this.list.push(newItem);
    this.trigger("itemAdded", newItem);
    this.trigger("updated");
  },
 
  delete(id) {
    logger.log("delete: " + id);
    let item = _.find(items.list, {
      "id": id });
 
    view.remove(item.$el);
 
    this.list = _.pull(this.list, item);
    this.trigger("updated");
  },
 
  toggle(id) {
    _.find(items.list, {
      "id": id }).
    toggle();
 
    this.trigger("updated");
  } };
 
const app = {
  init() {
    view.init();
    Object.assign(items, Backbone.Events);
    items.on("itemAdded", function (item) {
      logger.log("item added");
      view.addToList(item);
    });
 
    items.on("updated", function () {
      logger.log("updated");
      view.updateQuantities();
    });
  } };
 
const view = {
  init() {
 
    this.$shoppingList = $("#shopping-list");
    this.$boughtList = $("#bought-list");
    this.$form = $("form");
 
    const handleSubmit = function (e) {
      e.preventDefault();
 
      let name = $("#item-input"),
      quantity = $("#quantity-input");
 
      if (name.val()) {
        items.add({
          name: name.val(),
          quantity: quantity.val() || 1 });
 
      }
      name.val("");
      quantity.val("");
 
    };
 
    const handleClick = function (e) {
      e.preventDefault();
      logger.log("Clicked");
 
      if (e.target.nodeName === "LI") {
        let id = $(e.target).data("id").toString();
        items.toggle(id);
      } else if (e.target.className === classNames.DELETE) {
        let id = $(e.target).parent().data("id").toString();
        items.delete(id);
      }
    };
 
    const handleDelete = function (e) {
      e.preventDefault();
      logger.log("Delete: " + item);
      let id = $(e.target).data("id").toString(),
      item = _.find(items.list, {
        "id": id });
 
    };
 
    $("#lists").on("click", handleClick);
    this.$form.on("submit", handleSubmit);
    $("." + classNames.DELETE).on("click", handleDelete);
 
  },
 
  addToList(item, list) {
    let $item = item.$el || this.createListItem(item);
 
    if (item.bought) {
      $item.prependTo(this.$boughtList);
    } else {
      $item.appendTo(this.$shoppingList);
    }
  },
 
  updateQuantities() {
    logger.log("updateQuantities");
    $("#shopping-num").html(this.$shoppingList.children().length);
    $("#bought-num").html(this.$boughtList.children().length);
  },
 
  remove($el) {
    $el.remove();
  },
 
  createListItem(item) {
    item.$el = $(`<li data-id=${item.id}>${item.name} <span class="quantity">${item.quantity}</span><span class="delete">X</span></li>`);
 
    return item.$el;
  },
 
  getListItem(id) {
    let $el = $("li[data-id='" + id + "']");
    return $el.length ? $el : null;
  },
 
  render(items) {
    logger.log("render");
 
    this.$shoppingList.empty();
    this.$boughtList.empty();
 
    items.forEach(item => {
      let $item = $(`<li data-id=${item.id}>${item.name}<span>${item.quantity}</span></li>`);
 
      if (item.bought) {
        this.$boughtList.append($item);
        $item.addClass("bought");
      } else {
        this.$shoppingList.append($item);
      }
    });
 
  } };
 
app.init();
 
items.add({
  name: "Wine",
  quantity: 1 });
 
items.add({
  name: "Cheese",
  quantity: 1 });
 
items.add({
  name: "Dark chocolate",
  quantity: 1 });
