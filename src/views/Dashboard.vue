<template>
  <div id="app">
    <div class="container">
      <h2>Precipitación (mm) a nivel nacional</h2>
      <BarChart />
      <div class="home">
        <section>
          <p>Datos extraídos de la Comisión Nacional del Agua 2022</p>
          <a href="https://smn.conagua.gob.mx/tools/DATA/Climatolog%C3%ADa/Pron%C3%B3stico%20clim%C3%A1tico/Temperatura%20y%20Lluvia/PREC/2022.pdf" target="_blank">Visitar el sitio oficial</a>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "./BarChart.vue";

export default {
  name: "Dashboard",
  components: { BarChart },
};
</script>

<style>
@import url(https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css);
@import url(https://use.fontawesome.com/releases/v5.0.13/css/all.css);

.container {
  margin-bottom: 10px;
}

.f {
  width: fit-content;
}

.book {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: lightgray;
  margin: 20px;
}

.book h6 {
  margin-top: 10px;
}

.search {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  object-fit: contain;
}

.btn {
  margin-left: 10px;
}

.ind {
  width: calc(30% - 10px);
  margin-bottom: 20px;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: all 0.3s ease-in-out;
  text-align: center;
}

.ind:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.ind img {
  margin-bottom: 10px;
  height: 200px;
  width: 150px;
}

.home section p {
  margin-bottom: 20px;
  color: gray;
}

.home section a {
  margin-bottom: 20px;
  color: rgb(0, 89, 255);
}
</style>
