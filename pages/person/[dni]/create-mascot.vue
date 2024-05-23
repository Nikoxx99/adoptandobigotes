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
            <v-btn variant="icon" :to="`/person/${route.params.dni}`"><v-icon>mdi-arrow-left</v-icon></v-btn>
            Registra los datos de tu mascota
          </v-card-title>
          <v-card-text>
            <v-alert v-if="!valid && valid !== null" type="error" class="mb-4">
              Por favor, revise los datos que has ingresado.
            </v-alert>
            <v-form v-model="valid">
              <v-text-field v-model="name" :rules="nameRules" label="Nombre de tu mascota" class="mb-2" variant="outlined" hide-details="auto" name="name" required />
              <v-text-field v-model="race" :rules="raceRules" label="Raza" class="mb-2" variant="outlined" hide-details="auto" name="race" required />
              <v-select
                v-model="gender"
                label="Genero"
                :items="genders"
                variant="outlined"
                hide-details="auto"
                class="mb-2"
                name="gender"
                required
                :rules="genderRules"
              />
              <v-select
                v-model="type"
                label="Tipo de Mascota"
                :items="types"
                variant="outlined"
                hide-details="auto"
                class="mb-2"
                name="type"
                required
                :rules="typeRules"
              />
              <v-text-field v-model.number="age" :rules="ageRules" type="number" max="150" label="Edad" class="mb-2" variant="outlined" hide-details="auto" name="age" required />
              <v-select
                v-model="vaccines"
                label="Esta vacunado?"
                :items="['Si', 'No (Por qué?)', 'Solo contra la rabia']"
                variant="outlined"
                hide-details="auto"
                class="mb-2"
                name="vaccines"
                required
                :rules="vaccinesRules"
              />
              <v-text-field v-model="no_vaccines_reason" label="Razón de no vacunacion" class="mb-2" variant="outlined" hide-details="auto" name="no_vaccines_reason" required />
              <v-select
                v-model="sterilized"
                label="Esta esterilizado?"
                :items="['Si', 'No (Por qué?)', 'No aplica']"
                variant="outlined"
                hide-details="auto"
                class="mb-2"
                name="sterilized"
                required
                :rules="sterilizedRules"
              />
              <v-text-field v-model="no_sterilized_reason" label="Razón de no esterilizacion" class="mb-2" variant="outlined" hide-details="auto" name="no_sterilized_reason" required />
            </v-form>
          </v-card-text>
          <v-card-text>
            <v-btn color="orange-lighten-1" rounded="lg" size="x-large" block @click="createMascot">Continuar</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const route = useRoute()
  const { data: person} = await useFetch(`/api/person/${route.params.dni}`, {
    method: "get"
  })
  const valid = ref(false)
  const name = ref('')
  const nameRules = [
    value => {
      if (value) return true

      return 'El nombre es obligatorio.'
    },
    value => {
      if (value?.length <= 32) return true

      return 'El nombre debe tener máximo 32 caracteres.'
    },
  ]
  const race = ref('')
  const raceRules = [
    value => {
      if (value) return true

      return 'La raza es obligatoria.'
    },
    value => {
      if (value?.length <= 32) return true

      return 'La raza debe tener máximo 32 caracteres.'
    },
  ]
  const gender = ref(null)
  const genders = [{
    title: 'Macho',
    value: 1
  }, {
    title: 'Hembra',
    value: 2
  }]
  const genderRules = [
    value => {
      if (value) return true

      return 'El género es obligatorio.'
    }
  ]
  const type = ref(null)
  const types = [{
    title: 'Felino',
    value: 1
  }, {
    title: 'Canino',
    value: 2
  }]
  const typeRules = [
    value => {
      if (value) return true

      return 'El tipo de mascota es obligatorio.'
    }
  ]
  const age = ref('')
  const ageRules = [
    value => {
      if (value) return true

      return 'El edad es obligatoria.'
    },
  ]
  const vaccines = ref('')
  const vaccinesRules = [
    value => {
      if (value) return true

      return 'Debe seleccionar una opción.'
    },
  ]
  const no_vaccines_reason = ref('')
  const sterilized = ref('')
  const sterilizedRules = [
    value => {
      if (value) return true

      return 'Debe seleccionar una opción.'
    },
  ]
  const no_sterilized_reason = ref('')

  async function createMascot() {
    if (valid.value) {
      await $fetch(`/api/mascot`, {
        method: "POST",
        body: {
          name: name.value,
          race: race.value,
          gender: gender.value,
          type: vaccines.value ? 1 : 0,
          age: age.value,
          vaccines: vaccines.value === 'Si' ? 1 : 0,
          no_vaccines_reason: no_vaccines_reason.value,
          sterilized: sterilized.value === 'Si' ? 1 : 0,
          no_sterilized_reason: no_sterilized_reason.value,
          adopted_status: 1,
          person_id: person.value.data.id
        }
      })
      navigateTo(`/person/${person.value.data.dni}`)
    }
  }
</script>