import async from '@boilerplatejs/core/lib/Promise';
import contentful from 'contentful';

const config = req => req.service.get(`/@boilerplatejs/core/Config/service?bundle=@boilerplatejs/contentful`);
let cache = {};

const format = data => {
    return data.items[0].fields.members.map(member => {
        return {
            name: member.fields.name,
            title: member.fields.title.join(', ')
        };
    });
};

const api = (client, id, method = 'getEntry', meta) => {
    return cache[id] ? Promise.resolve(cache[id]) : new Promise((resolve, reject) => {
        client[method](id)
          .then(
            entry => resolve(cache[id] = meta ? entry : entry.fields),
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

const includePostCollectionAssets = async (client, collection) => {
    const includePostAssets = async (post) => {
        if (post.fields.hero) {
            const hero = post.fields.hero = await api(client, post.fields.hero.sys.id, 'getEntry');

            if (hero.file) {
                post.fields.hero = {
                    ...hero,
                    ...(await api(client, hero.file.sys.id, 'getAsset'))
                };
            }
        }

        return post;
    };

    const includeCollectionAssets = async (collection) => {
        if (collection.hero) {
            const hero = collection.hero = await api(client, collection.hero.sys.id, 'getEntry');

            if (hero.file) {
                collection.hero = {
                    ...hero,
                    ...(await api(client, hero.file.sys.id, 'getAsset'))
                };
            }
        }

        return collection;
    };

    return {
        ...(await includeCollectionAssets(JSON.parse(JSON.stringify(collection)))),
        posts: await Promise.all(collection.posts.map(post => includePostAssets(JSON.parse(JSON.stringify(post))))),
        collections: collection.collections ? await Promise.all(collection.collections.map(collection => includePostCollectionAssets(client, collection.fields))) : undefined
    };
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

export const load = async (req, params) => {
    const client = contentful.createClient(await config(req));
    const id = params[0];

    try {
        return /*cache[id] || */await client.getEntries({ 'sys.id': id })
            .then(entries => {
                return (/*cache[id] = */entries.items[0]);
            }, err => {
                throw err;
            });
    } catch(e) {
        throw e;
    }
};

export const post = async((req, params, resolve, reject) => {
    config(req).then(async (config) => {
        const client = contentful.createClient(config);

        try {
            const entry = await api(client, params[0], 'getEntry', true);
            const fields = { id: entry.sys.id, ...entry.fields };
            const hero = fields.hero ? await api(client, fields.hero.sys.id) : undefined;

            fields.author =  await api(client, fields.author.sys.id);
            fields.hero = hero && hero.file ? { ...hero, ...(await api(client, hero.file.sys.id, 'getAsset')) } : hero;
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

export const posts = async((req, params, resolve, reject) => {
    config(req).then(async (config) => {
        const client = contentful.createClient(config);

        try {
            const collections = (await client.getEntries({ content_type: 'postCollection', order: 'fields.title', 'fields.slug': params[0] })).items;

            resolve(await includePostCollectionAssets(client, params[0] ? collections[0].fields : {
                posts: (await client.getEntries({ content_type: 'article', order: '-fields.published', select: 'sys.id,fields.tags,fields.author,fields.title,fields.published,fields.summary,fields.tagline,fields.hero,fields.slug,fields.area' })).items,
                collections
            }));
        } catch(e) {
            reject(e);
        }
    });
});

export const refresh = async(async (req, params, resolve, reject) => {
    cache = {};
    resolve({});
});