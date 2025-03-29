<!--
Comando para correr el proyecto
npm run serve
Comando para empaquetar el proyecto
npm run build
-->

<template>
  <div class="container">
    <div class="home">
      <header>
        <h1>SISTEMA DE CAPTACIÓN DE AGUA DE LLUVIA</h1>
      </header>

      <section>
        <h2>¿Qué es un SCALL?</h2>
        <p>
          Un <b>Sistema de Captación de Agua de Lluvia</b> (SCALL) consiste en
          un arreglo que permite interceptar, recolectar y almacenar agua de
          lluvia. Un SCALL típico implementado a nivel domiciliar consta de las
          siguientes secciones: recolección o captación, conducción, separador
          para las primeras lluvias, almacenamiento y tratamiento.
        </p>
        <img src="../components/assets/SCALL1.png" alt="SCALL" width="600px" />
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
      </section>

      <section>
        <h2>Aspectos importantes a considerar</h2>
        <p>Los aspectos más relevantes para habilitar un SCALL son:</p>
        <ul>
          <li>
            <i class="fa fa-arrow-right"></i> &nbsp;
            <b>Precipitación pluvial promedio anual del lugar:</b> Valor
            obtenido mediante el promedio de lluvias registradas en un año.
            <i
              ><b>Un milímetro de lluvia equivale a un litro/m²</b>. Este dato
              es el que proporcionamos en esta página específicamente de la
              región Mexicana.</i
            >
          </li>
          <li>
            <img
              src="../components/assets/mx.png"
              alt="Bandera de México"
              width="200px"
            />
          </li>
          <li>
            <i class="fa fa-arrow-right"></i> &nbsp;
            <b>Intensidad de la precipitación:</b> Es igual a la precipitación
            sobre tiempo, suele expresarse en mm/hr. Distribución temporal de la
            precipitación: Las localidades con precipitación pluvial distribuida
            en un mayor número de meses del año, favorece a los SCALL, por
            ejemplo, en las zonas subhúmedas y húmedas.
          </li>
          <li>
            <i class="fa fa-arrow-right"></i> &nbsp;
            <b
              >Superficies de techumbres o áreas de captación de agua de
              lluvia:</b
            >
            Entre más grandes sea la superficie, mayor cantidad de agua podrá
            ser captada.
          </li>
          <li>
            <i class="fa fa-arrow-right"></i> &nbsp;
            <b>Material del área de captación:</b> El coeficiente de
            escurrimiento es la relación entre el volumen escurrido y el
            llovido. Existen coeficientes de escurrimiento para diversos tipos
            de techos o áreas de captación.
          </li>
          <li>
            <i class="fa fa-arrow-right"></i> &nbsp;
            <b
              >Distancia entre el área de captación y lugar de
              almacenamiento:</b
            >
            La zona de almacenamiento debe estar, preferentemente, en un punto
            más bajo para que el transporte del agua sea por gravedad. El costo
            es mayor a medida que aumente la distancia al lugar de
            almacenamiento.
          </li>
          <li>
            <i class="fa fa-arrow-right"></i> &nbsp;
            <b>Tipo de material donde se ubicará el almacenamiento:</b>
            Repercute directamente en el costo de la excavación y construcción
            del almacenamiento.
          </li>
        </ul>
      </section>

      <section>
        <h2>Elementos de un SCALL</h2>
        <img src="../components/assets/SCALL2.png" alt="Pasos" />
        <ul>
          <li>
            <i class="fa fa-arrow-right"></i> &nbsp;
            <b>Superficie de captación:</b>
            Generalmente es el techo o azotea, preferiblemente de lámina
            metálica, teja, cemento pulido o plástico.
          </li>
          <li>
            <i class="fa fa-arrow-right"></i> &nbsp;
            <b>Canaletas o bajantes pluviales:</b>
            Conductos que recogen el agua desde el techo y la canalizan hacia el
            sistema. Pueden ser de PVC o materiales resistentes a la intemperie.
            Deben tener pendiente adecuada para que el agua fluya bien.
          </li>
          <li>
            <i class="fa fa-arrow-right"></i> &nbsp;
            <b>Depósito de primeras aguas:</b>
            Es un tanque que almacena el primer volumen de agua que cae al
            inicio de una lluvia. Se separan las primeras aguas dado que estas
            suelen arrastrar polvo acumulado en el techo, hojas secas, ramas,
            excremento de aves, e incluso contaminantes que se pudieran acumular
            durante los días sin lluvia.
          </li>
          <li>
            <i class="fa fa-arrow-right"></i> &nbsp;
            <b>Filtrar el agua de lluvia:</b>
            Por lo general, se utiliza un filtro compuesto por varias capas de
            materiales para mejorar la calidad del agua al eliminar sedimentos,
            impurezas, malos olores y algunos contaminantes. Es muy útil después
            del depósito de primeras aguas y antes del almacenamiento o consumo.
            Por ejemplo, se utiliza fieltro, el cual es una capa superficial que
            retiene partículas grandes, como hojas pequeñas, tierra, insectos o
            residuos visibles. También se utiliza piedra volcánica, la cual
            cuenta con alta porosidad, lo que permite atrapar partículas más
            pequeñas y sirve como medio físico de filtración. Adicionalmente se
            suele agregar carbón activado, el cual, absorve malos olores y
            sabores, químicos, metales pesados, contaminantes orgánicos así como
            algunos microorganismos y bacterias.
          </li>
          <li>
            <i class="fa fa-arrow-right"></i> &nbsp;
            <b>Almacenamiento principal:</b>
            Tanque donde se guarda el agua ya filtrada. Puede ser de plástico,
            concreto o ferrocemento. Debe estar cerrado y protegido de luz,
            insectos y polvo para evitar contaminación.
          </li>
        </ul>
      </section>

      <section>
        <h2>Aplicación móvil</h2>
        <p>
          Descarga nuestra aplicación móvil, para que puedas monitorear de forma
          precisa el pronóstico del clima en donde quiera que te encuentres, y
          puedas gestionar de mejor manera tu SCALL.
        </p>
        <form class="f">
          <a
            href="https://play.google.com/store/apps/details?id=com.szaldivar.axel.scall"
            target="_blank"
            class="btn button is-primary"
          >
            <strong>
              <i class="fa fa-mobile espacio-der"></i>
              App
            </strong>
          </a>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

