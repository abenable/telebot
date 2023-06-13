import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send('welcome to my telegram api');
});

export { router as teleRouter };
