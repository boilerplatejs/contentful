import async from '@vitruvian-tech/app-studio-core/helpers/Promise';
import contentful from 'contentful';

const format = data => {
  return data.items[0].fields.members.map(member => {
    return {
      name: member.fields.name,
      title: member.fields.title.join(', ')
    };
  });
};

export default async((req, params, resolve, reject) => {
  req.api.get(`/@vitruvian-tech/app-studio-core/Config/api?bundle=@vitruvian-tech/app-studio-contentful`).then(settings => {
    const client = contentful.createClient(settings);
    const type = params[0];

    if (!type) {
      reject(new Error('[Contentful] Entry: \'type\' parameter is required.'));
    }

    client.getEntries({content_type: type})
        .then((entry) => {
          resolve(format(entry));
        }, (err) => {
          console.log(err);
          reject(err);
        });
  });
});
