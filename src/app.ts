import express from 'express';

const app = express();

app.use(express.json());

app.post('/employees', (_req, res) => {
    res.status(201).json({ message: 'Employee created' });
});

export default app;
