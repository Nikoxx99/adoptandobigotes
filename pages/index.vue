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
        <v-card class="mx-auto" width="100%" max-width="900">
          <v-card-title>
            Bienvenido
          </v-card-title>
          <v-alert v-if="error" type="error">{{ error }}</v-alert>
          <v-card-text class="d-flex">
            <v-text-field v-model="dni" label="Ingresa tu Documento" variant="outlined" hide-details="auto" @focus="error = ''" @keyup.enter="getPerson" />
          </v-card-text>
          <v-card-text>
            <v-btn color="orange-lighten-1" rounded="lg" size="x-large" v-if="dni" block @click="getPerson">Consultar</v-btn>
          </v-card-text>
          <v-img
            height="300"
            src="~/public/card.jpg"
            cover
          ></v-img>
          <v-card-item>
            <v-card-title>Ayuda a nuestros animales</v-card-title>

            <v-card-subtitle>
              <span class="me-1">San Sebastián de Mariquita</span>

              <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
              ></v-icon>
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <div class="my-4 text-subtitle-1">
              Registra tus mascotas y mantengamos el orden en nuestra comunidad.
            </div>

            <div>Censo de mascotas</div>
          </v-card-text>

          <v-divider class="mx-4 mb-1"></v-divider>

          <v-card-title>Todos los tipos</v-card-title>

          <div class="px-4 mb-2">
            <v-chip-group v-model="selection" selected-class="bg-deep-purple-lighten-2">
              <v-chip>Gatos</v-chip>

              <v-chip>Perros</v-chip>

              <v-chip>Aves</v-chip>

              <v-chip>Y demas especies...</v-chip>
            </v-chip-group>
          </div>
          <v-card-text>
            <p>
              Adoptando Bigotes es una organización sin fines de lucro que se dedica a rescatar, rehabilitar y reubicar gatos en situación de calle.
            </p>
            <p>
              Nuestro objetivo es encontrar un hogar para cada uno de los gatos y perros que rescatamos, y para ello necesitamos tu ayuda.
            </p>
            <p>
              Si estás interesado en adoptar, puedes ver quienes estan a la espera en nuestra página web.
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
            <p>María Camila Rodríguez</p> <a href="whatsapp:3105684980">WhatsaApp: 3105684980</a>
          </v-card-text>
          <v-card-text class="text-grey">
            Desarrollado con ❤️ por <a href="https://nicodelatam.com">Ni.CO</a> usando tecnologías modernas de la web
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

const error = ref('')

const dni = ref('')

async function getPerson() {
  const { data: person} = await $fetch(`/api/person/${dni.value}`, {
    method: "get"
  })
  console.log(person)
  // person returns ab object with the data in first level
  if (person === null) {
    navigateTo('/person/register?dni=' + dni.value)
    return
  }
  navigateTo(`/person/${dni.value}`)
}

</script>