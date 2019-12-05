// code away!
require('dotenv').config();
const server = require('./server');
const postRouter = require('./posts/postRouter')
server.use('/api/posts', postRouter)
const port = process.env.PORT || 8080
const onServerStart = (message) => console.log(`${message}`);

server.listen(port, onServerStart(`Server running on port ${port} successfully.`));