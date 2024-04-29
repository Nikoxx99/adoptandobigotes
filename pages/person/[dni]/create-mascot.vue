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
            Registra los datos de tu mascota
          </v-card-title>
          <v-card-text>
            <v-text-field label="Nombre de tu mascota" class="mb-2" variant="outlined" hide-details="auto" />
            <v-text-field label="Raza" class="mb-2" variant="outlined" hide-details="auto" />
            <v-select
              label="Genero"
              :items="['Macho', 'Hembra']"
              variant="outlined"
              hide-details="auto"
              class="mb-2"
            />
            <v-text-field type="number" max="150" label="Edad" class="mb-2" variant="outlined" hide-details="auto" />
            <v-select
              label="Esta vacunado?"
              :items="['Si', 'No (Por qué?)', 'Solo contra la rabia']"
              variant="outlined"
              hide-details="auto"
              class="mb-2"
            />
            <v-text-field label="Razón de no vacunacion" class="mb-2" variant="outlined" hide-details="auto" />
            <v-select
              label="Esta esterilizado?"
              :items="['Si', 'No (Por qué?)', 'No aplica']"
              variant="outlined"
              hide-details="auto"
              class="mb-2"
            />
            <v-text-field label="Razón de no esterilizacion" class="mb-2" variant="outlined" hide-details="auto" />
          </v-card-text>
          <v-card-text>
            <v-btn color="orange-lighten-1" rounded="lg" size="x-large" block>Continuar</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const route = useRoute()
  const { data: res} = await useFetch(`/api/person/${route.params.dni}`, {
    method: "get"
  })
  console.log(res.value)
  const personWithMascots = res.value.data
</script>