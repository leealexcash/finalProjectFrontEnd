"use strict";function Auth(e,t){e.loginUrl=t+"/login",e.signupUrl=t+"/register",e.tokenPrefix=""}function RegisterController(e,t){function l(){e.signup(n.user).then(function(){t.go("login")})}var n=this;n.user={},n.submit=l}function LoginController(e,t){function l(){e.login(n.credentials).then(function(){t.go("placesIndex")})}var n=this;n.credentials={},n.submit=l}function googleMap(e){return{restrict:"E",replace:!0,template:'<div class="google-map">Google Map Here</div>',scope:{places:"="},link:function(t,l){var n=new e.google.maps.Map(l[0],{center:{lat:51.5087903,lng:-.1137814},zoom:14});t.$watch("places.length",function(){console.log(t.places.length),t.places.length>0&&t.places.forEach(function(t){t.listings.length>0&&!function(){var l=new e.google.maps.Marker({position:{lat:t.lat,lng:t.lng},map:n,animation:e.google.maps.Animation.DROP}),o=new e.google.maps.InfoWindow({content:"<div>"+t.name+'</div>\n                <a href="http://localhost:8000/#/places/'+t.id+'">Click Here To View Listings For This Place '+t.id+"</a>"});l.addListener("click",function(){o.open(n,l)})}()})}),navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(e){var t={lat:e.coords.latitude,lng:e.coords.longitude};n.setCenter(t),n.setZoom(17)})}}}function googlePlace(e){return{restrict:"A",require:"ngModel",scope:{place:"="},link:function(t,l,n,o){var r={types:[],componentRestrictions:{country:"GB"}},i=new e.google.maps.places.Autocomplete(l[0],r);i.addListener("place_changed",function(){var e=i.getPlace(),n=e.geometry.location.toJSON();console.log(e),t.place.lat=n.lat,t.place.lng=n.lng,t.place.google_place_id=e.place_id,t.place.address=e.formatted_address,t.place.phone_number=e.formatted_phone_number,t.place.icon=e.icon,t.place.name=e.name,t.place.rating=e.rating,t.place.website=e.website,o.$setViewValue(l.val())})}}}function imageUpload(e){var t=new FileReader;return{restrict:"E",replace:!0,templateUrl:"/templates/imageUpload.html",scope:{base64:"="},link:function(l,n){function o(e){var l=(e.target.files||e.dataTransfer.files)[0];t.readAsDataURL(l)}l.isMobile="ontouchstart"in e||e.navigator.maxTouchPoints>0||e.navigator.msMaxTouchPoints>0,l.base64=null,l.active=!1,t.onload=function(){l.base64=t.result,l.$apply()},n.on("dragover",function(){l.active=!0,l.$apply()}).on("dragover",function(e){e.preventDefault()}).on("dragleave",function(){l.active=!1,l.$apply()}).on("drop",function(e){e.preventDefault(),o(e)}),angular.element(document).ready(function(){var e=angular.element(n[0].querySelector('input[type="file"]'));e&&e.on("change",function(e){o(e)})})}}}function Listing(e,t){return new e(t+"/listings/:id",{id:"@id"},{update:{method:"PUT"}})}function ListingsIndexController(e){var t=this;t.all=e.query()}function ListingsShowController(e,t){function l(){n.listing.$remove(function(){t.go("listingsIndex")})}var n=this;n.listing=e.get(t.params),n.delete=l}function ListingsEditController(e,t){function l(){n.listing.$update(function(e){t.go("placesShow",{id:e.place.id})})}var n=this;n.listing=e.get(t.params),n.update=l}function ListingsNewController(e,t){function l(){e.save(n.listing,function(e){t.go("placesShow",{id:e.place.id})})}var n=this;n.listing={place_id:t.params.placeId},n.submit=l}function MainController(e,t,l){function n(){e.logout().then(function(){t.go("placesIndex")})}function o(l,n,o){r.message=null,(!e.isAuthenticated()&&i.includes(n.name)||"usersEdit"===n.name&&parseFloat(o.id)!==e.getPayload().id)&&(l.preventDefault(),t.go("login"),r.message="You must be logged in to go there")}var r=this;r.isLoggedIn=e.isAuthenticated,r.message=null;var i=["usersEdit"];l.$on("$stateChangeStart",o),r.logout=n}function Place(e,t){return new e(t+"/places/:id",{id:"@id"},{update:{method:"PUT"}})}function PlacesIndexController(e){var t=this;t.all=e.query()}function PlacesShowController(e,t,l){function n(){r.place.$remove(function(){t.go("placesIndex")})}function o(e){console.log(e),l.listing.remove(function(){t.go("listingsIndex")})}var r=this;r.place=e.get(t.params),r.deleteListing=o,r.delete=n}function PlacesEditController(e,t){function l(){n.place.$update(function(){t.go("placesShow",t.params)})}var n=this;n.place=e.get(t.params),n.update=l}function PlacesNewController(e,t){function l(){e.save(n.place,function(e){console.log("gets here!"),t.go("listingsNew",{placeId:e.id})})}var n=this;n.place={},n.submit=l}function Router(e,t){e.state("usersIndex",{url:"/users",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("usersShow",{url:"/users/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}).state("usersEdit",{url:"/users/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("placesIndex",{url:"/places",templateUrl:"/templates/placesIndex.html",controller:"PlacesIndexController as placesIndex"}).state("placesNew",{url:"/places/new",templateUrl:"/templates/placesNew.html",controller:"PlacesNewController as placesNew"}).state("listingsNew",{url:"/places/:placeId/listings/new",templateUrl:"/templates/listingsNew.html",controller:"ListingsNewController as listingsNew"}).state("placesShow",{url:"/places/:id",templateUrl:"/templates/placesShow.html",controller:"PlacesShowController as placesShow"}).state("listingsIndex",{url:"/listings",templateUrl:"/templates/listingsIndex.html",controller:"ListingsIndexController as listingsIndex"}).state("listingsEdit",{url:"/listings/:id/edit",templateUrl:"/templates/listingsEdit.html",controller:"ListingsEditController as listingsEdit"}).state("listingsShow",{url:"/listings/:id",templateUrl:"/templates/listingsShow.html",controller:"ListingsShowController as listingsShow"}),t.otherwise("/places")}function User(e,t){return new e(t+"/users/:id",{id:"@id"},{update:{method:"PUT"}})}function UsersIndexController(e){var t=this;t.all=e.query()}function UsersShowController(e,t,l){function n(){r.user.$remove(function(){t.go("usersIndex")})}function o(){return r.user.id===r.currentUserId}var r=this;r.user=e.get(t.params),r.delete=n,r.currentUserId=l.getPayload().id,r.isLoggedIn=l.isAuthenticated,r.isCurrentUser=o()}function UsersEditController(e,t){function l(){o.user.$update(function(){t.go("usersShow",t.params)})}function n(){localStorage.removeItem("token"),t.go("login")}var o=this;o.user=e.get(t.params),this.update=l,o.logout=n}angular.module("finalProject",["ngResource","ui.router","satellizer"]).constant("API_URL","http://localhost:3000/api").config(Auth),Auth.$inject=["$authProvider","API_URL"],angular.module("finalProject").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("finalProject").directive("googleMap",googleMap),googleMap.$inject=["$window"],angular.module("finalProject").directive("googlePlace",googlePlace),googlePlace.$inject=["$window"],angular.module("finalProject").directive("imageUpload",imageUpload),imageUpload.$inject=["$window"],angular.module("finalProject").factory("Listing",Listing),Listing.$inject=["$resource","API_URL"],angular.module("finalProject").controller("ListingsIndexController",ListingsIndexController).controller("ListingsShowController",ListingsShowController).controller("ListingsNewController",ListingsNewController).controller("ListingsEditController",ListingsEditController),ListingsIndexController.$inject=["Listing"],ListingsShowController.$inject=["Listing","$state"],ListingsEditController.$inject=["Listing","$state"],ListingsNewController.$inject=["Listing","$state"],angular.module("finalProject").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("finalProject").factory("Place",Place),Place.$inject=["$resource","API_URL"],angular.module("finalProject").controller("PlacesIndexController",PlacesIndexController).controller("PlacesShowController",PlacesShowController).controller("PlacesNewController",PlacesNewController),PlacesIndexController.$inject=["Place"],PlacesShowController.$inject=["Place","$state","Listing"],PlacesEditController.$inject=["Place","$state"],PlacesNewController.$inject=["Place","$state"],angular.module("finalProject").config(Router),Router.$inject=["$stateProvider","$urlRouterProvider"],angular.module("finalProject").factory("User",User),User.$inject=["$resource","API_URL"],angular.module("finalProject").controller("UsersIndexController",UsersIndexController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController),UsersIndexController.$inject=["User"],UsersShowController.$inject=["User","$state","$auth"],UsersEditController.$inject=["User","$state"];
//# sourceMappingURL=app.js.map
