import async from '@machete-platform/core-bundle/lib/Promise';
import contentful from 'contentful';

const config = req => req.api.get(`/@machete-platform/core-bundle/Config/api?bundle=@machete-platform/contentful-bundle`);

const format = data => {
    return data.items[0].fields.members.map(member => {
        return {
            name: member.fields.name,
            title: member.fields.title.join(', ')
        };
    });
};

const api = (client, id, method = 'getEntry') => {
    return new Promise((resolve, reject) => {
        client[method](id)
          .then(
            entry => resolve(entry.fields),
            err => {
                if (err.sys.id === 'NotFound') {
                    reject(err);
                } else {
                    console.error(err);
                    reject(err);
                }
            });
    });
};

export const list = async((req, params, resolve, reject) => {
    config(req).then(config => {
        const client = contentful.createClient(config);
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

export const load = async((req, params, resolve, reject) => {
    config(req).then(async (config) => {
        const client = contentful.createClient(config);

        try {
            resolve(await api(client, params[0]));
        } catch(e) {
            reject(e);
        }
    });
});

export const post = async((req, params, resolve, reject) => {
    config(req).then(async (config) => {
        const client = contentful.createClient(config);

        try {
            const fields = await api(client, params[0]);
            const hero = await api(client, fields.hero.sys.id);

            fields.author =  await api(client, fields.author.sys.id);
            fields.hero = hero.file ? { ...hero, ...(await api(client, hero.file.sys.id, 'getAsset')) } : hero;
            fields.content = await Promise.all(fields.content.map(async (content) => {
                content = await api(client, content.sys.id);
                return content.file ? { ...content, ...(await api(client, content.file.sys.id, 'getAsset')) } : content;
            }));

            resolve(fields);
        } catch(e) {
            reject(e);
        }
    });
});