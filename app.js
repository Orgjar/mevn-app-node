import express, {json, urlencoded} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

const history = require('connect-history-api-fallback');
app.use(history);
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 3000!');
});

