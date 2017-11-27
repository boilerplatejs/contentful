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
    config(req).then(config => {
        const client = contentful.createClient(config);

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