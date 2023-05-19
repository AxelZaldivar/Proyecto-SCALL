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
          <hr>
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
  methods: {
    register() {
      this.error = "";
      if (this.name && this.email && this.password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            //actualizar el usuario
            if (user) {
              const auth = getAuth();
              updateProfile(auth.currentUser, {
                  displayName: this.name,
                })
                .then((u) => {
                  this.name = "";
                  this.email = "";
                  this.password = "";
                  this.$router.push({ name: "dashboard" });
                })
                .catch((err) => {
                  this.error = err.message;
                });
            }
          })
          .catch((err) => {
            this.error = err.message;
          });
      } else {
        this.error = "Todos los campos son requeridos";
      }
    },
  },
};
</script>
