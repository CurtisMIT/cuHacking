const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const port = 3000
const db = require('./queries')
const cors = require('cors')
const { Pool } = require('pg')

let jsonParser = bodyParser.json()

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors())

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API'})
})



epochToUtc = (offset) => {
    let utcSecs = offset
    let date = new Date(0)
    date.setUTCSeconds(utcSecs)
    date.toString()
    return date
}

convert = (data) => {
    let arr = []
    let timeframes = Object.keys(data)
    let len = timeframes.length
    for (let i = 0; i < len; i++) {
        timeframes[i] = timeframes[i]
    }

    const values = Object.values(data)
    for (let i = 0; i < len; i++) {
        arr.push(
            {
                time: timeframes[i],
                device: values[i].device,
                device_id: values[i]['device-id'],
                event: values[i].event,
                guest_id: values[i]['guest-id']
            }
        )
    }

    return arr

}

app.get('/insert', (req, res) => {
    let data = require('../martello-hack-data-v1.json')
    let arr = convert(data)
    console.log(arr.length)
    res.json(arr)
})

const populate = async (req, res) => {
    let data = require('../martello-hack-data-v1.json')
    let arr = convert(data)
    console.log(arr.length)
    for (let i = 0; i < arr.length; i++) {
        let el = arr[i]
        await pool.query('INSERT INTO timeframes (device, event, guest_id, device_id, time) VALUES ($1, $2, $3, $4, $5)', [el.device, el.event, el.guest_id, el.device_id, el.time], error => {
            // if (error) {
            //     throw error
            // }
            console.log('made it')
        })
        
    }
    res.status(201).json({ status: 'success', message: 'Element added.'})
}

app.route('/populate').get(populate)


const getTimeframes = (req, res) => {
    pool.query('SELECT time FROM timeframes', (error, results) => {
        if (error) {
            throw error
        }

        res.status(200).json(results.rows)
    })
}
const getDevice = (req, res) => {
    pool.query('SELECT device FROM timeframes', (error, results) => {
        if (error) {
            throw error
        }

        res.status(200).json(results.rows)
    })
}
const getDeviceID = (req, res) => {
    pool.query('SELECT device_id FROM timeframes', (error, results) => {
        if (error) {
            throw error
        }

        res.status(200).json(results.rows)
    })
}
const getEvent = (req, res) => {
    pool.query('SELECT event FROM timeframes', (error, results) => {
        if (error) {
            throw error
        }

        res.status(200).json(results.rows)
    })
}
const getGuestID = (req, res) => {
    pool.query('SELECT guest_id FROM timeframes', (error, results) => {
        if (error) {
            throw error
        }

        res.status(200).json(results.rows)
    })
}

const getAll = (req, res) => {
    pool.query('SELECT * FROM timeframes', (error, results) => {
        if (error) {
            throw error
        }

        res.status(200).json(results.rows)
    })
}

// const range = (req, res) => {
//     pool.query('SELECT * FROM timeframes WHERE time')
// }
app.route('/all').get(getAll)
app.post('/timeframes', jsonParser, function (req, res) {
    let begin = req.body.begin
    let end = req.body.end

    pool.query('SELECT * FROM timeframes WHERE time >= ($1) AND time <= ($2)', [begin, end], (error, results) => {
        if (error) {
            throw error
        }
        console.log(res)
        res.status(200).json(results.rows)
    })
})
app.route('/device').get(getDevice)
app.route('/deviceId').get(getDeviceID)
app.route('/event').get(getEvent)
app.route('/guestId').get(getGuestID)

// app.get('/timeframes', db.getTimeframes)
// app.get('/timeframes:id', db.getTimeframeById)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))