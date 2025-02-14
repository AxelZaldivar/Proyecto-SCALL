<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/">
        <img src="@/components/assets/ScallCucei.png" class="logo" />
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
                  <span class="espacio-izq">Precipitación anual</span>
                </router-link>
                <!--Pronóstico-->
                <a class="navbar-item" href="https://pronostico.vercel.app/">
                  <i class="fa fa-cloud"></i>
                  <span class="espacio-izq">Pronóstico del clima</span></a
                >
                <!--SCALL-->
                <router-link class="navbar-item" to="/SCALL">
                  <i class="fa fa-info-circle"></i>
                  <span class="espacio-izq">Info del SCALL</span>
                </router-link>
                <!--Excedente-->
                <router-link class="navbar-item" to="/Excedente">
                  <i class="fa fa-exclamation"></i>
                  <span class="espacio-izq">Excendete de agua</span>
                </router-link>
                <!--Update-->
                <router-link class="navbar-item" to="/update">
                  <i class="fa fa-user-circle"></i>
                  <span class="espacio-izq">Actualizar perfil</span>
                </router-link>
                <!--Cerrar sesión-->
                <a class="navbar-item" @click.prevent="logout">
                  <i class="fa fa-window-close"></i>
                  <span class="espacio-izq underline-on-hover"
                    >Cerrar sesión</span
                  ></a
                >
              </div>
            </div>
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
    <img src="@/components/assets/udg.jpg" class="logo" />
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
