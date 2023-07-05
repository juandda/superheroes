<template>
  <div v-if="superhero">
    <h2>{{ superhero.nombre }}</h2>
    <img :src="superhero.imagen" :alt="superhero.nombre" />
    <p>Editorial: {{ superhero.editorial }}</p>
    <p>Creador: {{ superhero.creador }}</p>
    <p>Descripción: {{ superhero.descripcion }}</p>
    <button @click="goBack()" class="btn btn-primary">Volver</button>
  </div>
  <div v-else>
    <p>No se ha seleccionado ningún superhéroe</p>
  </div>
</template>

<script>
export default {
  props: {
    superhero: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goBack() {
      window.location.reload();
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 0;
}
img {
  max-width: 100%;
}
</style>
