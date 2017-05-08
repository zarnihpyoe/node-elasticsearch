const elasticsearch = require('elasticsearch')
const esClient = elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error',
})

const search = function (index, body) {
  return esClient.search({ index, body })
}

const test = function () {
  const body = {
    size: 20,
    from: 0,
    query: {
      match: {
        title: {
          query: 'pariatur quis magna',
          minimum_should_match: 3,
          fuzziness: 2,
        }
      }
    },
  }

  console.log(`retrieving documents whose title matches '${body.query.match.title.query}' (displaying ${body.size} items at a time)...`)
  search('library', body)
    .then(results => {
      console.log(`found ${results.hits.total} items in ${results.took}ms`)
      if (results.hits.total > 0) console.log(`returned article titles:`)
      results.hits.hits.forEach((hit, index) => {
        console.log(`\t${body.from + ++index} - ${hit._source.title} (score: ${hit._score})`)
      })
    })
    .catch(console.error)
}

test()
