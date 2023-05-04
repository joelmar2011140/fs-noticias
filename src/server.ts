import { createServer } from 'http'
import dotenv from 'dotenv'
import { app } from './app/app'
// import cluster from 'cluster'
// import { cpus } from 'os'

dotenv.config()

export function startServer (): void {
  const porta = process.env.PORT ?? 6568
  const servidor = createServer(app)
  servidor.listen(porta, async () => {
    console.clear()
    console.debug(`🔥🔥🔥 Server running on port ${porta} 🔥🔥🔥`)
  })
}

// Clusterizando a API
// if (cluster.isPrimary) {
//   const totalCpus = cpus().length
//   for (let iterador = 0; iterador < totalCpus; iterador++) {
//     cluster.fork()
//   }
// } else {
//   startServer()
// }

startServer()
