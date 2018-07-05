import merge from 'lodash.merge';

const createOne = (model) => (req, res, next) => {
  return model.create(req.body)
    .then(docs => res.json(docs))
    .catch(error => next(error));
};

const readAll = (model) => (req, res, next) => {
  return model.find({}).exec()
    .then(docs => res.json(docs))
    .catch(error => next(error));
};

const readOne = () => (req, res) => {
  return res.json(req.doc);
};

const findById = (model) => (req, res, next, id) => {
  return model.findById(id).exec()
    .then(doc => {
      if (doc) {
        req.doc = doc;
        next();
      } else {
        next(new Error('Doc Not Found'));
      }
    })
    .catch(error => next(error));
};

const updateOne = () => (req, res, next) => {
  merge(req.doc, req.body);
  req.doc.save()
    .then(doc => res.json(doc))
    .catch(error => next(error));
};

const deleteOne = () => (req, res, next) => {
  req.doc.remove()
    .then(doc => res.json({ message: `Board [${doc.name}] was deleted.` }))
    .catch(error => next(error));
};

export const boardController = (model) => {
  return {
    createOne: createOne(model),
    readOne: readOne(),
    readAll: readAll(model),
    findById: findById(model),
    updateOne: updateOne(),
    deleteOne: deleteOne()
  };
};
