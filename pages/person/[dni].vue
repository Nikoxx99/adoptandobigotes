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
            <v-btn color="orange-lighten-1" class="mr-2" rounded="lg">Editar persona</v-btn>
            <v-btn color="blue-lighten-1" rounded="lg">Agregar Mascota</v-btn>
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
  const { $mysql } = useNuxtApp()
  const [results] = await $mysql.query(`
    SELECT person.*, 
      mascots.id AS mascot_id, 
      mascots.name AS mascot_name, 
      mascots.race AS mascot_race, 
      mascots.gender AS mascot_gender, 
      mascots.type AS mascot_type, 
      mascots.age AS mascot_age, 
      mascots.vaccines AS mascot_vaccines, 
      mascots.no_vaccines_reason AS mascot_no_vaccines_reason, 
      mascots.sterilized AS mascot_sterilized, 
      mascots.no_sterilized_reason AS mascot_no_sterilized_reason, 
      mascots.adopted_status AS mascot_adopted_status
    FROM person  
    LEFT JOIN mascots ON person.id = mascots.person_id
    WHERE person.dni = ${route.params.dni};
  `);

  let personWithMascots = {
    mascots: []
  }; // Objeto para almacenar los datos de la persona y sus mascotas

  results.forEach(result => {
    // Chequeamos si el objeto ya tiene datos de persona, sino los añadimos
    if (!personWithMascots.id) {
      personWithMascots.id = result.id;
      personWithMascots.name = result.name;
      personWithMascots.dni = result.dni;
      personWithMascots.address = result.address;
      personWithMascots.neighborhood = result.neighborhood;
      personWithMascots.city = result.city;
      personWithMascots.phone = result.phone;
      personWithMascots.sisben_group = result.sisben_group;
    }

    // Solo añadimos mascota si hay un mascot_id (indicando que realmente existe una mascota asociada)
    if (result.mascot_id) {
      const mascot = {
        id: result.mascot_id,
        name: result.mascot_name,
        race: result.mascot_race,
        gender: result.mascot_gender,
        type: result.mascot_type,
        age: result.mascot_age,
        vaccines: result.mascot_vaccines,
        no_vaccines_reason: result.mascot_no_vaccines_reason,
        sterilized: result.mascot_sterilized,
        no_sterilized_reason: result.mascot_no_sterilized_reason,
        adopted_status: result.mascot_adopted_status
      };
      personWithMascots.mascots.push(mascot);  // Añadir la mascota al array de mascotas
    }
  });
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