const express = require('express');
const session = require('express-session');
const axios = require('axios');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const config = {
    clientId: "1496127569039458416",
    clientSecret: "21fLTNoKwp,fq7DCpebOuTe6uptiO-R8",
    token: "MTQ5NjEyNzU2OTAzOTQ1ODQxNg.G1amT3.IRYflqrRQvKLEn20AblohVXuh6p4FQ-luavJSY",
    guildId: "1242146950156947507",
    redirectUri: "http://localhost:3000/callback"
};

let storeData = {
    name: "NEXUS",
    products: [
        { id: 1, name: "Bot Pack", price: 8.5, icon: "fa-robot" },
        { id: 2, name: "Website", price: 10.0, icon: "fa-code" },
        { id: 3, name: "Cyber Security", price: 5.0, icon: "fa-shield-halved" },
        { id: 4, name: "Custom Server", price: 7.3, icon: "fa-server" }
    ],
    bannedIPs: [],
    logs: []
};

app.use(session({ secret: 'nexus_key', resave: false, saveUninitialized: true }));
app.use(express.static('public'));
app.use(express.json());

app.get('/login', (req, res) => {
    const url = `https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&response_type=code&scope=identify`;
    res.redirect(url);
});

app.get('/callback', (req, res) => { res.redirect('/?admin=true'); });

io.on('connection', (socket) => {
    socket.emit('init', storeData);
    socket.on('updateStore', (d) => { storeData = d; io.emit('init', storeData); });
});

server.listen(3000, () => console.log('Nexus running...'));