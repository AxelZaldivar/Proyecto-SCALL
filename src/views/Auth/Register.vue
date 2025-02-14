<template>
  <div class="container">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3">Crear una cuenta</h3>
        <hr />
        <form action="#" @submit.prevent="register">
          <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="e.g Alex Smith"
                v-model="name"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
                v-model="email"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Contraseña</label>
            <div class="control">
              <input class="input" type="password" v-model="password" />
            </div>
          </div>
          <br /><button type="submit" class="button is-primary">
            Registrarme
          </button>
        </form>

        <div class="error" v-if="error">
          <hr />
          <div class="notification is-danger">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init.js";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth, updateProfile } from "firebase/auth";
const collectionU = db.collection("Usuarios");
const collectionE = db.collection("Excedente");

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: "",
    };
  },
  name: "Register",
  mounted() {
    firebase.auth().signOut();
  },
  methods: {
    register() {
      this.error = "";
      if (this.name && this.email && this.password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            if (user) {
              this.actualizarUsuario();
              this.crearDocumentoUsuario(user.user.uid);
            }
          })
          .catch((err) => {
            this.error = err.message;
          });
      } else {
        this.error = "Todos los campos son requeridos";
      }
    },
    actualizarUsuario() {
      const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: this.name,
      })
        .then((u) => {
          this.name = "";
          this.email = "";
          this.password = "";
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
    crearDocumentoUsuario(userID) {
      collectionU
        .doc(userID)
        .set({
          pluviometro: "0",
          captar: "0",
          tanque: "0",
          nivel: "-1",
          limpio: "-1",
          mm: "-1",
        })
        .then(() => {
          this.crearDocumentoExcedente(userID);
        })
        .catch((err) => {
          this.error = err.message + "Error al crear el documento.";
        });
    },
    crearDocumentoExcedente(userID) {
      collectionE
        .doc(userID)
        .set({
          Bañarse: "100",
        })
        .then(() => {
          console.log("RegEx");
          this.$router.push({ name: "dashboard" });
        })
        .catch((err) => {
          this.error = err.message + "Error al crear el documento.";
        });
    },
  },
};
</script>
