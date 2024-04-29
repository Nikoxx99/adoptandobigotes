import { H3Event } from 'h3';

import * as PersonModel from '~~/server/model/person';

export const read = async () => {
  try {
    const result = await PersonModel.read();

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
    const result = await PersonModel.detail(evt.context.params?.id as unknown as string);

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const create = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const result = await PersonModel.create({
      name: body.name,
      dni: body.dni,
      address: body.address,
      neighborhood: body.neighborhood,
      city: body.city,
      phone: body.phone,
      sisben_group: body.sisben_group
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
    const result = await PersonModel.update(evt.context.params?.id as unknown as number, {
      name: body.name,
      dni: body.dni,
      address: body.address,
      neighborhood: body.neighborhood,
      city: body.city,
      phone: body.phone,
      sisben_group: body.sisben_group
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