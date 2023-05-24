<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="@/components/assets/logo.png" class="logo" />
        <h3 class="title is-3">Sistema de Captación de Agua de Lluvia</h3>
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        @click.prevent="toggleMenu"
        :class="{ 'is-active': isOpen }"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': isOpen }"
    >
      <div class="navbar-end">
        <div class="navbar-item">
          <template v-if="user">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link"> {{ user.displayName || user.email }} </a>
              <div class="navbar-dropdown">
                <!--Dashboard-->
                <router-link class="navbar-item" to="/dashboard">
                  <i class="fa fa-tint"></i>
                  <span class="espacio">Precipitación anual</span>
                </router-link>
                <!--Pronóstico-->
                <a class="navbar-item" href="https://pronostico.vercel.app/">
                  <i class="fa fa-cloud"></i>
                  <span class="espacio">Pronóstico del clima</span></a
                >
                <!--Update-->
                <router-link class="navbar-item" to="/update">
                  <i class="fa fa-user-circle"></i>
                  <span class="espacio">Actualizar perfil</span>
                </router-link>
                <!--Cerrar sesión-->
                <a class="navbar-item" @click.prevent="logout">
                  <i class="fa fa-window-close"></i>
                  <span class="espacio">Cerrar sesión</span></a
                >
              </div>
            </div>
            <p class="white">aaaaaaaaa</p>
          </template>

          <template v-else>
            <div class="buttons">
              <router-link class="button is-primary" to="/register">
                <strong>Registrarme</strong>
              </router-link>
              <router-link class="button is-light" to="/login">
                Iniciar sesión
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
//importar firebase para saber cuando el usuario inicia sesion
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  //atributos o propieddaes del componente
  data() {
    return {
      isOpen: false,
      user: null,
    };
  },
  //métodos del componente
  methods: {
    toggleMenu() {
      const status = !this.isOpen;
      this.isOpen = status;
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "login" });
        });
    },
  },
  //ciclo de vida, es cuando se crea el componente
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style>
.navbar {
  margin-bottom: 30px;
}

.logo {
  height: max-content;
  width: max-content;
  margin: 10px;
}

.white {
  color: white;
}

.espacio {
  margin-left: 10px;
}
</style>
