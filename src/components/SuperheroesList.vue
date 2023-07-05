<template>
  <div class="container">
    <h1>Lista de Superhéroes</h1>

    <!-- Barra de búsqueda -->
    <div class="search-bar">
      <input
        type="text"
        class="form-control"
        v-model="searchQuery"
        placeholder="Buscar por nombre"
      />
      <button class="btn btn-primary" @click="searchSuperheroes">Buscar</button>
    </div>

    <div class="row">
      <div
        class="col-md-4"
        v-for="superhero in visibleSuperheroes"
        :key="superhero.id"
      >
        <div class="card" @click="selectSuperhero(superhero.id)">
          <img
            :src="superhero.imagen"
            class="card-img-top"
            alt="Imagen de Superhéroe"
          />
          <div class="card-body">
            <h5 class="card-title">{{ superhero.nombre }}</h5>
            <p class="card-text">{{ superhero.editorial }}</p>
            <p class="card-text">{{ superhero.creador }}</p>
            <p class="card-text">{{ superhero.descripcion }}</p>
            <div class="button-container">
              <button
                @click="modifySuperhero(superhero)"
                class="btn btn-primary"
              >
                Modificar
              </button>
              <button
                @click="deleteSuperhero(superhero.id)"
                class="btn btn-danger"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination-container">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="btn btn-primary"
      >
        Anterior
      </button>
      <span v-for="pageNumber in visiblePageNumbers" :key="pageNumber">
        <button
          @click="goToPage(pageNumber)"
          :class="{ active: pageNumber === currentPage }"
          class="btn btn-primary"
        >
          {{ pageNumber }}
        </button>
      </span>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="btn btn-primary"
      >
        Siguiente
      </button>
    </div>

    <!-- Componente SuperheroDetail -->
    <SuperheroDetail
      v-if="selectedSuperheroId"
      :superhero="getSelectedSuperhero"
    />
  </div>
</template>

<script>
import SuperheroDetail from "./SuperheroDetail.vue";

export default {
  components: {
    SuperheroDetail,
  },
  data() {
    return {
      superheroes: [],
      filteredSuperheroes: [],
      currentPage: 1,
      pageSize: 6,
      searchQuery: "",
      selectedSuperheroId: null,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredSuperheroes.length / this.pageSize);
    },
    visibleSuperheroes() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredSuperheroes.slice(startIndex, endIndex);
    },
    visiblePageNumbers() {
      const pageCount = Math.min(5, this.totalPages);
      const startPage = Math.max(
        1,
        this.currentPage - Math.floor(pageCount / 2)
      );
      return Array.from({ length: pageCount }, (_, i) => startPage + i);
    },
    getSelectedSuperhero() {
      return this.superheroes.find(
        (superhero) => superhero.id === this.selectedSuperheroId
      );
    },
  },
  mounted() {
    this.fetchSuperheroes();
  },
  methods: {
    async fetchSuperheroes() {
      try {
        const response = await fetch("http://localhost:3000/superheroes");
        const data = await response.json();
        this.superheroes = data;
        this.filteredSuperheroes = data;
      } catch (error) {
        console.error("Error al obtener los superhéroes:", error);
      }
    },
    goToPage(pageNumber) {
      if (pageNumber < 1 || pageNumber > this.totalPages) {
        return;
      }
      this.currentPage = pageNumber;
    },
    modifySuperhero(superhero) {
      this.$router.push({ name: "modify", params: { id: superhero.id } });
    },
    async deleteSuperhero(superheroId) {
      try {
        const response = await fetch(
          `http://localhost:3000/superheroes/${superheroId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Superhéroe eliminado exitosamente");
          this.fetchSuperheroes();
        } else {
          console.error("Error al eliminar el superhéroe:", response.status);
        }
      } catch (error) {
        console.error("Error al eliminar el superhéroe:", error);
      }
    },
    searchSuperheroes() {
      const searchQuery = this.searchQuery.toLowerCase().trim();
      this.filteredSuperheroes = this.superheroes.filter((superhero) =>
        superhero.nombre.toLowerCase().includes(searchQuery)
      );
      this.currentPage = 1;
    },
    selectSuperhero(superheroId) {
      this.selectedSuperheroId = superheroId;
    },
    scrollToDetail() {
      this.$refs.superheroDetail.$el.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.banner {
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
}

.banner h1 {
  font-size: 28px;
  margin: 0;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar .form-control {
  flex: 1;
  margin-right: 10px;
}

.card {
  margin-bottom: 20px;
  border-radius: 8px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.card-body {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.card-text {
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.button-container {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-container button {
  margin: 0 5px;
}

.active {
  background-color: #007bff;
  color: #fff;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
