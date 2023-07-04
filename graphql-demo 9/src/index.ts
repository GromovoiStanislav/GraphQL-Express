import app from "./app.js";
import {AppDataSource} from "./db.js";
import {PORT} from "./config.js";

const main = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database initialized')
        await app.listen(PORT);
        console.log(`Express ready at http://localhost:${PORT}`);
        console.log(`Graphql ready at http://localhost:${PORT}/graphql`);
    } catch (error) {
        console.error(error);
    }
};

main();
