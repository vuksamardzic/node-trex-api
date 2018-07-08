import merge from 'lodash.merge';

const createOne = (model) => (req, res, next) => {
  return model.create(req.body)
    .then(docs => res.json(docs))
    .catch(error => next(error));
};

const readAll = (model) => (req, res, next) => {
  return model.find({}).exec()
    .then(docs => {
      const data = docs.map(i => {
        return { _id: i._id, name: i.name };
      });
      res.json(data);
    })
    .catch(error => next(error));
};

const readOne = (model) => (req, res, next) => {
  req.doc
    .populate('lists')
    .execPopulate()
    .then(doc => {
      console.log(doc);
      return res.json({
        _id: doc._id,
        name: doc.name,
        lists: doc.lists
      });
    })
    .catch(err => next(err));

};

const findOne = (model) => (req, res, next, id) => {
  return model.findById(id).exec()
    .then(doc => {
      if (doc) {
        req.doc = doc;
        next();
      } else {
        next(new Error('doc not found.'));
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

const deleteAll = (model) => (req, res, next) => {
  return model.remove()
    .then(docs => res.json({ message: 'Boards dropped.' }))
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
    readOne: readOne(model),
    readAll: readAll(model),
    findOne: findOne(model),
    updateOne: updateOne(),
    deleteAll: deleteAll(model),
    deleteOne: deleteOne()
  };
};
