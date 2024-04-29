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
          <v-card-title>
            Bienvenido, {{ personWithMascots.name }}
          </v-card-title>
          <v-card-text>
            <h3>Cédula de Ciudadanía: {{ personWithMascots.dni }}</h3>
            <h3>Dirección: {{ personWithMascots.address }}</h3>
            <h3>Barrio: {{ personWithMascots.neighborhood }}</h3>
            <h3>Ciudad: {{ personWithMascots.city }}</h3>
            <h3>Celular con WhatsApp: {{ personWithMascots.phone }}</h3>
            <h3>Correo Electrónico: {{ personWithMascots.email }}</h3>
            <h3>Grupo del Sisben: {{ personWithMascots.sisben }}</h3>
          </v-card-text>
          <v-card-text>
            <v-btn :to="`/person/${personWithMascots.dni}/edit`" color="orange-lighten-1" class="mr-2" rounded="lg">Editar persona</v-btn>
            <v-btn :to="`/person/${personWithMascots.dni}/create-mascot`" color="blue-lighten-1" rounded="lg">Agregar Mascota</v-btn>
          </v-card-text>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="personWithMascots.mascots"
              item-key="name"
              items-per-page="5"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Mascotas</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                </v-toolbar>
              </template>
              <template v-slot:item.gender="{ item }">
                <v-chip color="green" v-if="item.gender === 1">Macho</v-chip>
                <v-chip color="green" v-else>Hembra</v-chip>
              </template>
              <template v-slot:item.type="{ item }">
                <v-chip color="green" v-if="item.type === 1">Felino</v-chip>
                <v-chip color="green" v-else>Canino</v-chip>
              </template>
              <template v-slot:item.age="{ item }">
                <v-chip color="green">{{ item.age }} años</v-chip>
              </template>
              <template v-slot:item.vaccines="{ item }">
                <v-chip color="green" v-if="item.vaccines">Sí</v-chip>
                <v-chip color="red" v-else>No</v-chip>
              </template>
              <template v-slot:item.sterilized="{ item }">
                <v-chip color="green" v-if="item.sterilized">Sí</v-chip>
                <v-chip color="red" v-else>No</v-chip>
              </template>
              <template v-slot:item.adopted_status="{ item }">
                <v-chip color="green" v-if="item.adopted_status">Adoptado</v-chip>
                <v-chip color="red" v-else>No Adoptado</v-chip>
              </template>
            </v-data-table>
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
  const headers = [
    { title: 'Nombre', value: 'name' },
    { title: 'Raza', value: 'race' },
    { title: 'Género', value: 'gender' },
    { title: 'Tipo', value: 'type' },
    { title: 'Edad', value: 'age' },
    { title: 'Vacunas', value: 'vaccines' },
    { title: 'Esterilizado', value: 'sterilized' },
    { title: 'Estado de Adopción', value: 'adopted_status' }
  ];
</script>