import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export const connect = () => mongoose.connect('mongodb://vs:e1392781243@ds117070.mlab.com:17070/trex');
