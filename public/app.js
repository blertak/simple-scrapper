let currUserPage = 1
let currPerformancePage = 1

async function loadUsers (page) {
  const query = new URLSearchParams()
  query.set('perPage', 10)
  query.set('page', page)

  const resp = await fetch('http://localhost:8080/api/v1/users?' + query.toString())
  if (!resp.ok) {
    return console.error(resp)
  }

  const json = await resp.json()
  document.getElementById('users-table').innerHTML += json.rows.map(u => `
  <tr>
    <td class="align-middle">${u.uid}</td>
    <td class="align-middle">${u.email}</td>
    <td class="align-middle">${u.firstName}</td>
    <td class="align-middle">${u.lastName}</td>
    <td class="align-middle text-right"><img class="img-avatar" src="${u.avatar}" /></td>
  </tr>
  `).join('\n')
}
async function loadPerformances (page) {
  const query = new URLSearchParams()
  query.set('perPage', 10)
  query.set('page', page)

  const resp = await fetch('http://localhost:8080/api/v1/performances?' + query.toString())
  if (!resp.ok) {
    return console.error(resp)
  }

  const json = await resp.json()
  document.getElementById('performances-table').innerHTML += json.rows.map(u => `
  <tr>
    <td class="align-middle">${u.date}</td>
    <td class="align-middle">${u.commissions}</td>
    <td class="align-middle">${u.sales}</td>
    <td class="align-middle">${u.leads}</td>
    <td class="align-middle">${u.clicks}</td>
    <td class="align-middle">${u.epc}</td>
    <td class="align-middle">${u.impressions}</td>
    <td class="align-middle">${u.cr}</td>
  </tr>
  `).join('\n')
}

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById('load-users').addEventListener('click', async (e) => {
    e.preventDefault()
    currUserPage++
    await loadUsers(currUserPage)
  })
  await loadUsers(currUserPage)

  document.getElementById('load-performances').addEventListener('click', async (e) => {
    e.preventDefault()
    currPerformancePage++
    await loadPerformances(currPerformancePage)
  })
  await loadPerformances(currPerformancePage)
})
