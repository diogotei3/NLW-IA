import { FastifyInstance } from "fastify";
import {fastifyMultipart} from '@fastify/multipart'
import path from 'node:path' //modulo interno do node
import { randomUUID } from "node:crypto";
import fs from 'node:fs' 
import { pipeline } from 'node:stream' 
//stream é uma colecao de dados que podem ser manipulados sem precisar estar tudo disponivel
import { prisma } from "../lib/prisma";
import { promisify } from "node:util";

const pump = promisify(pipeline)//transforma em promise

export async function uploadVideoRoute(app :FastifyInstance){
    app.register(fastifyMultipart , { //usa esse pacote para lidar com arquivos
        limits: {
            fileSize: 1_048_576 * 25 //representa 1 mega * 25 para arquivos
        }
    } )
    
    app.post('/videos', async (req, res) => { 
        const data = await req.file(); //arquivo carregado na requisicao
    
        if (!data){
            return res.status(400).send({error: 'Missing file input'})
        }
    
        const extension = path.extname(data.filename)
        
        if (extension != '.mp3') { 
            return res.status(400).send({error: 'Invalid input type, try upload mp3.'})
        }

        const fileBaseName = path.basename(data.filename, extension)
        const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`
        //define nome como base-id-extensao

        const  uploadPath = path.resolve(__dirname, '../../tmp', fileUploadName)
        //volta 2 niveis, de route para src e src para raiz
    
        await pump(data.file, fs.createWriteStream(uploadPath))
    
        const video = await prisma.video.create({
            data:{
                nome: data.filename,
                path: uploadPath
            }
        })

        return {video}
    })
}