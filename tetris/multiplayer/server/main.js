// Minimal amount of secure websocket server
const fs = require('fs');
const https = require('https');

const WebSocketServer = require('ws').Server;
const Session = require('./session');
const Client = require('./client');

// read ssl certificate
const privateKey = fs.readFileSync('/root/tetris/multiplayer/server/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/root/tetris/multiplayer/server/fullchain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

//pass in your credentials to create an https server
const httpsServer = https.createServer(credentials);
httpsServer.listen(8083);

const wss = new WebSocketServer({
    server: httpsServer
});

const sessions = new Map;

function createClient(conn, id = createId()) {
    return new Client(conn, id);
}

function createId(len = 6, chars = 'abcdefghjkmnopqrstwxyz0123456789') 
{
    let id = '';
    while (len--) {
        id += chars[Math.random() * chars.length | 0];
    }
    return id;
}

function createSession(id = createId()) {
    if (sessions.has(id)) {
        throw new Error(`session ${id} already exists`);
    }
    const session = new Session(id);
    console.log('creating session', session);

    sessions.set(id, session);

    return session;
}

function getSession(id) {
    return sessions.get(id);
}

function broadcastSession(session) {
    const clients = [...session.clients];
    clients.forEach(client => {
        client.send({
            type: 'session-broadcast',
            peers: {
                you: client.id,
                clients: clients.map(client => {
                    return {
                        id: client.id,
                        state: client.state,
                    }
                }),
            },
        });
    })
}

wss.on('connection', function connection(conn) {
    console.log('client connected');
    const client = createClient(conn);


    conn.on('message', function incoming(message) {
        console.log('message received', message);
        const data = JSON.parse(message);


        if (data.type === 'create-session') {
            const session = createSession();
            session.join(client);

            client.state = data.state;
            client.send({
                type: 'session-created',
                id: session.id,
            });
        } else if (data.type === 'join-session') {
            const session = getSession(data.id) || createSession(data.id);
            session.join(client);

            client.state = data.state;
            broadcastSession(session);
        } else if (data.type === 'state-update') {
            const [prop, value] = data.state;
            client.state[data.fragment][prop] = value;
            client.broadcast(data);
        }

    });

    conn.on('close', () => {
        console.log('connection closed');
        const session = client.session;
        if (session) {
            session.leave(client);
            if (session.clients.size === 0) {
                sessions.delete(session.id);
                console.log('session ' + session.id + ' deleted');
            }
        }

        broadcastSession(session);
    });

});