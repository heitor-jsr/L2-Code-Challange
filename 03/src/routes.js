const { Router } = require('express');
const router = Router();

const ClientController = require('./app/controllers/ClientsController');

module.exports = router;

router.get(
  '/contacts',
  (request, response, next) => {
    request.appId = 'MeuAppID';
    next();
  },
  ClientController.index,
);

router.get('/clients/:id', ClientController.show);
router.get('/paid', ClientController.paid);
router.get('/indebt', ClientController.inDebt);
router.get('/contract/:id', ClientController.showContract);
router.delete('/clients/:id', ClientController.delete);
router.post('/contract', ClientController.storeContract);
router.post('/clients', ClientController.store);
router.put('/clients/:id', ClientController.update);
router.post('/payments', ClientController.store);

