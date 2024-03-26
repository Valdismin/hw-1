import {app} from './app'
import {SETTINGS} from './settings'
import {connectToDB} from "./db/mongo-db";


const start = async () => {


    if (!await connectToDB()) {
        console.log('..failed to connect to db')
        process.exit(1)
    }
    app.listen(SETTINGS.PORT, () => {
        console.log(`..server started on port ${SETTINGS.PORT}`)
    })
}
start()
