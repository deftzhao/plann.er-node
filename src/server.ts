import cors from '@fastify/cors'
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { env } from './env'
import { errorHandler } from './error-handler'
import { confirmTrip } from './routes/confirm-trip'
import { confirmParticipant } from './routes/confirme-participant'
import { createActivity } from './routes/create-activity'
import { createInvite } from './routes/create-invite'
import { createLink } from './routes/create-link'
import { createTrip } from './routes/create-trip'
import { getActivities } from './routes/get-activities'
import { getLinks } from './routes/get-links'
import { getParticipant } from './routes/get-participant'
import { getParticipants } from './routes/get-participants'
import { getTripDetails } from './routes/get-trip-details'
import { updateTrip } from './routes/update-trip'

const app = fastify()

app.register(cors, {
  origin: ['http://localhost:3000', 'http://localhost:3333'], // Permite tanto o frontend quanto o backend
})

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipant)
app.register(createActivity)
app.register(getActivities)
app.register(createLink)
app.register(getLinks)
app.register(getParticipants)
app.register(createInvite)
app.register(updateTrip)
app.register(getTripDetails)
app.register(getParticipant)

app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log(`Server running on port ${env.PORT}`))
