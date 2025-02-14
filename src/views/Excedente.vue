<template>
  <div class="container">
    <div class="home">
      <header>
        <h1>Exceso de agua</h1>
      </header>

      <section>
        <h2>Actividades registradas</h2>
        <div class="card">
          <ul class="list-group list-group-flush">
            <li v-for="todo in todos" :key="todo">
              <!--Vista de la tarea en sí-->
              <div class="d-flex" v-if="!todo.isEdited">
                <div class="p-2">
                  <h3>{{ todo.title }}</h3>
                  <br />
                  <i class="fa fa-arrow-right"></i>
                  <span> {{ todo.content }} litros </span>
                </div>
                <div class="ml-auto p-2">
                  <button
                    class="btn-sm button is-primary"
                    @click="edit(todo)"
                    v-show="!isBeingEdited"
                  >
                    <i class="fa fa-edit"></i>
                  </button>
                </div>
              </div>
              <!--Vista para editar una actividad-->
              <form v-else class="m-0" @submit.prevent="update(todo)">
                <div class="input-group">
                  <h3>{{ todo.title }}, te consume</h3>
                  <input
                    type="text"
                    class="form-control form-control-sm espacio-izq"
                    placeholder="Editar"
                    v-model="editTodo"
                  />
                  <button
                    class="btn-sm btn-outline-primary espacio-izq"
                    type="submit"
                    :disabled="!editTodoIsValid"
                  >
                    <i class="fa fa-save"></i>
                  </button>
                  <button
                    class="btn-sm btn-outline-danger espacio-izq"
                    @click="remove(todo)"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </form>
              <hr />
            </li>
            <h3>&nbsp; &nbsp; ¡Agrega más actividades!</h3>
            <span
              >Estas tareas te serán recomendadas en tu aplicación móvil del
              SCALL según la cantidad de litros que llegaran a sobrepasar la
              capacidad de tu tanque previo al pronóstico de la próxima lluvia,
              con el objetivo de que puedas aprovechar la mayor cantidad de agua
              de lluvia posible.</span
            >
          </ul>
        </div>
      </section>

      <section>
        <h2>Añadir nueva actividad</h2>
        <div class="card">
          <form class="f" @submit.prevent="add(title, todo)">
            <input
              type="text"
              class="form-control espacio"
              placeholder="Nombre de la actividad"
              v-model="title"
            />
            <input
              type="text"
              class="form-control espacio"
              placeholder="Litros de agua que requiere"
              v-model="todo"
            />
            <div class="btn cincuenta">
              <button
                class="btn button is-primary"
                type="submit"
                :disabled="!todoIsValid"
              >
                <i class="fa fa-plus-square espacio-der" aria-hidden="true"></i>
                Añadir
              </button>
            </div>
          </form>
        </div>
      </section>

      <section>
        <h2>Cargar datos al servidor</h2>
        <form class="f">
          <button
            class="btn btn-sm button is-primary"
            @click="actualizar"
            :disabled="this.error"
          >
            <i class="fa fa-upload espacio-der"></i>
            Subir
          </button>
        </form>
      </section>

      <!--Sí pudo actualizar la información-->
      <div class="alert" v-if="good">
        <hr />
        <div class="alert alert-primary alert-dismissible fade show">
          ¡Información registrada con éxito!
        </div>
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
import db from "../firebase/init.js";

//importar la ventana emergente
import DialogComponent from "../components/layout/Modal.vue";

export default {
  components: {
    DialogComponent,
  },
  data() {
    return {
      id: null,
      error: null,
      good: null,
      fieldNames: [],
      todo: null,
      title: null,
      todos: [],
      editTodo: null,
      showModal: false,
      opcion: null,
    };
  },
  name: "Excedente",
  mounted() {
    this.identificarUsuario();
    this.openModal(12);
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
        this.id = user.uid;
        this.searchUser();
      } else {
        this.openModal(10);
        this.error = "No se pudo identificar el usuario";
      }
    },
    searchUser() {
      db.collection("Excedente")
        .doc(this.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.fieldNames = Object.keys(doc.data());
            this.fieldNames.forEach((elem) => {
              this.getDocuments(elem);
            });
          } else {
            this.openModal(10);
            this.error = "El documento no existe";
          }
        })
        .catch((err) => {
          this.error = err;
        });
    },
    async getDocuments(doc) {
      try {
        const docRef = db.collection("Excedente").doc(this.id);
        const docSnapshot = await docRef.get();
        const fieldValor = docSnapshot.data()[doc];
        this.add(doc, fieldValor);
      } catch (err) {
        this.openModal(10);
        this.error = err;
      }
    },
    actualizar() {
      //reinicia los letreros
      this.good = null;
      this.error = null;

      //carga los datos al servidor
      const collectionRef = db.collection("Excedente");
      const data = {};
      this.todos.forEach((doc) => {
        data[doc.title] = doc.content;
      });
      collectionRef
        .doc(this.id)
        .set(data)
        .then(() => {
          this.good = "Cambios guardados exitosamente";
        })
        .catch((err) => {
          this.openModal(10);
          this.error = err;
        });
    },

    //Gestionar las tareas
    add(titulo, act) {
      this.todos.push({
        title: titulo,
        content: act,
        isEdited: false,
      });
      this.todo = null;
      this.title = null;
    },
    remove(todo) {
      this.todos = this.todos.filter((item) => {
        return item != todo;
      });
    },
    edit(todo) {
      this.editTodo = todo.content;
      todo.isEdited = true;
    },
    update(todo) {
      if (!this.editTodoIsValid) {
        return;
      }
      todo.content = this.editTodo;
      todo.isEdited = false;
    },
  },

  computed: {
    todoIsValid() {
      return !!this.todo;
    },
    editTodoIsValid() {
      return !!this.editTodo;
    },
    isBeingEdited() {
      return this.todos.filter((todo) => todo.isEdited).length > 0;
    },
  },
};
</script>

<style>
@import url(https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css);
@import url(https://use.fontawesome.com/releases/v5.0.13/css/all.css);
</style>
