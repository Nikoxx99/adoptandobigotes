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
            Registre sus datos antes de continuar
          </v-card-title>
          <v-card-text>
            <v-text-field label="Nombre Completo" class="mb-2" variant="outlined" hide-details="uato" />
            <v-text-field label="Cédula de Ciudadanía" class="mb-2" variant="outlined" hide-details="uato" />
            <v-text-field label="Direccion" class="mb-2" variant="outlined" hide-details="uato" />
            <v-text-field label="Barrio" class="mb-2" variant="outlined" hide-details="uato" />
            <v-select
              label="Ciudad"
              :items="['San Sebastián de Mariquita']"
              variant="outlined"
              hide-details="auto"
              class="mb-2"
            />
            <v-text-field label="Celular con WhatsApp" class="mb-2" variant="outlined" hide-details="uato" />
            <v-text-field label="Correo Electrónico" class="mb-2" variant="outlined" hide-details="uato" />
            <v-text-field label="Grupo del Sisben" placeholder="Ejemplo: C10, A1, B12, etc..." variant="outlined" hide-details="uato" />
          </v-card-text>
          <v-card-text>
            <v-btn color="orange-lighten-1" rounded="lg" size="x-large" block>Continuar</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>