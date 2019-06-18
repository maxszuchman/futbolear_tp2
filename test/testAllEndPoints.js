const testGetAll = require('./testGetAll')
const testPostWithBody = require('./testPostWithBody')
const testGetWithIdentifier = require('./testGetWithIdentifier')

const serverUrl = 'http://127.0.0.1:8080/api'

async function main() {
    await testPostWithBody(serverUrl)
    // await testGetWithIdentifier(serverUrl)
    await testGetAll(serverUrl)
}

main()