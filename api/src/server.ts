import { fastify } from 'fastify'
import {fastifyCors} from '@fastify/cors'
import { prisma } from './lib/prisma';
import { getAllPromptsRoute } from './routes/get-all-prompts';
import { uploadVideoRoute } from './routes/upload-video';
import { createTranscriptionRoute } from './routes/create-transcription';
import { generateIaCompletionRoute } from './routes/generate-ia-completion';

const app = fastify();

app.register(fastifyCors, {
    origin: '#', //qualquer url front end pode acessar back
})

app.register(getAllPromptsRoute) //todos os funcoes exportadas precisam ser assincrocas
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateIaCompletionRoute)

app.listen({
    port: 3333
}).then(()=> {
    console.log("HTTP Server Running.")
}) //105 min https://www.youtube.com/watch?v=m6Pqiad4kRA