import express from "express";
import {getPosts, createPost, preguntaIa} from '../controllers/controlador'

export const router = express.Router();

//GET /feed/posts
router.get('/posts', getPosts);

//POST /feed/posts
router.post('/post', createPost);

//POST /tipo_ia/indice/pregunta
router.post('/ia', preguntaIa);