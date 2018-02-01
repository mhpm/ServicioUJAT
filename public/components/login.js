const Login = Vue.component('app-login', {
    template:
        ` <section class="section is-vertical-center">
            <div class="container">
                <div class="columns">
                    <div class="column is-5">
                        <form v-on:submit.prevent="Login(email, password)">
                            <div class="field is-grouped is-grouped-centered">
                            <figure class="image">
                                    <img src="img/ujat2.png">
                                </figure>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left has-icons-right">
                                    <input v-model="email" class="input is-medium" type="email" placeholder="Email"
                                        oninvalid="this.setCustomValidity('Campo Requerido')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-envelope"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fa fa-check"></i>
                                    </span>
                                    <p class="help is-danger"></p>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input v-model="password" class="input is-medium" type="password" placeholder="Password"
                                    oninvalid="this.setCustomValidity('Campo Requerido')"
                                    oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                    <i class="fa fa-lock"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control">
                                    <div class="notification is-warning has-text-centered has-text-grey-dark" v-if="errorMessage != ''">
                                        <h5 class="subtitle is-5">{{errorMessage}}</h5>
                                    </div>
                                </p>
                            </div>
                            <div class="field is-grouped is-grouped-centered">
                                <p class="control">
                                    <input type="submit" class="button is-primary is-medium" value="Entrar"/>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>`
    ,
    data:function(){
        return {
            email: "",
            password: "",
            errorCode: "",
            errorMessage: "",
            msg: ""
        }
    },
    created: function() {
        var vm = this;
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    app.$router.push({name: 'dashboard'});               
                }
            });
    },
    methods: {
        Login: function(email, password) {
        var vm = this;
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
            app.$router.push({name: 'dashboard'});
            })
            .catch(function(error) {
                if (error.code == "auth/weak-password") {
                    vm.errorMessage = error.code;
                } else {
                    vm.errorMessage = "Usuario o Contraseña Incorrecta";
                }
            });
        }
    }
})