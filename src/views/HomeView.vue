<template>
  <div class="container">
    <div class="home">
      <header>
        <h1>SCALL</h1>
      </header>

      <section>
        <h2>¿Qué es un SCALL?</h2>
        <p>
          Un <b>Sistema de Captación de Agua de Lluvia</b> (SCALL) consiste en un
          arreglo que permite interceptar, recolectar y almacenar agua de
          lluvia. Un SCALL típico implementado a nivel domiciliar consta de las
          siguientes secciones: recolección o captación, conducción, separador
          para las primeras lluvias, almacenamiento y tratamiento.
        </p>
        <img src="../components/assets/SCALL1.png" alt="Libros en una estantería" width="600px"/>
      </section>

      <section>
        <h2>¿Por qué captar agua de lluvia?</h2>
        <p>
          Factores como el impacto del cambio climático sobre el ciclo
          hidrológico, el crecimiento poblacional y el estrés hídrico (cuando la
          demanda de agua es mayor a la cantidad de recursos hídricos
          disponibles) han evidenciado la necesidad de contar con diversas
          alternativas para asegurar el acceso al agua para toda la población.
          Un elemento indispensable para enfrentar los retos en torno al agua es
          el uso sostenible de los recursos hídricos, lo cual incluye el manejo
          integral del agua de lluvia.
        </p>
        <img
          src="../components/assets/SCALL2.png"
          alt="Libros en una estantería"
        />
      </section>

      <section>
        <h2>Aspectos importantes a considerar</h2>
        <p>
          Los aspectos más relevantes para habilitar un SCALL son: 
          <ul>
            <li>
              <b>Precipitación pluvial promedio anual del lugar:</b> Valor obtenido mediante el promedio
              de lluvias registradas en un año. <i><b>Un milímetro de lluvia equivale a un litro/m²</b>. 
              Este dato es el que proporcionamos en esta página específicamente de la región Mexicana.</i>
            </li>
            <li>
              <img src="../components/assets/mx.png" alt="Bandera de México" width="200px"/>
            </li>
            <li>
              <b>Intensidad de la precipitación:</b> Es igual a la precipitación
              sobre tiempo, suele expresarse en mm/hr. Distribución temporal de la
              precipitación: Las localidades con precipitación pluvial distribuida
              en un mayor número de meses del año, favorece a los SCALL, por
              ejemplo, en las zonas subhúmedas y húmedas.
            </li>
            <li>
              <b>Superficies de techumbres o áreas de captación de agua de lluvia:</b> 
              Entre más grandes sea la superficie, mayor cantidad de agua podrá ser captada.
            </li>
            <li>
              <b>Material del área de captación:</b> El coeficiente de escurrimiento es la 
              relación entre el volumen escurrido y el llovido. Existen coeficientes de
              escurrimiento para diversos tipos de techos o áreas de captación.
            </li>
            <li>
              <b>Distancia entre el área de captación y lugar de almacenamiento:</b> 
              La zona de almacenamiento debe estar, preferentemente, en un punto más
              bajo para que el transporte del agua sea por gravedad. El costo es
              mayor a medida que aumente la distancia al lugar de almacenamiento.
            </li>
            <li>
              <b>Tipo de material donde se ubicará el almacenamiento:</b> Repercute
              directamente en el costo de la excavación y construcción del almacenamiento.
            </li>
          </ul>
        </p>
      </section>
    </div>
  </div>
</template>

<script>
import { collection, query, where, getDocs } from "firebase/firestore";
import firebase from "../firebase/init.js";

export default {
  data() {
    return {
      books: [],
      find: null,
      query: null,
      books1: [],
      find1: null,
      query1: null,
    };
  },

  name: "HomeView",

  mounted() {
    this.getAll();
  },

  methods: {
    getAll() {
      this.getNovedades();
      this.getVendidos();
    },
    async getNovedades() {
      var currentYear = new Date().getFullYear();
      this.books = [];
      this.find = null;
      this.query = query(
        collection(firebase, "Books"),
        where("year", "==", currentYear + "")
      );

      await getDocs(this.query)
        .then((querySnapshot) => {
          if (querySnapshot.size < 1) {
            this.find = true;
          } else {
            querySnapshot.forEach((doc) => {
              this.books.push(doc.data());
            });
          }
        })
        .catch(() => (this.find = true));
    },
    async getVendidos() {
      this.books1 = [];
      this.find1 = null;
      this.query1 = query(
        collection(firebase, "Books"),
        where("gender", "==", "Ciencia")
      );

      await getDocs(this.query1)
        .then((querySnapshot) => {
          if (querySnapshot.size < 1) {
            this.find1 = true;
          } else {
            querySnapshot.forEach((doc) => {
              this.books1.push(doc.data());
            });
          }
        })
        .catch(() => (this.find1 = true));
    },
    agregarFav(book) {
      const db = firebase.collection("Books");
      db.doc(book.isbn).update({
        fav: true,
      });
    },
  },
};
</script>

<style>
/* Fuentes */
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

.home {
  margin: 0;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  background-color: #f8f8f8;
}

.home h1,
.home h2 {
  margin: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
}

.home header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  color: #fff;
  background-color: #41b883;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.home h1 {
  font-size: 36px;
  text-align: center;
  color: #fff;
}

.home section {
  margin: 10px;
  padding: 20px;
}

.home section h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.home section p {
  margin-bottom: 20px;
  color: gray;
}

.home section li{
  margin-bottom: 20px;
  color: gray;
  margin-left: 10px;
}
</style>
