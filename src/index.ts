// #!/usr/bin/env node
import express from 'express';

import { router } from './routes';

import cors from 'cors'

const app = express();
const port = 8080;
app.use(express.json());

app.use(cors())

app.get('/', (req, res) => {});

app.use(router);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
