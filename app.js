import express, {json, urlencoded} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose'
import note from './routes/note'

const app = express();
// const uri = 'mongodb://localhost:27017/mevn';
const uri = 'mongodb+srv://josepabello96:5EBreHln4cfaBhIN@clusterjar-zf1jl.mongodb.net/mevn?retryWrites=true&w=majority';
const options = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true};

app.use(morgan('tiny'));
app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.use('/api', note);

mongoose.connect(uri, options)
  .then(() => {
    console.log('conectado a bd')
  })
  .catch((e) => {
    console.log(e)
  })
;

const history = require('connect-history-api-fallback');
app.use(history);
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 3000!');
});

