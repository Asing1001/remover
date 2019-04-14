const express = require('express')
const Order = require('./schema/order')


const isAuthenticated = (req, res, next) => {
  if (!req.session.authUser) {
    res.status(401).json({ message: '請登入以繼續' })
  } else {
    next()
  }
}

const getLineOrderTemplate = ({
  serviceType,
  pickUpDate,
  pickUpTime,
  pickUpCity,
  pickUpArea,
  pickUpAddress,
  targetCity,
  targetArea,
  targetAddress,
  name,
  phone,
  totalPeople,
  remark
}) =>
  `${serviceType} <br>
  訂位者: ${name} ${phone} 共${totalPeople}人 <br>
  時間: ${pickUpDate} ${pickUpTime} <br>
  地點: ${pickUpCity + pickUpArea + pickUpAddress} <br>
  目的地: ${targetCity + targetArea + targetAddress} <br>
  備註: ${remark}
`

const iftttHookUrl =
  process.env.IFTTT_HOOK ||
  'https://maker.ifttt.com/trigger/order_create_qa/with/key/lxH04WN5F3umyo-llPSK4mOVrHs-wz6JPIsl8Tm5e8y'
const router = express.Router()
router
  .route('/orders')
  .post((req, res) => {
    Order.create(req.body, (err, order) => {
      if (err) {
        res.status(400).json({ message: err })
      } else {
        axios.post(iftttHookUrl, { value1: getLineOrderTemplate(order) })
        res.json({ ok: true, order })
      }
    })
  })
  .get(isAuthenticated, (req, res) => {
    Order.find({}, (err, orders) => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
        res.json({ ok: true, orders })
      }
    })
  })

router
  .use(isAuthenticated)
  .route('/orders/:_id')
  .delete((req, res) => {
    Order.deleteOne({ _id: req.params._id }, err => {
      if (err) {
        res.status(500).json({ message: err })
      } else {
        res.json({ ok: true })
      }
    })
  })
  .put((req, res) => {
    Order.updateOne({ _id: req.params._id }, req.body, (err, order) => {
      if (err) {
        res.status(400).json({ message: err })
      } else {
        res.json({ ok: true, order })
      }
    })
  })

module.exports = router
