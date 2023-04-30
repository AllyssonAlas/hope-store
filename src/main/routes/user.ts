import { Router } from 'express';

export default (router: Router): void => {
  router.post('/user/create', (req, res) => {
    res.send({ data: 'any_data' });
  });
};
