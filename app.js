// 設定 express
const express = require('express')
const app = express()
const port = 3000

// 設定 handlebars
const exphdbs = require('express-handlebars')

app.engine('handlebars', exphdbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 載入餐廳清單 JSON 檔
const restaurantList = require('./restaurant.json')

// 設定靜態檔案
app.use(express.static('public'))

// 設定路由
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find((r) => r.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurantSearch = restaurantList.results.filter((r) => r.name.toLowerCase().includes(keyword.toLowerCase()) ||
    r.category.toLowerCase().includes(keyword.toLowerCase()))
  if (restaurantSearch.length === 0) {
    res.render('error', { keyword: keyword })
  } else {
    res.render('index', { restaurants: restaurantSearch, keyword: keyword })
  }
})

// 設定伺服器監聽
app.listen(port, () => {
  console.log(`the express is running on http://localhost:${port}`)
})