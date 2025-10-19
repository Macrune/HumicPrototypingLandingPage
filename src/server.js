const express = require('express');
const dotenv = require('dotenv');
const staffRouter = require('./routes/staffRoute.js');
const partnerRouter = require('./routes/partnerRoute.js');
const announcementRouter = require('./routes/announcementRoute.js');
const agendaRouter = require('./routes/agendaRoute.js');
const newsRouter = require('./routes/newsRoute.js');
const internRouter = require('./routes/internRoute.js');
const testimonyRouter = require('./routes/testimonyRoute.js');
const categoryRouter = require('./routes/categoryRoute.js');
const path = require('path');

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/staff', staffRouter);
app.use('/api/partners', partnerRouter);
app.use('/api/pengumuman', announcementRouter);
app.use('/api/agenda', agendaRouter);
app.use('/api/berita', newsRouter);
app.use('/api/intern', internRouter);
app.use('/api/testimony', testimonyRouter);
app.use('/api/category', categoryRouter);
app.use('/img', express.static(path.join(__dirname, process.env.IMG_DIR || 'img')));

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
