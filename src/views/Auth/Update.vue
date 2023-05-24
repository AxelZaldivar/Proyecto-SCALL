<template>
  <div class="container">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3">Actualiza tu cuenta</h3>
        <hr />
        <form action="#" @submit.prevent="update">
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
            Actualizar
          </button>
        </form>

        <!--No se pudo actualizar-->
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
            ¡Actualización registrada con éxito!
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
      good: "",
    };
  },
  name: "Update",
  methods: {
    update() {
      this.error = "";
      if (this.name && this.email && this.password) {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: this.name,
          email: this.email,
          password: this.password,
        })
          .then((u) => {
            this.name = "";
            this.email = "";
            this.password = "";
            this.good = "good";
            window.location.reload();
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
