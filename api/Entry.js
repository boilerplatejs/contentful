import async from '@vitruvian-tech/app-studio-core/lib/Promise';
import {toCamelCase} from '@vitruvian-tech/app-studio-core/lib/Sequelize';
import contentful from 'contentful';

const config = req => req.api.get(`/@vitruvian-tech/app-studio-core/Config/api?bundle=@vitruvian-tech/app-studio-contentful`);

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
        const client = contentful.createClient(toCamelCase(config));
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
        const client = contentful.createClient(toCamelCase(config));

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