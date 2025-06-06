import app from './app';

const PORT = process.env.PORT || 500;

const start = () => {
    try {
        const server = app.listen(PORT, () => {
            console.log(`server running on ${PORT}`);
        });
        process.on('SIGINT', () => {
            server.close(() => console.log('http server closed'));
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(e.message);
        } else {
            console.error('Unknown error', e);
        }
    }
};

start();
