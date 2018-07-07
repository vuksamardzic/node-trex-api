import express from 'express';
import merge from 'lodash.merge';
import { List } from './list.model';

export const listRouter = express.Router({});

listRouter.route('/')
  .get((req, res, next) => {
    List.find({})
      .populate('board')
      .exec()
      .then(docs => res.json(docs))
      .catch(err => next(err));
  });

listRouter.route('/:bid')
  .post((req, res, next) => {
    req.body.board = req.params['bid'];
    List.create(req.body)
      .then(doc => res.json(doc))
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

listRouter.route('/:lid/solo')
  .put((req, res, next) => {
    List.findById(req.params['lid']).exec()
      .then(doc => {
        merge(doc, req.body);
        doc.save();
        res.json(doc);
      })
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    List.findById(req.params['lid']).exec()
      .then(doc => doc.remove()
        .then(d => res.json({ message: `List [${d.name}] was deleted.` }))
        .catch(err => next(err))
      )
      .catch(err => next(err));
  });
