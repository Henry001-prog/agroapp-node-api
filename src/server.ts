import express from 'express';
import { connect, ConnectOptions } from 'mongoose';
import requireDir from 'require-dir';
import allowCors from './config/cors';

const app = express();
app.use(express.json());
app.use(allowCors);

runDB();

async function runDB(): Promise<void> {
    await connect(
        'mongodb://localhost:27017/ruralproducts',
        { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions
    );
}

requireDir('./models');

app.use('/api', require('./routes'));

app.listen(3002, () => {
    console.log('Server is running on PORT 3002');
});