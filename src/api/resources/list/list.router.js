import express from 'express';
import merge from 'lodash.merge';
import { List } from './list.model';
import { Board } from '../board/board.model';
import { Card } from '../card/card.model';

export const listRouter = express.Router({});

listRouter.param('id', (req, res, next, id) => {
  Board.findById(id).exec()
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
listRouter.param('lid', (req, res, next, id) => {
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

listRouter.route('/')
  .get((req, res, next) => {
    List.find({})
      .exec()
      .then(docs => res.json(docs))
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    List.remove()
      .then(doc => res.json({ message: 'Lists dropped.' }))
      .catch(err => next(err));
  });

listRouter.route('/:id')
  .post((req, res, next) => {
    const doc = req.doc;
    const body = req.body;

    List.create(body)
      .then(list => {
        doc.lists.push(list._id);
        return doc.save();
      })
      .then(board => {
        res.json(board);
      })
      .catch(err => next(err));
  })
  .get((req, res, next) => {
    req.doc
      .populate({
        path: 'lists',
        populate: { path: 'cards' }
      })
      .execPopulate()
      .then(doc => {
        const data = {
          _id: doc._id,
          name: doc.name,
          lists: doc.lists.map(d => {
            return {
              _id: d._id,
              name: d.name,
              cards: d.cards.map(c => {
                return {
                  _id: c._id,
                  name: c.name
                };
              })
            };
          })
        };
        res.json(data);
      })
      .catch(err => next(err));
  });

listRouter.route('/:lid')
  .put((req, res, next) => {
    merge(req.doc, req.body);
    req.doc.save()
      .then(doc => res.json(doc))
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    req.doc.remove()
      .then(doc => {
        Card.remove({ list_id: doc._id }).exec();
        res.json({ message: `List [${doc.name}] was deleted.` });
      })
      .catch(err => next(err));
  });
