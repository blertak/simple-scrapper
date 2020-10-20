'use strict'

const db = require('./src/helpers/db')
const pkg = require('./package.json')
const puppeteer = require('puppeteer-core')
const yargs = require('yargs')
  .options('browser', { type: 'string', demandOption: false, desc: 'browser executable path', default: '/usr/bin/google-chrome-stable' })
  .version(pkg.version)
  .help()

const Performance = require('./src/models/db/performance')

const main = async () => {
  try {
    await db.authenticate()
    await db.sync()

    const browser = await puppeteer.launch({
      headless: true,
      executablePath: yargs.argv.browser,
      args: ['--start-maximized'],
      devtools: false
    })

    const page = await browser.newPage()
    await page.goto('https://develop.pub.afflu.net')
    await page.setViewport({ width: 1366, height: 768 })
    await page.$eval('.login-form input[type=email]', el => { el.value = 'developertest@affluent.io' })
    await page.$eval('.login-form input[type=password]', el => { el.value = 'SOpcR^37' })
    await page.click('.login-form .form-actions .btn.green.uppercase')
    await page.waitForNavigation({ waitUntil: 'networkidle0' })
    await page.click('.page-content-body [data-name=dates] a')

    await page.waitFor(4000)
    await page.click('#dashboard-report-range')
    await page.$eval('input[name="daterangepicker_start"]', el => { el.value = '' })
    await page.$eval('input[name="daterangepicker_end"]', el => { el.value = '' })
    await page.waitFor(500)
    await page.type('input[name="daterangepicker_start"]', '04/01/2020')
    await page.type('input[name="daterangepicker_end"]', '04/30/2020')
    await page.waitFor(500)
    await page.click('.range_inputs .applyBtn')

    await page.waitFor(4000)
    const elem = await page.$('.pagination li:nth-child(8)')
    await elem.focus()

    const records = []
    let end = false

    do {
      const structuredData = await page.$eval('table[data-url="dates"] tbody', async (tbody) => {
        const structuredData = []
        const nodes = tbody.childNodes

        nodes.forEach(node => {
          const td = node.querySelectorAll('td')

          const date = new Date(td[0].firstChild.innerText).toISOString()
          const commissions = parseFloat(td[1].innerText.replace('$', '').replace(',', ''))
          const sales = parseInt(td[2].innerText.replace('$', '').replace(',', ''))
          const leads = parseInt(td[3].innerText.replace('$', '').replace(',', ''))
          const clicks = parseInt(td[4].innerText.replace('$', '').replace(',', ''))
          const epc = parseInt(td[5].innerText.replace('$', '').replace(',', ''))
          const impressions = parseInt(td[6].innerText.replace('$', '').replace(',', ''))
          const cr = parseFloat(td[7].innerText.replace('$', '').replace(',', ''))

          structuredData.push({
            date, commissions, sales, leads, clicks, epc, impressions, cr
          })
        })

        return structuredData
      })

      records.push(...structuredData)

      end = await page.$eval('.pagination li:nth-child(8)', (el) => el.classList.contains('disabled'))
      elem.click()
      await page.waitFor(3000)
    } while (!end)

    await browser.close()

    await Performance.bulkCreate(records, {
      updateOnDuplicate: ['commissions', 'sales', 'leads', 'clicks', 'epc', 'impressions', 'cr']
    })

    await db.close()
  } catch (err) {
    console.error(err)
  }
}

main()
