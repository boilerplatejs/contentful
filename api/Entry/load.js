import async from '@vitruvian-tech/app-studio-core/helpers/Promise';
import contentful from 'contentful';

export default async((req, params, resolve, reject) => {
    req.api.get(`/@vitruvian-tech/app-studio-core/Config/api?bundle=@vitruvian-tech/app-studio-contentful`).then(settings => {
    const client = contentful.createClient(settings);

    client.getEntry(params[0])
        .then((entry) => {
          resolve(entry.fields);
        }, (err) => {
          if (err.sys.id === 'NotFound') {
            reject(err);
          } else {
            console.error(err);
            reject(err);
          }
        });
  });
});
