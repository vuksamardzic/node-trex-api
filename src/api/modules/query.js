import merge from 'lodash.merge';

export const controllers = {
  createOne(model, body) {
    return model.create(body);
  },
  updateOne(doc, body) {
    merge(doc, body);
    return doc.save();
  },
  deleteOne(doc) {
    console.log('controllers delete one');
    return doc.remove();
  },
  getOne(doc) {
    return doc;
  },
  getAll(model) {
    return model.find({}).exec();
  },
  findByParam(model, id) {
    return model.findById(id).exec();
  }
};

export const createOne = (model) => (req, res, next) => {
  return controllers.createOne(model, req.body)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error));
};

export const updateOne = (model) => (req, res, next) => {
  const docToUpdate = req.doc;
  const update = req.body;

  return controllers.updateOne(docToUpdate, update)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error));
};

export const deleteOne = (model) => (req, res, next, id) => {
  console.log(req.params, ' <- params!');
  return controllers.deleteOne(req.doc)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error));
};

export const getOne = (model) => (req, res, next) => {
  return controllers.getOne(req.doc)
    .then(doc => res.status(200).json(doc))
    .catch(error => next(error));
};

export const getAll = (model) => (req, res, next) => {
  return controllers.getAll(model)
    .then(docs => res.json(docs))
    .catch(error => next(error));
};

export const findByParam = (model) => (req, res, next, id) => {
  console.log(id, ' <- id');
  return controllers.findByParam(model, id)
    .then(doc => {
      if (!doc) {
        next(new Error('Doc Not Found'));
      } else {
        req.doc = doc;
        console.log(doc.name);
        next();
      }
    })
    .catch(error => {
      next(error);
    });
};

export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    createOne: createOne(model),
    getAll: getAll(model),
    findByParam: findByParam(model),
    getOne: getOne(model),
    updateOne: updateOne(model),
    deleteOne: deleteOne(model)
  };

  return { ...defaults, ...overrides };
};
