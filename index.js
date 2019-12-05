// code away!
require('dotenv').config();
const server = require('./server');
const postRouter = require('./posts/postRouter')
server.use('/api/posts', postRouter)

const onServerStart = (message) => console.log(`${message}`);

server.listen(process.env.PORT || 8080, onServerStart('Server running on port 4000 successfully.'));