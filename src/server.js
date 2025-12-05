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
const projectRoute = require('./routes/projectRoute.js');
const projectCategoryRouter = require('./routes/projectCategoryRoute.js');
const projectMemberRouter = require('./routes/projectMemberRoute.js');
const adminRouter = require('./routes/adminRoute.js');
const logsRouter = require('./routes/logsRoute.js');
const bannerRouter = require('./routes/bannerRoute.js');
const statisticRoute = require('./routes/statisticRoute.js');
const path = require('path');
const swagger =require('./docs/swagger.js');

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
app.use('/api/project', projectRoute);
app.use('/api/project_category', projectCategoryRouter);
app.use('/api/project_member', projectMemberRouter);
app.use('/api/admin', adminRouter);
app.use('/api/logs', logsRouter);
app.use('/api/banner', bannerRouter);
app.use('/api/statistics', statisticRoute);


app.use('/img', express.static(path.join(__dirname, process.env.IMG_DIR || 'img')));

swagger(app);
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
