import { sql } from '~~/server/db';

export type MascotModel = {
  id: number;
  name: string;
  race: string;
  gender: number;
  type: number;
  age: number;
  vaccines: number;
  no_vaccines_reason: string;
  sterilized: number;
  no_sterilized_reason: string;
  adopted_status: number;
  person_id: number;
};

export const read = async () => {
  const result = await sql({
    query: 'SELECT * FROM mascots'
  });

  return result as MascotModel[];
}

export const detail = async (id: string) => {
  const result = (await sql({
    query: 'SELECT * FROM mascots WHERE id = ?',
    values: [id]
  })) as MascotModel[];

  return result.length === 1 ? result[0] : null;
}

export const create = async (data: Pick<MascotModel, 'name' | 'race' | 'gender' | 'type' | 'age' | 'vaccines' | 'no_vaccines_reason' | 'sterilized' | 'no_sterilized_reason' | 'adopted_status' | 'person_id'>) => {
  const result = (await sql({
    query: `
      INSERT INTO mascots (
        name,
        race,
        gender,
        type,
        age,
        vaccines,
        no_vaccines_reason,
        sterilized,
        no_sterilized_reason,
        adopted_status,
        person_id
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )
    `,
    values: [
      data.name,
      data.race,
      data.gender,
      data.type,
      data.age,
      data.vaccines,
      data.no_vaccines_reason,
      data.sterilized,
      data.no_sterilized_reason,
      data.adopted_status,
      data.person_id
    ]
  })) as any;

  return result.length === 1 ? (result[0] as MascotModel) : null;
}

export const update = async (id: number, data: Pick<MascotModel , 'name' | 'race' | 'gender' | 'type' | 'vaccines' | 'no_vaccines_reason' | 'sterilized' | 'no_sterilized_reason' | 'adopted_status' | 'person_id'>) => {
  const result = (await sql({
    query: `
      UPDATE mascots
      SET
        name = ?,
        race = ?,
        gender = ?,
        type = ?,
        vaccines = ?,
        no_vaccines_reason = ?,
        sterilized = ?,
        no_sterilized_reason = ?,
        adopted_status = ?,
        person_id = ?
      WHERE id = ?
      RETURNING *
    `,
    values: [
      data.name,
      data.race,
      data.gender,
      data.type,
      data.vaccines,
      data.no_vaccines_reason,
      data.sterilized,
      data.no_sterilized_reason,
      data.adopted_status,
      data.person_id,
      id
    ]
  })) as any;

  return result.length === 1 ? (result[0] as MascotModel) : null;
}