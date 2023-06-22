<template>
  <div id="app">
    <div class="container">
      <h2>Proximamente</h2>
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
  name: "Excedente",
  mounted() {
    //this.identificarUsuario();
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
