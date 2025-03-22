<template>
  <div id="app">
    <div class="container">
      <div class="home">
        <header>
          <h1>{{ this.user }}</h1>
        </header>

        <sensores
          :altura="altura"
          :diametro="diametro/2"
          :nivel="nivel"
          :limpio="limpio"
          :mm="mm"
          :ph="ph"
          :captar="captar"
          :llueve="llueve"
          :fecha="ultimo_cambio"
          :modificacion="cambio"
          @close="openModal"
        ></sensores>

        <div class="card">
          <h2>Datos configurables por el usuario</h2>
          <form class="f" enctype="multipart/form-data">
            <!--Altura tanque-->
            <div class="cardi">
              <div class="horizontal">
                <div>
                  <img src="@/components/assets/Capacidad.png" class="search" />
                  <button
                    class="button is-primary espacio-izq"
                    @click="openModal(6)"
                  >
                    <i class="fa fa-info-circle"></i>
                  </button>
                </div>
                <div class="col-xs-6 mr-auto mt-auto mb-auto">
                  Ingrese la altura de su tanque en <b>centímetros</b>.
                  <input
                    class="form-control"
                    placeholder="Capacidad del tanque (lts)"
                    v-model="altura"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <!--Diametro tanque-->
            <div class="cardi">
              <div class="horizontal">
                <div>
                  <img src="@/components/assets/Capacidad.png" class="search" />
                  <button
                    class="button is-primary espacio-izq"
                    @click="openModal(7)"
                  >
                    <i class="fa fa-info-circle"></i>
                  </button>
                </div>
                <div class="col-xs-6 mr-auto mt-auto mb-auto">
                  Ingrese el largo del tanque (diámetro) en <b>centímetros</b>.
                  <input
                    class="form-control"
                    placeholder="Capacidad del tanque (lts)"
                    v-model="diametro"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <!--Captar-->
            <div class="cardi">
              <div class="horizontal">
                <div>
                  <img src="@/components/assets/techo.jpg" class="search" />
                  <button
                    class="button is-primary espacio-izq"
                    @click="openModal(8)"
                  >
                    <i class="fa fa-info-circle"></i>
                  </button>
                </div>
                <div class="col-xs-6 mr-auto mt-auto mb-auto">
                  Ingrese la capacidad del techo que podrá captar agua en
                  <b>m<sup>2</sup></b
                  >.
                  <input
                    class="form-control"
                    placeholder="Capacidad del techo (m2)"
                    v-model="captar"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <!--Actualizar los parámetros-->
            <button
              class="btn button is-primary"
              type="submit"
              @click="actualizar"
              :disabled="tanque < 1 || captar < 0.1"
            >
              <strong>
                <i class="fa fa-upload espacio-der"></i>
                Cargar datos al servidor
              </strong>
            </button>
          </form>
        </div>

        <!--No se pudo actualizar la información o existe algún error-->
        <div class="error" v-if="error">
          <hr />
          <div class="notification is-danger">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <dialog-component
    :show="showModal"
    :opc="opcion"
    @close="closeModal"
  ></dialog-component>
</template>

<script>
//importar firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import db from "../../firebase/init.js";

//importar componentes externos
import DialogComponent from "@/components/layout/Modal.vue";
import Sensores from "./Sensores.vue";

export default {
  components: {
    DialogComponent,
    Sensores,
  },
  data() {
    return {
      //usuario firebase
      user: null,
      id: null,
      error: null,
      //parametros del scall
      captar: null,
      limpio: null,
      llueve: null,
      mm: null,
      nivel: null,
      ph: null,
      altura: null,
      diametro: null,
      ultimo_cambio: null,
      //registrar cambio
      cambio: 0,
      //modal
      showModal: false,
      opcion: null,
    };
  },
  name: "SCALL",
  mounted() {
    this.identificarUsuario();
  },
  methods: {
    //Modal
    openModal(opc) {
      this.showModal = true;
      this.opcion = opc;
    },
    closeModal() {
      this.showModal = false;
    },

    //Trabajar con Firebase
    identificarUsuario() {
      const user = firebase.auth().currentUser;
      if (user) {
        this.user = "SCALL de " + user.displayName;
        this.id = user.uid;
        this.searchUser();
      } else {
        this.openModal(10);
        this.error = "No se pudo identificar el usuario";
      }
    },
    searchUser() {
      const collectionRef = db.collection("Usuarios");
      const docRef = collectionRef.doc(this.id);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.captar = doc.data().captar;
            this.limpio = doc.data().limpio;
            this.llueve = doc.data().llueve;
            this.mm = doc.data().mm;
            this.nivel = doc.data().nivel;
            this.ph = doc.data().ph;
            this.altura = doc.data().altura;
            this.diametro = doc.data().radio*2;
            this.ultimo_cambio = doc.data().timestamp.toDate().toLocaleString();
            this.cambio++;
          } else {
            this.openModal(10);
            this.error = "El documento no existe";
          }
        })
        .catch((err) => {
          this.openModal(10);
          this.error = err.message;
        });
    },
    actualizar() {
      const collectionRef = db.collection("Usuarios");
      collectionRef
        .doc(this.id)
        .update({
          altura: this.altura.toString(),
          diametro: (this.diametro/2).toString(),
          captar: this.captar.toString(),
        })
        .then(() => {
          this.error = null;
          this.openModal(11);
          this.cambio++;
        })
        .catch((err) => {
          this.openModal(10);
          this.error = err.message;
        });
    },
  },
};
</script>

<style>
@import url(https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css);
@import url(https://use.fontawesome.com/releases/v5.0.13/css/all.css);
</style>
