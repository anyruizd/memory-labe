import express from 'express'
import pkg from 'sqlite3'
const { Database } = pkg
import cors from 'cors'

const app = express()
const port = 4001
const db = new Database('memories.db')

app.use(express.json())
app.use(cors({
  origin: '*'
}))

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `)
  db.run(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      timestamp DATE,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)
})

app.get('/memories', (req, res) => {
  db.all('SELECT * FROM memories', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ memories: rows })
  })
})

app.get('/users/:userId/memories', (req, res) => {
  const { userId } = req.params
  db.all('SELECT * FROM memories WHERE user_id = ?', [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    if (!rows) {
      res.status(404).json({ error: 'Memories not found' })
      return
    }
    res.json({ memories: rows })
  })
})

app.post('/users', (req, res) => {
  const { name } = req.body

  if (!name) {
    res.status(400).json({
      error: 'Please provide all fields: name',
    })
    return
  }

  const stmt = db.prepare(
    'INSERT INTO users (name) VALUES (?)'
  )
  stmt.run(name, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    const getUserIdStmt = db.prepare(
      'SELECT last_insert_rowid() as id'
    )
    getUserIdStmt.get((err, row) => {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }

      const userId = row.id
      res.status(201).json({ 
        name, 
        id: userId
      })
    })
  })
})

app.post('/memories', (req, res) => {
  const { name, description, timestamp, userId } = req.body

  if (!name || !description || !timestamp) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp',
    })
    return
  }

  const stmt = db.prepare(
    'INSERT INTO memories (name, description, timestamp, user_id) VALUES (?, ?, ?, ?)'
  )
  stmt.run(name, description, timestamp, userId, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.status(201).json({ message: 'Memory created successfully' })
  })
})

app.get('/memories/:id', (req, res) => {
  const { id } = req.params
  db.get('SELECT * FROM memories WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    if (!row) {
      res.status(404).json({ error: 'Memory not found' })
      return
    }
    res.json({ memory: row })
  })
})

app.put('/memories/:id', (req, res) => {
  const { id } = req.params
  const { name, description, timestamp, userId } = req.body

  if (!name || !description || !timestamp || !userId) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp',
    })
    return
  }

  const stmt = db.prepare(
    'UPDATE memories SET name = ?, description = ?, timestamp = ?, user_id = ? WHERE id = ?'
  )
  stmt.run(name, description, timestamp, userId, id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory updated successfully' })
  })
})

app.delete('/memories/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM memories WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory deleted successfully' })
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
