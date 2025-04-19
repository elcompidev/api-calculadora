const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const calculationRoutes = require('./routes/calculate.routes');
const historyRoutes = require('./routes/history.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const errorHandler = require('./middlewares/error.middleware');
const User = require('./models/user.model');
const Operation = require('./models/operation.model');

dotenv.config();
const app = express();

app.use(express.json());

// Rutas base
app.use('/api/auth', authRoutes);
app.use('/api/calculate', calculationRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Prueba de conexión DB
sequelize.authenticate().then(() => {
    console.log('Conexión establecida BD.');
}).catch(err => {
    console.error('Error de conexión BD: ', err);
});

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch(err => {
        console.error('Error sincronizando modelos:', err);
    });

app.use(errorHandler);


// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Aplicacion en http://localhost:${PORT}`);
    console.log(`Documentaciòn en http://localhost:${PORT}/api/docs`);
    console.log(`Ya puedes usar la app`);
});