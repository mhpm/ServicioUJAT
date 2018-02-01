Vue.component('app-navbar', {
    template:
        `<nav class="navbar is-light">
            <div class="navbar-brand">
                <a href="#" class="navbar-item">
                    <img src="img/ujat.png">
                </a>
                <div class="navbar-burger burger" data-target="navbarItems">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div id="navbarItems" class="navbar-menu">
                <div class="navbar-start">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <div class="navbar-dropdown is-boxed">
                            <hr class="divider">
                        </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="field is-grouped is-grouped-centered">
                            <p class="control">
                                <a class="button is-danger" v-on:click="LogOut">
                                    <span class="icon">
                                        <i class="fa fa-sign-out-alt"></i>
                                    </span>
                                    <span>Cerrar Sesion</span>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>`
    ,
    created: function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                //console.log(user.email);
            } else {
                //window.location.replace("index.html");
            }
        });

        $(document).ready(function() {
            // Get all "navbar-burger" elements
            var $navbarBurgers = Array.prototype.slice.call(
            document.querySelectorAll(".navbar-burger"),
            0
            );

            // Check if there are any navbar burgers
            if ($navbarBurgers.length > 0) {
            // Add a click event on each of them
            $navbarBurgers.forEach(function($el) {
                $el.addEventListener("click", function() {
                // Get the target from the "data-target" attribute
                var target = $el.dataset.target;
                var $target = document.getElementById(target);

                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                $el.classList.toggle("is-active");
                $target.classList.toggle("is-active");
                });
            });
            }
        });
    },
    methods: {
        LogOut: function() {
            firebase.auth().signOut().then(function() {
                    window.location.replace("index.html");
                },
                function(error) {}
            );
        }
    }
})