<template>
  <div>
    <h2>Crear Superhéroe</h2>
    <form @submit="createSuperhero" class="create-form">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" class="form-control" v-model="nombre" required />
      </div>
      <div class="form-group">
        <label for="imagen">Imagen:</label>
        <input type="text" class="form-control" v-model="imagen" required />
      </div>
      <div class="form-group">
        <label for="editorial">Casa Editorial:</label>
        <input type="text" class="form-control" v-model="editorial" required />
      </div>
      <div class="form-group">
        <label for="creador">Creador o Alter-Ego:</label>
        <input type="text" class="form-control" v-model="creador" required />
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <textarea
          class="form-control"
          v-model="descripcion"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Crear</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: "",
      imagen: "",
      editorial: "",
      creador: "",
      descripcion: "",
    };
  },
  methods: {
    async createSuperhero() {
      try {
        const newSuperhero = {
          nombre: this.nombre,
          imagen: this.imagen,
          editorial: this.editorial,
          creador: this.creador,
          descripcion: this.descripcion,
        };

        const response = await fetch("http://localhost:3000/superheroes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSuperhero),
        });

        if (response.ok) {
          // El superhéroe se creó correctamente
          // Puedes redireccionar al usuario a la página principal o realizar alguna otra acción
        } else {
          console.error("Error al crear el superhéroe:", response.status);
        }
      } catch (error) {
        console.error("Error al crear el superhéroe:", error);
      }
    },
  },
};
</script>

<style scoped>
.create-form {
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
