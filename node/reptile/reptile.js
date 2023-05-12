const superagent = require('superagent')
const cheerio = require('cheerio')
module.exports = function reptile(url, cb) {
    superagent.get(url)
        .end((err, res) => {
            let list = []
            if (!err) {
                const $ = cheerio.load(res.text)
                $('img').each((idx, el) => {
                    const $el = $(el)
                    console.log($el.attr('src'))
                    list.push({
                        src: $el.attr('src'),
                        alt: $el.attr('alt'),
                    })
                })
            }
            cb && cb(list)
        })
}