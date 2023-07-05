<template>
  <div>
    <h2>Modificar Superhéroe</h2>
    <form @submit.prevent="modifySuperhero" class="modify-form">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          v-model="modifiedSuperhero.nombre"
          required
        />
      </div>
      <div class="form-group">
        <label for="editorial">Casa Editorial:</label>
        <input
          type="text"
          class="form-control"
          id="editorial"
          v-model="modifiedSuperhero.editorial"
          required
        />
      </div>
      <div class="form-group">
        <label for="creador">Creador o Alter-Ego:</label>
        <input
          type="text"
          class="form-control"
          id="creador"
          v-model="modifiedSuperhero.creador"
          required
        />
      </div>
      <div class="form-group">
        <label for="creador">Creador o Alter-Ego:</label>
        <input
          type="text"
          class="form-control"
          id="creador"
          v-model="modifiedSuperhero.imagen"
          required
        />
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <textarea
          class="form-control"
          id="descripcion"
          v-model="modifiedSuperhero.descripcion"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Guardar cambios</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      superhero: {},
      modifiedSuperhero: {},
    };
  },
  mounted() {
    this.fetchSuperhero();
  },
  methods: {
    async fetchSuperhero() {
      try {
        const id = this.$route.params.id;
        const response = await fetch(`http://localhost:3000/superheroes/${id}`);
        const data = await response.json();
        this.superhero = data;
        this.modifiedSuperhero = { ...data };
      } catch (error) {
        console.error("Error al obtener los datos del superhéroe:", error);
      }
    },
    async modifySuperhero() {
      try {
        const id = this.$route.params.id;
        const response = await fetch(
          `http://localhost:3000/superheroes/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.modifiedSuperhero),
          }
        );
        const data = await response.json();
        console.log("Superhéroe modificado:", data);
        alert("Superhéroe modificado correctamente");

        // Redirige de vuelta a la lista de superhéroes después de la modificación
        this.$router.push("/superheroes");
      } catch (error) {
        console.error("Error al modificar el superhéroe:", error);
      }
    },
  },
};
</script>

<style scoped>
.modify-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

.form-control {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

textarea.form-control {
  height: 120px;
}

button.btn-primary {
  margin-top: 10px;
}
</style>
