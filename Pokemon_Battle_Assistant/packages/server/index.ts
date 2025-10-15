// set up express
import express from 'express';
const app = express();

// middlewares
app.use(express.json());

// // set up routes
import pokemonRoute from './routes/pokemonRouter';
app.use('/api/v1/team', pokemonRoute);

// start up server
const port = process.env.Port || 3000;
const start = async () => {
    try {
        // await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
};
start();
