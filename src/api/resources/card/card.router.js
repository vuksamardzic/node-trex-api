import express from 'express';
import merge from 'lodash.merge';
import { List } from './../list/list.model';
import { Card } from './card.model';

export const cardRouter = express.Router({});

cardRouter.param('id', (req, res, next, id) => {
  List.findById(id).exec()
    .then(doc => {
      if (doc) {
        req.doc = doc;
        next();
      } else {
        next(new Error('doc not found.'));
      }
    })
    .catch(err => next(err));
});

cardRouter.route('/')
  .get((req, res, next) => {
    Card.find({})
      .then(docs => res.json(docs))
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    Card.remove({})
      .then(docs => res.json(docs))
      .catch(err => next(err));
  });

cardRouter.route('/:id')
  .post((req, res, next) => {
    Card.create(req.body)
      .then(doc => {
        req.doc.cards.push(doc._id);
        return req.doc.save();
      })
      .then(list => res.json(list))
      .catch(err => next(err));
  })
  .get((req, res, next) => {
    List.find({ board: req.params['bid'] })
      .populate('board')
      .exec()
      .then(docs => {
        let data = {};
        if (docs && docs.length > 0) {
          data = {
            data: {
              board: {
                _id: docs[0].board._id,
                name: docs[0].board.name
              },
              lists: docs.map(d => {
                return {
                  _id: d._id,
                  name: d.name,
                  done: d.done
                };
              })
            }
          };
        } else {
          data.data = null;
        }
        res.json(data);
      })
      .catch(err => next(err));
  });
