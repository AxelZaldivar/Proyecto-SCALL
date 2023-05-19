<template>
  <div class="container">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3">Iniciar sesión</h3>
        <hr />
        <form action="#" @submit.prevent="login">
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
            Iniciar sesión
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
//import "firebase/compat/auth";
//import "firebase/compat/firestore";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  name: "Login",
  methods: {
    login() {
      this.error = "";
      if (this.email && this.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            this.$router.push({ name: "dashboard" });
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
