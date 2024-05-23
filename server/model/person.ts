import { sql } from '~~/server/db';

interface PersonModel {
  id: number;
  name: string;
  dni: string;
  address: string;
  neighborhood: string;
  city: string;
  phone: string;
  email: string;
  sisben_group: string;
  created_at: string;
  updated_at: string;
  mascots: MascotModel[];
}

interface MascotModel {
  id: number;
  name: string;
  race: string;
  gender: string;
  type: string;
  age: number;
  vaccines: boolean;
  no_vaccines_reason?: string;
  sterilized: boolean;
  no_sterilized_reason?: string;
  adopted_status: boolean;
}

export const read = async () => {
  const result = await sql({
    query: 'SELECT * FROM person'
  });

  return result as PersonModel[];
};

export const detail = async (dni: string): Promise<PersonModel | null> => {
  const results = await sql({
    query: `SELECT person.*, 
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
    WHERE person.dni = ?`,
    values: [dni]
  });

  if (results && Array.isArray(results) && results.length === 0) {
    return null; // No results for the provided dni
  }

  // Initialize person with first result
  const personWithMascots: PersonModel = {
    ...(results[0] as PersonModel),
    mascots: []
  };

  // Iterate through results and collect mascots
  results.forEach(result => {
    if (result.mascot_id) {
      const mascot: MascotModel = {
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
      personWithMascots.mascots.push(mascot);
    }
  });

  return personWithMascots;
};

export const create = async (data: Pick<PersonModel, 'name' | 'dni' | 'address' | 'neighborhood' | 'city' | 'phone' | 'email' | 'sisben_group' | 'created_at'>) => {
  const result = (await sql({
    query: `
      INSERT INTO person (
        name,
        dni,
        address,
        neighborhood,
        city,
        phone,
        email,
        sisben_group,
        created_at
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        NOW()
      )
    `,
    values: [
      data.name,
      data.dni,
      data.address,
      data.neighborhood,
      data.city,
      data.phone,
      data.email,
      data.sisben_group,
      data.created_at
    ]
  })) as any;

  const lastInsertDni = (await sql({
    query: 'SELECT dni FROM person ORDER BY id DESC LIMIT 1',
  })) as any;

  return lastInsertDni[0].dni;
};

export const update = async (id: number, data: Pick<PersonModel, 'name' | 'dni' | 'address' | 'neighborhood' | 'city' | 'phone' | 'email' |'sisben_group' | 'updated_at'>) => {
  const result = (await sql({
    query: `
      UPDATE person
      SET
        name = ?,
        dni = ?,
        address = ?,
        neighborhood = ?,
        city = ?,
        phone = ?,
        email = ?,
        sisben_group = ?,
        updated_at = ?
      WHERE id = ?
    `,
    values: [
      data.name,
      data.dni,
      data.address,
      data.neighborhood,
      data.city,
      data.phone,
      data.email,
      data.sisben_group,
      data.updated_at,
      id
    ]
  })) as any;

  return data.dni;
};