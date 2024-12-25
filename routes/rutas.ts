import express from "express";
import {preguntaIa} from '../controllers/controlador'

export const router = express.Router();

//POST /tipo_ia/indice/pregunta
router.post('/ia', preguntaIa);