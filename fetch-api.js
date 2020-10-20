'use strict'

const axios = require('axios').default
const db = require('./src/helpers/db')
const pkg = require('./package.json')
const yargs = require('yargs')
  .options('depth', { type: 'number', demandOption: false, desc: 'max number of pages to fetch' })
  .options('start', { type: 'number', demandOption: false, desc: 'start page', default: 1 })
  .option('url', { type: 'string', default: 'https://reqres.in/api/users', desc: 'url to fetch' })
  .version(pkg.version)
  .help()

const User = require('./src/models/db/user')

const main = async () => {
  try {
    let { depth, url: baseURL, start } = yargs.argv
    const client = axios.create({ baseURL, headers: { 'Accept': 'application/json' } })

    await db.authenticate()
    await db.sync()

    let page = start
    do {
      const { data: res } = await client.get('', { params: { page } })
      if (!depth) depth = res.total_pages // if depth not provided fetch all pages
      if (depth > res.total_pages) depth = res.total_pages // do not exceed total pages

      const users = res.data.map(u => ({
        uid: u.id,
        email: u.email,
        firstName: u.first_name,
        lastName: u.last_name,
        avatar: u.avatar
      }))

      if (users.length > 0) {
        await User.bulkCreate(users, {
          updateOnDuplicate: ['email', 'firstName', 'lastName', 'avatar']
        })
        console.info(users.length + ' rows inserted/updated')
      }

      page++
    } while (page <= depth)

    await db.close()
  } catch (err) {
    console.error(err)
  }
}

main()
