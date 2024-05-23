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
            <v-btn variant="icon" to="/"><v-icon>mdi-arrow-left</v-icon></v-btn>
            Registre sus datos antes de continuar
          </v-card-title>
          <v-alert v-if="error" type="error">{{ error }}</v-alert>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field v-model="name" :rules="nameRules" label="Nombre Completo" class="mb-2" variant="outlined" hide-details="auto" name="name" required />
              <v-text-field v-model="dni" :rules="dniRules" label="Cédula de Ciudadanía" class="mb-2" variant="outlined" hide-details="auto" name="dni" required />
              <v-text-field v-model="address" :rules="addressRules" label="Direccion" class="mb-2" variant="outlined" hide-details="auto" name="address" required />
              <v-text-field v-model="neighborhood" :rules="neighborhoodRules" label="Barrio" class="mb-2" variant="outlined" hide-details="auto" name="neighborhood" required />
              <v-select
                v-model="city"
                :rules="cityRules"
                label="Ciudad"
                :items="['San Sebastián de Mariquita']"
                variant="outlined"
                hide-details="auto"
                class="mb-2"
              />
              <v-text-field v-model="phone" :rules="phoneRules" label="Celular con WhatsApp" class="mb-2" variant="outlined" hide-details="auto" name="phone" required />
              <v-text-field v-model="email" :rules="emailRules" label="Correo Electrónico" class="mb-2" variant="outlined" hide-details="auto" name="email" required />
              <v-text-field v-model="sisben" :rules="sisbenRules" label="Grupo del Sisben" placeholder="Ejemplo: C10, A1, B12, etc..." variant="outlined" hide-details="auto" name="sisben" required />
            </v-form>
          </v-card-text>
          <v-card-text>
            <v-btn color="orange-lighten-1" rounded="lg" size="x-large" block @click="createPerson">Continuar</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const route = useRoute()
  const dniInQuery = ref(route.query.dni)

  const valid = ref(false)
  const error = ref('')

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
  const dniRules = [
    value => {
      if (value) return true

      return 'El dni es obligatorio.'
    },
    value => {
      if (value?.length <= 32) return true

      return 'El dni debe tener máximo 32 caracteres.'
    },
  ]
  const addressRules = [
    value => {
      if (value) return true

      return 'La dirección es obligatoria.'
    },
    value => {
      if (value?.length <= 32) return true

      return 'La dirección debe tener máximo 32 caracteres.'
    },
  ]
  const neighborhoodRules = [
    value => {
      if (value) return true

      return 'La barrio es obligatorio.'
    },
    value => {
      if (value?.length <= 32) return true

      return 'La barrio debe tener máximo 32 caracteres.'
    },
  ]
  const cityRules = [
    value => {
      if (value) return true

      return 'La ciudad es obligatoria.'
    }
  ]
  const phoneRules = [
    value => {
      if (value) return true

      return 'El teléfono es obligatorio.'
    },
    value => {
      if (value?.length <= 32) return true

      return 'El teléfono debe tener máximo 32 caracteres.'
    },    
  ]
  const emailRules = [
    value => {
      if (value) return true

      return 'El correo electrónico es obligatorio.'
    },
    value => {
      if (value?.length <= 32) return true

      return 'El correo electrónico debe tener máximo 32 caracteres.'
    },
  ]
  const sisbenRules = [
    value => {
      if (value) return true

      return 'El grupo del Sisben es obligatorio.'
    },
    value => {
      if (value?.length <= 32) return true

      return 'El grupo del Sisben debe tener máximo 32 caracteres.'
    },
  ]

  const name = ref('')
  const dni = ref('')
  const address = ref('')
  const neighborhood = ref('')
  const city = ref('')
  const phone = ref('')
  const email = ref('')
  const sisben = ref('')

  if (dniInQuery.value) {
    dni.value = dniInQuery.value
  }

  async function createPerson() {
    if (valid.value) {
      const { data: returnDni } = await $fetch(`/api/person`, {
        method: "POST",
        body: {
          name: name.value,
          dni: dni.value,
          address: address.value,
          neighborhood: neighborhood.value,
          city: city.value,
          phone: phone.value,
          email: email.value,
          sisben_group: sisben.value,
          created_at: new Date().toISOString()
        }
      })
      navigateTo(`/person/${returnDni}`)
    } else {
      error.value = 'Por favor revise los datos que has ingresado.'
    }
  }

</script>