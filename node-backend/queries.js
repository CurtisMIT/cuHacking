const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getTimeframes = (req, res, next) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getTimeframeById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
    })
}

const createTimeframe = (request, response) => {
    const { device, device_id, event, guest_id } = request.body

    pool.query('INSERT INTO users (time, device, device_id, event, guest_id) VALUES ($1, $2, $3, $4, $5)', [time, device, device_id, event, guest_id], (error, results) => {
        if (error) {
            throw error
        }

        response.status(201).json(results)
    })
}

module.exports = {
    getTimeframes,
    getTimeframeById
}