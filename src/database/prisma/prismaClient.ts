import { PrismaClient } from '@prisma/client'
import { query } from 'express'

 const prisma = new PrismaClient({
    log:['query']
 })
// use `prisma` in your application to read and write data in your DB

export {prisma}