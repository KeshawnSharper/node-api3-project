// code away!
const server = require('./server');
const postRouter = require('./posts/postRouter')
server.use('/api/posts', postRouter)

const onServerStart = (message) =>console.log(`${message}`);

server.listen(6000, onServerStart('Server running on port 4000 successfully.'));