<template>
  <div id="app">
    <div class="container">
      <h2>{{ this.user }}</h2>

      <form class="f" enctype="multipart/form-data">
        <!--Tanque-->
        <div class="container">
          <div class="row">
            <div class="col-xs-2 ml-auto mt-auto mb-auto">
              <img src="../components/assets/Capacidad.png" class="search" />
            </div>
            <div class="col-xs-6 mr-auto mt-auto mb-auto">
              Capacidad del tanque (litros)
              <input
                class="form-control"
                placeholder="Capacidad del tanque (litros)"
                v-model="tanque"
                type="text"
              /><br />
            </div>
          </div>
        </div>

        <!--Captar-->
        <div class="container">
          <div class="row">
            <div class="col-xs-2 ml-auto mt-auto mb-auto">
              <img src="../components/assets/logo.png" class="search" />
            </div>
            <div class="col-xs-6 mr-auto mt-auto mb-auto">
              Capacidad para captar (m<sup>2</sup>)
              <input
                class="form-control"
                placeholder="Capacidad para captar (m^2)"
                v-model="captar"
                type="text"
              /><br />
            </div>
          </div>
        </div>

        <!--Pluviometro-->
        <div class="container">
          <div class="row">
            <div class="col-xs-2 ml-auto mt-auto mb-auto">
              <img src="../components/assets/logo.png" class="search" />
            </div>
            <div class="col-xs-6 mr-auto mt-auto mb-auto">
              Capacidad del pl... (mm)
              <input
                class="form-control"
                placeholder="Capacidad del pluviometro (mm)"
                v-model="pluviometro"
                type="text"
              /><br />
            </div>
          </div>
        </div>

        <!--Actualizar los parámetros-->
        <button
          class="btn btn-primary"
          type="submit"
          @click="actualizar"
          :disabled="!captarIsValid || !tanqueIsValid || !pluvIsValid"
        >
          <i class="fa fa-edit"></i>
          Modificar parámetros
        </button>

        <!--Nivel-->
        <div class="container">
          <div class="row">
            <div class="col-xs-2 ml-auto mt-auto mb-auto">
              <img
                src="../components/assets/VACIO.png"
                class="search"
                v-if="nivelIMG == 0"
              />
              <img
                src="../components/assets/CASI_VACIO.png"
                class="search"
                v-if="nivelIMG == 1"
              />
              <img
                src="../components/assets/MITAD.png"
                class="search"
                v-if="nivelIMG == 2"
              />
              <img
                src="../components/assets/CASI_LLENO.png"
                class="search"
                v-if="nivelIMG == 3"
              />
              <img
                src="../components/assets/LLENO.png"
                class="search"
                v-if="nivelIMG == 4"
              />
              <img
                src="../components/assets/VACIO_SUCIO.png"
                class="search"
                v-if="nivelIMG == 5"
              />
            </div>
            <div class="col-xs-6 mr-auto mt-auto mb-auto">
              Nivel actual del tanque
              <input
                class="form-control"
                v-model="nivel"
                type="text"
                readonly
              /><br />
            </div>
          </div>
        </div>

        <!--Limpieza-->
        <div class="container">
          <div class="row">
            <div class="col-xs-2 ml-auto mt-auto mb-auto">
              <img
                src="../components/assets/LLENO.png"
                class="search"
                v-if="limpio == 1"
              />
              <img
                src="../components/assets/VACIO_SUCIO.png"
                class="search"
                v-else
              />
            </div>
            <div class="col-xs-6 mr-auto mt-auto mb-auto">
              Calidad del agua
              <input
                class="form-control"
                v-model="limpioTXT"
                type="text"
                readonly
              /><br />
            </div>
          </div>
        </div>

        <!--Milimetros-->
        <div class="container">
          <div class="row">
            <div class="col-xs-2 ml-auto mt-auto mb-auto">
              <img src="../components/assets/logo.png" class="search" />
            </div>
            <div class="col-xs-6 mr-auto mt-auto mb-auto">
              Milímetros de precipitación
              <input
                class="form-control"
                v-model="mm"
                type="text"
                readonly
              /><br />
            </div>
          </div>
        </div>
      </form>

      <!--No se pudo actualizar la información o existe algún error-->
      <div class="error" v-if="error">
        <hr />
        <div class="notification is-danger">
          {{ error }}
        </div>
      </div>
      <!--Sí pudo-->
      <div class="alert" v-if="good">
        <hr />
        <div class="alert alert-primary alert-dismissible fade show">
          ¡Información registrada con éxito!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import db from "../firebase/init.js";

export default {
  data() {
    return {
      user: null,
      id: null,
      error: null,
      good: null,
      captar: null,
      limpio: null,
      limpioTXT: null,
      mm: null,
      nivel: null,
      nivelIMG: null,
      pluviometro: null,
      tanque: null,
    };
  },
  name: "SCALL",
  mounted() {
    this.identificarUsuario();
  },
  methods: {
    identificarUsuario() {
      const user = firebase.auth().currentUser;
      if (user) {
        this.user = "SCALL de " + user.displayName;
        this.id = user.uid;
        this.searchUser();
      } else {
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
            this.mm = doc.data().mm;
            this.nivel = doc.data().nivel;
            this.pluviometro = doc.data().pluviometro;
            this.tanque = doc.data().tanque;
            this.textoCalidad();
            this.nivelAgua(false);
            this.mmDesconocido(false);
          } else {
            this.error = "El documento no existe";
          }
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
    textoCalidad() {
      if (this.limpio == 1) {
        this.limpioTXT = "Limpio";
      } else if (this.limpio == 2) {
        this.limpioTXT = "Sucio";
      } else {
        this.limpioTXT = "Desconocido";
      }
    },
    nivelAgua(a) {
      if (this.nivel > (this.tanque / 4) * 3) {
        this.nivelIMG = 4;
      } else if (this.nivel > this.tanque / 2) {
        this.nivelIMG = 3;
      } else if (this.nivel > this.tanque / 4) {
        this.nivelIMG = 2;
      } else if (this.nivel > 0) {
        this.nivelIMG = 1;
      } else if (this.nivel == 0) {
        this.nivelIMG = 0;
      } else {
        this.nivelIMG = 5;
        this.nivel = "Desconocido";
      }

      if(a == true && this.nivel == "Desconocido"){
        this.nivel = "-1";
      }
    },
    mmDesconocido(a) {
      if (this.mm < 0) {
        this.mm = "Desconocido";
      }
      if(a == true && this.mm == "Desconocido"){
        this.mm = "-1";
      }
    },
    actualizar() {
      this.nivelAgua(true);
      this.mmDesconocido(true);
      const collectionRef = db.collection("Usuarios");
      collectionRef
        .doc(this.id)
        .set({
          captar: this.captar,
          tanque: this.tanque,
          pluviometro: this.pluviometro,
          mm: this.mm,
          nivel: this.nivel,
          limpio: this.limpio,
        })
        .then(() => {
          this.good = "good";
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
  computed: {
    captarIsValid() {
      return !!this.captar;
    },
    tanqueIsValid() {
      return !!this.tanque;
    },
    pluvIsValid() {
      return !!this.pluviometro;
    },
  },
};
</script>

<style>
@import url(https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css);
@import url(https://use.fontawesome.com/releases/v5.0.13/css/all.css);

.container {
  margin-bottom: 10px;
}

.search {
  width: 50px;
  height: 50px;
  margin-right: 20px;
  margin-left: 10px;
  object-fit: contain;
}

.f {
  width: fit-content;
}

.row {
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
}

.btn {
  margin-bottom: 10px;
}
</style>
