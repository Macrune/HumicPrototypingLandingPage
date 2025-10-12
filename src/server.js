const express = require('express');
const dotenv = require('dotenv');
const staffRouter = require('./routes/staffRoute.js');
const partnerRouter = require('./routes/partnerRoute.js');
const pengumumanRouter = require('./routes/pengumumanRoute.js');
const agendaRouter = require('./routes/agendaRoute.js');
const beritaRouter = require('./routes/beritaRoute.js');
const path = require('path');

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/staff', staffRouter);
app.use('/api/partners', partnerRouter);
app.use('/api/pengumuman', pengumumanRouter);
app.use('/api/agenda', agendaRouter);
app.use('/api/berita', beritaRouter);
app.use('/img', express.static(path.join(__dirname, process.env.IMG_DIR || 'img')));

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
