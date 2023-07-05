import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const store = createStore({
  state() {
    return {
      superheroes: [],
      selectedSuperhero: null,
    };
  },
  mutations: {
    SET_SUPERHEROES(state, superheroes) {
      state.superheroes = superheroes;
    },
    SET_SELECTED_SUPERHERO(state, superhero) {
      state.selectedSuperhero = superhero;
    },
    ADD_SUPERHERO(state, superhero) {
      state.superheroes.push(superhero);
    },
    UPDATE_SUPERHERO(state, updatedSuperhero) {
      const index = state.superheroes.findIndex(
        (superhero) => superhero.id === updatedSuperhero.id
      );
      if (index !== -1) {
        state.superheroes.splice(index, 1, updatedSuperhero);
      }
    },
    REMOVE_SUPERHERO(state, superheroId) {
      state.superheroes = state.superheroes.filter(
        (superhero) => superhero.id !== superheroId
      );
    },
  },
  actions: {
    async fetchSuperheroes({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/superheroes`);
        commit('SET_SUPERHEROES', response.data);
      } catch (error) {
        console.error('Error al obtener los superhéroes:', error);
      }
    },
    async fetchSuperheroById({ commit }, id) {
      try {
        const response = await axios.get(`${API_URL}/superheroes/${id}`);
        commit('SET_SELECTED_SUPERHERO', response.data);
      } catch (error) {
        console.error('Error al obtener el superhéroe:', error);
      }
    },
    async createSuperhero({ commit }, superhero) {
      try {
        const response = await axios.post(`${API_URL}/superheroes`, superhero);
        commit('ADD_SUPERHERO', response.data);
      } catch (error) {
        console.error('Error al crear el superhéroe:', error);
      }
    },
    async updateSuperhero({ commit }, superhero) {
      try {
        const response = await axios.put(
          `${API_URL}/superheroes/${superhero.id}`,
          superhero
        );
        commit('UPDATE_SUPERHERO', response.data);
      } catch (error) {
        console.error('Error al actualizar el superhéroe:', error);
      }
    },
    async deleteSuperhero({ commit }, id) {
      try {
        await axios.delete(`${API_URL}/superheroes/${id}`);
        commit('REMOVE_SUPERHERO', id);
      } catch (error) {
        console.error('Error al eliminar el superhéroe:', error);
      }
    },
    async searchSuperheroes({ commit }, nombre) {
      try {
        const response = await axios.get(`${API_URL}/superheroes/nombre/${nombre}`);
        commit('SET_SUPERHEROES', response.data);
      } catch (error) {
        console.error('Error al buscar los superhéroes:', error);
      }
    },
  },
  getters: {
    getSuperheroes(state) {
      return state.superheroes;
    },
    getSelectedSuperhero(state) {
      return state.selectedSuperhero;
    },
  },
});

export default store;
