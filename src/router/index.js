import { createRouter, createWebHistory } from 'vue-router';
import Superheroes from '../components/SuperheroesList.vue';
import CreateSuperhero from '../components/CreateSuperhero.vue';
import ModifySuperhero from '../components/ModifySuperhero.vue';
import DeleteSuperhero from '../components/DeleteSuperhero.vue';

const routes = [
  {
    path: '/superheroes',
    name: 'Superheroes',
    component: Superheroes,
  },
  {
    path: '/superheroes/create',
    name: 'CreateSuperhero',
    component: CreateSuperhero,
  },
  {
    path: '/superheroes/modify/:id',
    name: 'modify',
    component: ModifySuperhero,
  },
  {
    path: '/superheroes/delete/:id',
    name: 'DeleteSuperhero',
    component: DeleteSuperhero,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
