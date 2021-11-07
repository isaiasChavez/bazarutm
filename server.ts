import express from 'express';
import authRouter from './src/routes/auth.route';
import userRouter from './src/routes/user.route';
const app = express();
const port = 3000;

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
app.listen(port, () => {
 /*  if (err) {
    return console.error(err);
  } */
  return console.log(`server is listening on ${port}`);
});