import { useBase, createRouter, defineEventHandler } from 'h3';

import * as personCtrl from '~~/server/controller/person';
import * as mascotCtrl from '~~/server/controller/mascot';

const router = createRouter();

router.get('/person', defineEventHandler(personCtrl.read));
router.post('/person', defineEventHandler(personCtrl.create));
router.get('/person/:id', defineEventHandler(personCtrl.detail));
router.put('/person/:id', defineEventHandler(personCtrl.update));

router.get('/mascot', defineEventHandler(mascotCtrl.read));
router.post('/mascot', defineEventHandler(mascotCtrl.create));
router.get('/mascot/:id', defineEventHandler(mascotCtrl.detail));
router.put('/mascot/:id', defineEventHandler(mascotCtrl.update));

export default useBase('/api', router.handler);