import express from 'express';
import cors from 'cors';
import {
   createMuseum,
   createWork,
   getAllMuseums,
   getAllWorks,
   getMuseumBySpecific,
   getWorkBySpecific,
   getWorksBySpecific,
   updateWorkMuseum,
} from './dbFunctions';
let i = 0;
function logRequestInfo(req: any, res: any, uOrP: string): void {
   let today = new Date();
   let hours =
      today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
   let minutes =
      today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
   let seconds =
      today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
   let time = hours + ':' + minutes + ':' + seconds;

   console.log(
      time +
         '  ' +
         req.method +
         ' (' +
         i +
         ') ' +
         res.statusCode +
         '  ' +
         req[uOrP]
   );
   i++;
}

const PORT = 3009;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/museums', (req, res) => {
   logRequestInfo(req, res, 'url');
   const museums = getAllMuseums();
   for (const museum of museums) {
      museum.works = getWorksBySpecific(museum.id, 'museumId');
   }
   res.send(museums);
   logRequestInfo(req, res, 'url');
});

app.get('/museums/:id', (req, res) => {
   logRequestInfo(req, res, 'url');
   const museum = getMuseumBySpecific(req.params.id, 'id');
   if (museum) {
      const worksOfMuseum = getWorksBySpecific(museum.id, 'museumId');
      museum.works = worksOfMuseum;
      res.send(museum);
      logRequestInfo(req, res, 'url');
      return;
   }
   res.status(404).send({
      error: 'A museum with id ' + req.params.id + ` doesn't exist.`,
   });
   logRequestInfo(req, res, 'url');
});

app.get('/works/:id', (req, res) => {
   const id = req.params.id;
   logRequestInfo(req, res, 'path');
   const work = getWorkBySpecific(id, 'id');
   if (work) {
      const museumOfWork = getMuseumBySpecific(work.museumId, 'id');
      work.museum = museumOfWork;
      res.send(work);
      logRequestInfo(req, res, 'url');
      return;
   }
   res.status(404).send({
      error: 'A work with id ' + req.params.id + ` doesn't exist.`,
   });
   logRequestInfo(req, res, 'url');
});

app.get('/works', (req, res) => {
   const works = getAllWorks();
   for (const work of works) {
      work.museum = getMuseumBySpecific(work.museumId, 'id');
   }
   res.send(works);
   logRequestInfo(req, res, 'url');
});

app.post('/museums', (req, res) => {
   const { name, city } = req.body;

   const errors = [];

   if (typeof name !== 'string') errors.push('Name should be a string.');
   if (typeof city !== 'string') errors.push('City should be a string.');

   if (errors.length === 0) {
      const result = createMuseum(name, city);
      res.status(201).send(
         getMuseumBySpecific(Number(result.lastInsertRowid), 'id')
      );
      logRequestInfo(req, res, 'url');
      return;
   }
   res.status(400).send(errors);
   logRequestInfo(req, res, 'url');
});

app.post('/works', (req, res) => {
   const { name, picture, museumName, museumCity } = req.body;

   const errors = [];

   if (typeof name !== 'string') errors.push('Name should be a string.');
   if (typeof picture !== 'string') errors.push('Picture should be a string.');
   if (typeof museumName !== 'string')
      errors.push(`Museum name should be a string.`);
   if (typeof museumCity !== 'string')
      errors.push(`Museum City should be a string.`);

   if (errors.length === 0) {
      const museum = getMuseumBySpecific(museumName, 'name');
      if (museum) {
         const result = createWork(name, picture, museum.id);
         const work = getWorkBySpecific(Number(result.lastInsertRowid), 'id');
         const workMuseum = getMuseumBySpecific(work.museumId, 'id');
         work.museum = workMuseum;
         res.status(201).send(work);
         logRequestInfo(req, res, 'url');
         return;
      } else {
         const newMuseumResult = createMuseum(museumName, museumCity);
         const result = createWork(
            name,
            picture,
            Number(newMuseumResult.lastInsertRowid)
         );
         const work = getWorkBySpecific(Number(result.lastInsertRowid), 'id');
         const workMuseum = getMuseumBySpecific(work.museumId, 'id');
         work.museum = workMuseum;
         res.status(201).send(work);
         logRequestInfo(req, res, 'url');
         return;
      }
   }
   res.status(400).send(errors);
   logRequestInfo(req, res, 'url');
});

app.patch('/works/:id', (req, res) => {
   const id = +req.params.id;
   const { museumId } = req.body;
   const work = getWorkBySpecific(id, 'id');
   if (
      work &&
      typeof parseInt(museumId) === 'number' &&
      !Number.isNaN(parseInt(museumId))
   ) {
      updateWorkMuseum(museumId, id);
      work.museumId = museumId;
      res.send(work);
      logRequestInfo(req, res, 'url');
      return;
   }
   res.status(404).send({ error: `Work with id ${id} doesn't exist, museumId not a number or key doesnt exist.` });
   logRequestInfo(req, res, 'url');
   return;
});

app.listen(PORT, () => {
   return console.log(`Server.ts started on port ${PORT}`);
});
