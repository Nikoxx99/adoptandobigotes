// plugins/directives.ts
import { defineNuxtPlugin } from '#app';
import vUppercase from '~/directives/v-uppercase';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('uppercase', vUppercase);
});
