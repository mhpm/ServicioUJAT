Vue.component('app-modal', {
    template:
        `<div v-bind:class="['modal', modalActive]">
            <div class="modal-background"></div>
            <div class="modal-content">
                <section v-bind:class="['hero is-medium', modalColor]">
                    <div class="hero-body">
                        <div class="container" id="StatusBoard">
                            <div class="lds-dual-ring"></div>
                            <h1 class="title is-2">{{status}}</h1>
                            <h4 class="subtitle is-5">{{msg}}</h4>
                        </div>
                    </div>
                </section>
            </div>
        </div>`
    ,
    data:function(){
        return {
            modalActive: '',
            modalColor: 'is-primary',
            status: 'Cargando Datos',
            msg: 'Espere por favor',
            sent: false
        }
    },
    methods: {
        MailFail: function(msg) {
            this.status = 'Envío Fallido';
            this.msg = msg;
            this.modalColor = 'is-danger';
            console.log(msg);
        },
        MailSent() {
            this.status = 'Reporte Enviado!';
            this.msg = 'Gracias por cumplir a tiempo, Dios te bendiga!';
            this.modalColor = 'is-primary';
            this.sent = true;
        },
        Loading(time){
            var vm = this
            vm.modalActive = 'is-active';
            setTimeout(function(){
                vm.modalActive = '';
            }, time);
        }
    }
})