
class Client 
{
    constructor(conn, id) 
    {
        this.conn = conn;
        this.id = id;
        this.session = null;
        
        this.state = null;
    }

    broadcast(data)
    {
        if (!this.session) {
            throw new Error('cannot broadcast without session');
        }

        data.clientId = this.id;

        this.session.clients.forEach(client => {
            if (this === client) {
                return;
            }
            client.send(data);
        })
    }

    send(data)
    {
        const message = JSON.stringify(data);
        console.log(`sending ${message}`);
        this.conn.send(message, function ack(error) {
            if (error) {
                console.error('message failed', message, error)
            }
        });
    }
}

module.exports = Client;