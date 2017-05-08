const elasticsearch = require('elasticsearch')
const esClient = elasticsearch.Client({
  host: '127.0.0.1:9200',
  log:'error',
})

const indices = function () {
  return esClient.cat.indices({ v: true })
    .then(console.log)
    .catch(err => console.error(`Error connecting to the es client: ${err}`))
}

const test = function () {
  console.log(`elasticsearch indices information:`)
  indices()
}

test()
