import { museumData, workData } from './types';

export const museums: museumData[] = [
   {
      name: 'Louvre',
      city: 'Paris',
   },
   {
      name: 'Rijksmuseum',
      city: 'Amsterdam',
   },
   {
      name: ' National Art Center',
      city: 'Tokyo',
   },
   {
      name: 'National Gallery of Canada',
      city: 'Ottawa',
   },
   {
      name: 'Tate Modern',
      city: 'London',
   },
   {
      name: 'Museo Nacional Del Prado',
      city: 'Madrid',
   },
];

export const works: workData[] = [
   {
      name: 'Mona Lisa',
      picture:
         'https://uploads0.wikiart.org/00339/images/leonardo-da-vinci/mona-lisa-c-1503-1519.jpg',
      museumId: 1,
   },
   {
      name: 'The Wedding at Cana',
      picture:
         'https://upload.wikimedia.org/wikipedia/commons/e/e0/Paolo_Veronese_008.jpg',
      museumId: 1,
   },
   {
      name: 'The Night Watch',
      picture:
         'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/1200px-The_Night_Watch_-_HD.jpg',
      museumId: 2,
   },
   {
      name: 'The Death of General Wolfe',
      picture:
         'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Benjamin_West_005.jpg/1200px-Benjamin_West_005.jpg',
      museumId: 4,
   },
   {
      name: 'The Weeping Woman',
      picture:
         'https://upload.wikimedia.org/wikipedia/en/1/14/Picasso_The_Weeping_Woman_Tate_identifier_T05010_10.jpg',
      museumId: 5,
   },
   {
      name: 'Las Meninas',
      picture:
         'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg/1200px-Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg',
      museumId: 6,
   },
   {
      name: 'Charles IV of Spain and His Family',
      picture:
         'https://upload.wikimedia.org/wikipedia/commons/5/55/La_familia_de_Carlos_IV.jpg',
      museumId: 6,
   },
];