/* HOMEVIEW Y GENERAL */
.home {
  margin: 0;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  background-color: #eeeeee;
  text-align: justify;
  padding-bottom: 10px;
}

.home h1,
.home h2,
.home h3,
.home span {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
}

.home p,
.home ul {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  text-transform: none;
  margin-bottom: 20px;
  color: gray;
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
  margin-bottom: 20px;
  overflow: hidden;
}

.home h1 {
  font-size: 36px;
  text-align: center;
  color: #fff;
}

.home h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.home h3 {
  font-size: 18px;
  color: black;
}

.home section {
  margin: 10px;
  padding: 20px;
  padding-top: 10px;
}

.home li {
  margin-bottom: 10px;
  color: gray;
  margin-left: 10px;
}

.home span {
  font-size: 16px;
  margin-left: 30px;
  color: #333;
}

.f {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  margin: 10px;
  width: 80%;
}

.btn:hover {
  transform: translateY(-5px);
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
}

/* SCALL */
.cardi {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 350px;
  transition: transform 0.3s, box-shadow 0.3s;
  padding: 16px;
  margin-right: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.cardi:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.cardi-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.horizontal {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  align-items: center;
}

.search {
  width: 80px;
  height: 80px;
  margin-right: 20px;
  margin-bottom: 10px;
  object-fit: contain;
}

.form-control {
  margin-top: 5px;
}

/* EXCEDENTE */
.espacio {
  margin-bottom: 10px;
}

.espacio-izq {
  margin-left: 15px;
}

.espacio-der {
  margin-right: 5px;
}

.input-group {
  display: flex;
  align-items: center;
}

.cincuenta {
  width: 50%;
  margin: 0px;
}

/* DASHBOARD */
.container {
  margin-bottom: 10px;
}

.card {
  height: 50%;
  width: 95% - 10px;
  margin: 20px;
  padding: 20px;
  margin-bottom: 20px;
}

/* NAVIGATION */
.logo {
  height: 80px;
  margin: 10px;
}

.logo:hover {
  transform: translateY(-5px);
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
}

.white {
  color: white;
}

.underline-on-hover:hover {
  text-decoration: underline;
  color: black;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
}

.mooodal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  z-index: 101;
}

/* SPINNER */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 10px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* FOOTER */
footer {
  font-size: 14px;
  color: gray;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f2f2f2;
  padding: 10px;
  text-align: center;
}
</style>
