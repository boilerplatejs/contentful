import {settings} from '../../../../../src/Config';
import async from '@vitruvian-tech/app-studio-core/helpers/Promise';
import contentful from 'contentful';

export default async((req, params, resolve, reject) => {
  const client = contentful.createClient(settings['@vitruvian-tech/app-studio-contentful']);

  client.getEntry(params[0])
    .then((entry) => {
      resolve(entry.fields);
    }, (err) => {
      if (err.sys.id === 'NotFound') {
        reject(err);
      } else {
        console.log(err);
        reject(err);
      }
    });
});
