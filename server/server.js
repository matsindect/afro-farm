const mongoose = require('mongoose');
const dotenv = require('dotenv');
const server = require('./app');
dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connection successful');
  });
// START SERVER
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Afroorig now running on port ${port}...`);
});
