import { H3Event } from 'h3';

import * as MascotModel from '~~/server/model/mascot';

export const read = async () => {
  try {
    const result = await MascotModel.read();

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
}

export const detail = async (evt: H3Event) => {
  try {
    const result = await MascotModel.detail(evt.context.params?.id as unknown as string);

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
}

export const create = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const result = await MascotModel.create({
      name: body.name,
      race: body.race,
      gender: body.gender,
      type: body.type,
      vaccines: body.vaccines,
      no_vaccines_reason: body.no_vaccines_reason,
      sterilized: body.sterilized,
      no_sterilized_reason: body.no_sterilized_reason,
      adopted_status: body.adopted_status,
      person_id: body.person_id
    });

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
}


export const update = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const result = await MascotModel.update(evt.context.params?.id as unknown as number, {
      name: body.name,
      race: body.race,
      gender: body.gender,
      type: body.type,
      vaccines: body.vaccines,
      no_vaccines_reason: body.no_vaccines_reason,
      sterilized: body.sterilized,
      no_sterilized_reason: body.no_sterilized_reason,
      adopted_status: body.adopted_status,
      person_id: body.person_id
    });

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
}