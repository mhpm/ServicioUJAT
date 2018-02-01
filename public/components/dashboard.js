const Dashboard = Vue.component('app-dashboard', {
    template:
        `<div class="hero-body">
            <div class="container">
                <div class="columns">
                    <div class="column is-5 is-offset-3">
                    <div class="notification is-primary">
                        <h1 class="title is-h1 has-text-centered">SERVICIO SOCIAL</h1>
                    </div>
                    <form>
                        <div class="columns">
                                <div class="column">
                                        <h1 class="subtitle is-4">Horas por Cumplir: {{HorasT}}</h1>
                                        <h2 class="subtitle is-4">Horas Pendientes: {{HorasP}} </h2>
                                        <h3 class="subtitle is-4">Horas Actuales: {{HorasA}}</h3>
                                        <progress class="progress is-success" :value="HorasA" max="150"></progress>
                                        <div v-if="msg != ''" class="notification is-success">
                                            {{msg}}
                                        </div>
                                </div>
                            </div>
                        <div class="columns">
                            <div class="column">
                                <div class="field">
                                    <label class="label">Agregar horas:</label>
                                    <div class="control has-icons-left">
                                        <input class="input is-medium" v-model="horas" type="number" min="1" step="1" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                            oninput="setCustomValidity('')" placeholder="0" required>
                                        <span class="icon is-small is-left">
                                            <i class="fas fa-clock"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="field is-grouped is-grouped-centered">
                                    <div class="control">
                                        <button v-on:click="SaveData" v-bind:class="['button is-primary is-medium', loadingBtn]" type="button" :disabled="horas=='' || horas<=0 || msg != ''">Agregar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                <app-modal ref="modal"></app-modal>
            </div>
        </div>`
    ,
    data(){
        return{
            loadingBtn:'',
            horas:'',
            HorasT:'',
            HorasP:'',
            HorasA:'',
            msg:''
        }
    },
    created(){
        var vm = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                vm.email = user.email;
            }
        });
        vm.db = firebase.firestore();
    },
    mounted(){
        var vm = this;
        vm.Modal = vm.$refs.modal;
        vm.Modal.Loading(4000)
        setTimeout(function(){
            vm.LoadData()        
        }, 2000);
    },
    methods: {
        Finalizo() {
            if(this.HorasA >= this.HorasT){
                this.msg = '¡Felicidades! Has concluido co tus horas de servicio'
            }
        },
        SaveData(){
            var vm = this
            //vm.Modal.Loading(2000)
            vm.loadingBtn = 'is-loading'
            vm.dataHoras.HorasActuales = +vm.dataHoras.HorasActuales + +vm.horas;
            vm.dataHoras.HorasPendientes = +vm.dataHoras.HorasTotal - +vm.dataHoras.HorasActuales;
            this.userRef.set(vm.dataHoras).then(function () {
                console.log('status saved');
                vm.Clean()
                vm.Finalizo()
            }).catch(function (erro) {
                console.log('Got Erro');
                console.log(erro);
            });
        },
        LoadData() {
            var vm = this
            vm.userRef = vm.db.collection("Users").doc(vm.email);
            vm.userRef.onSnapshot(function(doc) {
                if(doc.exists){
                    vm.dataHoras = doc.data();
                    setTimeout(function(){
                        vm.HorasA = vm.dataHoras.HorasActuales;
                        vm.HorasP = vm.dataHoras.HorasPendientes;
                        vm.HorasT = vm.dataHoras.HorasTotal;
                        vm.Finalizo()
                    }, 1000);
                }else{
                    console.log('Document not Exists');
                }
            });

        },
        Clean() {
            var vm = this;
            vm.horas = '';
            setTimeout(function(){
                vm.loadingBtn = ''        
            }, 500);
        }
    }
})