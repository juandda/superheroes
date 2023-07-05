<template>
  <div>
    <h2>Borrar Superhéroe</h2>
    <form @submit="deleteSuperhero">
      <div class="form-group">
        <label for="id">ID del Superhéroe:</label>
        <input type="text" class="form-control" v-model="id" required />
      </div>
      <button type="submit" class="btn btn-danger">Borrar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
    };
  },
  methods: {
    async deleteSuperhero() {
      try {
        const response = await fetch(
          `http://localhost:3000/superheroes/${this.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // El superhéroe se borró correctamente
          // Puedes redireccionar al usuario a la página principal o realizar alguna otra acción
        } else {
          console.error("Error al borrar el superhéroe:", response.status);
        }
      } catch (error) {
        console.error("Error al borrar el superhéroe:", error);
      }
    },
  },
};
</script>
