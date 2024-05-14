<template>
  <v-container>
    <v-row class="align-center justify-center" style="height:calc(100svh - 8px);">
      <v-col color="bg-red-lighten-5 mx-auto">
        <v-img
          class="mx-auto"
          width="150"
          src="/logo.png"
          alt="Logo Colectivo Adoptando Bigotes"
        />
        <v-card class="mx-auto" width="900">
          <v-card-title class="text-center">
            Bienvenido a Adoptando Bigotes
          </v-card-title>
          <v-alert v-if="error" type="error">{{ error }}</v-alert>
          <v-card-text class="d-flex">
            <v-select
              v-model="dniType"
              label="Tipo de Documento"
              :items="dniTypes"
              variant="outlined"
              class="mr-4"
              hide-details="auto"
            />
            <v-text-field v-model="dni" label="Cédula de Ciudadanía" variant="outlined" hide-details="auto" @focus="error = ''" />
          </v-card-text>
          <v-card-text>
            <v-btn color="orange-lighten-1" rounded="lg" size="x-large" block @click="getPerson">Continuar</v-btn>
          </v-card-text>
          <v-card-text>
            <p>
              Adoptando Bigotes es una organización sin fines de lucro que se dedica a rescatar, rehabilitar y reubicar gatos en situación de calle.
            </p>
            <p>
              Nuestro objetivo es encontrar un hogar para cada uno de los gatos que rescatamos, y para ello necesitamos tu ayuda.
            </p>
            <p>
              Si estás interesado en adoptar un gato, puedes ver los gatos que tenemos disponibles en nuestra página web.
            </p>
            <p>
              Si quieres colaborar con nosotros, puedes hacerlo de varias formas:
            </p>
            <ul>
              <li>
                Haciendo una donación
              </li>
              <li>
                Siendo voluntario
              </li>
              <li>
                Difundiendo nuestra causa
              </li>
            </ul>
            <p>
              Si tienes alguna duda o sugerencia, no dudes en contactarnos.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

const error = ref('')

const dni = ref('')
const dniType = ref({
  title: 'Cédula de Ciudadanía',
  value: 1
})
const dniTypes = [
  {
    title: 'Cédula de Ciudadanía',
    value: 1
  },
  {
    title: 'Cédula de Extranjería',
    value: 2
  },
  {
    title: 'Pasaporte',
    value: 3
  }
]

async function getPerson() {
  const { data: person} = await $fetch(`/api/person/${dni.value}`, {
    method: "get"
  })
  console.log(person)
  // person returns ab object with the data in first level
  if (!dniType.value) {
    error.value = 'Por favor selecciona un tipo de documento.'
  }
  if (person === null) {
    navigateTo('/person/register?dni=' + dni.value)
    return
  }
  navigateTo(`/person/${dni.value}`)
}

</script>