import { Router } from 'https://deno.land/x/oak/mod.ts';
import * as indexCtrl from '../controllers/index.controllers.ts';

const router = new Router();

router.get('/', ({ response }) => {
  response.body = 'Welcome to my API';
});

router.get('/users', indexCtrl.getUsers);

router.get('/user/:id', indexCtrl.getUserById);

router.post('/user', indexCtrl.createUser);

router.put('/user/:id', indexCtrl.updateUserById);

router.delete('/user/:id', indexCtrl.deleteUserById);

export default router;
