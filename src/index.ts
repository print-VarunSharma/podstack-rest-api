import createServer from './utils/server.utils';
const app = createServer();
const PORT = process.env.PORT || 5500;

// start the express server
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Play App API Server started on PORT: ${PORT}`);
});
