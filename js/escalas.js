/* =========================================================
   NeuroEval - Datos de las escalas de evaluación AVD
   Textos y criterios tomados del prototipo de Figma.
   ========================================================= */

/* eslint-disable */
const SCALES = {
    "barthel": {
        "name": "Índice de Barthel",
        "max": 100,
        "form": "barthel-evaluacion.html",
        "result": "barthel-resultado.html",
        "items": [
            {
                "name": "Comida",
                "desc": "Capacidad para comer y manejar los alimentos.",
                "criteria": [
                    {
                        "label": "Independiente",
                        "points": 10,
                        "text": "Come por sí solo en un tiempo razonable; otra persona puede cocinar y servir."
                    },
                    {
                        "label": "Necesita ayuda",
                        "points": 5,
                        "text": "Requiere ayuda para cortar o preparar, pero come solo."
                    },
                    {
                        "label": "Dependiente",
                        "points": 0,
                        "text": "Necesita que otra persona lo alimente."
                    }
                ]
            },
            {
                "name": "Lavado (baño)",
                "desc": "Lavado completo y acceso al baño.",
                "criteria": [
                    {
                        "label": "Independiente",
                        "points": 5,
                        "text": "Se lava entero, entra y sale sin ayuda ni supervisión."
                    },
                    {
                        "label": "Necesita ayuda",
                        "points": 0,
                        "text": "Necesita ayuda o supervisión."
                    }
                ]
            },
            {
                "name": "Vestido",
                "desc": "Ponerse y quitarse la ropa.",
                "criteria": [
                    {
                        "label": "Independiente",
                        "points": 10,
                        "text": "Se pone y quita la ropa sin ayuda."
                    },
                    {
                        "label": "Necesita ayuda",
                        "points": 5,
                        "text": "Hace sin ayuda más de la mitad de las tareas en tiempo razonable."
                    },
                    {
                        "label": "Dependiente",
                        "points": 0,
                        "text": "Depende de ayuda para vestirse."
                    }
                ]
            },
            {
                "name": "Arreglo personal",
                "desc": "Actividades de higiene y cuidado personal.",
                "criteria": [
                    {
                        "label": "Independiente",
                        "points": 5,
                        "text": "Realiza todo el arreglo sin ayuda; los complementos pueden ser provistos."
                    },
                    {
                        "label": "Necesita ayuda",
                        "points": 0,
                        "text": "Necesita alguna ayuda."
                    }
                ]
            },
            {
                "name": "Deposición",
                "desc": "Continencia fecal y manejo de apoyos.",
                "criteria": [
                    {
                        "label": "Continencia",
                        "points": 10,
                        "text": "Sin episodios de incontinencia."
                    },
                    {
                        "label": "Accidente ocasional",
                        "points": 5,
                        "text": "Accidente menor a una vez por semana o ayuda para colocar enemas o supositorios."
                    },
                    {
                        "label": "Incontinencia",
                        "points": 0,
                        "text": "Más de un episodio semanal de incontinencia; incluye enemas o supositorios administrados por otra persona."
                    }
                ]
            },
            {
                "name": "Micción",
                "desc": "Continencia urinaria y manejo de dispositivos.",
                "criteria": [
                    {
                        "label": "Continencia",
                        "points": 10,
                        "text": "Continente; maneja cualquier dispositivo por sí solo."
                    },
                    {
                        "label": "Accidente ocasional",
                        "points": 5,
                        "text": "Máximo un episodio en 24 horas o ayuda con sondas u otros dispositivos."
                    },
                    {
                        "label": "Incontinencia",
                        "points": 0,
                        "text": "Más de un episodio en 24 horas; incluye sonda que no maneja por sí mismo."
                    }
                ]
            },
            {
                "name": "Ir al retrete",
                "desc": "Acceso, uso e higiene en el WC.",
                "criteria": [
                    {
                        "label": "Independiente",
                        "points": 10,
                        "text": "Entra, sale y lo utiliza sin ayuda."
                    },
                    {
                        "label": "Necesita ayuda",
                        "points": 5,
                        "text": "Requiere pequeña ayuda; puede usar el baño y limpiarse solo."
                    },
                    {
                        "label": "Dependiente",
                        "points": 0,
                        "text": "No accede o no lo utiliza sin ayuda mayor."
                    }
                ]
            },
            {
                "name": "Traslado cama/sillón",
                "desc": "Pasar de la cama a la silla y levantarse.",
                "criteria": [
                    {
                        "label": "Independiente",
                        "points": 15,
                        "text": "Se sienta, se levanta y entra o sale de la cama sin ayuda."
                    },
                    {
                        "label": "Ayuda mínima",
                        "points": 10,
                        "text": "Supervisión o pequeña ayuda física."
                    },
                    {
                        "label": "Gran ayuda",
                        "points": 5,
                        "text": "Ayuda de una persona fuerte o entrenada; se mantiene sentado."
                    },
                    {
                        "label": "Dependiente",
                        "points": 0,
                        "text": "Necesita grúa o dos personas; no permanece sentado."
                    }
                ]
            },
            {
                "name": "Deambulación",
                "desc": "Desplazarse caminando o en silla de ruedas.",
                "criteria": [
                    {
                        "label": "Independiente",
                        "points": 15,
                        "text": "Camina 50 m o equivalente en casa sin ayuda; ayudas mecánicas salvo andador. Si usa prótesis, la maneja solo."
                    },
                    {
                        "label": "Necesita ayuda",
                        "points": 10,
                        "text": "Supervisión, pequeña ayuda física o uso de andador."
                    },
                    {
                        "label": "Silla de ruedas",
                        "points": 5,
                        "text": "Independiente en silla de ruedas, sin ayuda ni supervisión."
                    },
                    {
                        "label": "Dependiente",
                        "points": 0,
                        "text": "Dependiente; si usa silla, otra persona la empuja."
                    }
                ]
            },
            {
                "name": "Subir y bajar escaleras",
                "desc": "Desplazarse entre pisos por escalones.",
                "criteria": [
                    {
                        "label": "Independiente",
                        "points": 10,
                        "text": "Sube y baja un piso sin ayuda ni supervisión."
                    },
                    {
                        "label": "Necesita ayuda",
                        "points": 5,
                        "text": "Precisa ayuda o supervisión."
                    },
                    {
                        "label": "Dependiente",
                        "points": 0,
                        "text": "Incapaz de salvar escalones; necesita ascensor."
                    }
                ]
            }
        ],
        "levels": [
            {
                "min": 0,
                "max": 20,
                "label": "Dependencia total"
            },
            {
                "min": 21,
                "max": 45,
                "label": "Dependencia severa"
            },
            {
                "min": 46,
                "max": 60,
                "label": "Dependencia moderada"
            },
            {
                "min": 61,
                "max": 99,
                "label": "Dependencia leve"
            },
            {
                "min": 100,
                "max": 100,
                "label": "Independencia total"
            }
        ]
    },
    "lawton": {
        "name": "Lawton y Brody",
        "max": 8,
        "form": "lawton-evaluacion.html",
        "result": "lawton-resultado.html",
        "items": [
            {
                "name": "Uso del teléfono",
                "desc": "Realizar y responder llamadas.",
                "criteria": [
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Inicia llamadas, marca números familiares o responde de forma independiente."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "No tiene habilidad para usar el teléfono."
                    }
                ]
            },
            {
                "name": "Compras",
                "desc": "Planificar y adquirir productos necesarios.",
                "criteria": [
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Realiza todas las compras necesarias sin asistencia."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Solo hace compras pequeñas, requiere acompañamiento o es incapaz."
                    }
                ]
            },
            {
                "name": "Preparación de comida",
                "desc": "Organizar, cocinar y servir alimentos.",
                "criteria": [
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Organiza, cocina y sirve alimentos de forma autónoma y adecuada."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Necesita ingredientes preparados, no mantiene dieta adecuada al cocinar o depende de que le preparen y sirvan."
                    }
                ]
            },
            {
                "name": "Cuidado de la casa",
                "desc": "Mantener el orden y la limpieza del hogar.",
                "criteria": [
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Mantiene la casa, con ayuda ocasional en tareas pesadas, o realiza tareas ligeras con limpieza aceptable."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Necesita asistencia en todas las labores o no participa."
                    }
                ]
            },
            {
                "name": "Lavado de ropa",
                "desc": "Lavar ropa personal y prendas pequeñas.",
                "criteria": [
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Lava toda su ropa o prendas pequeñas e interiores de forma autónoma."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Otra persona asume todo el lavado."
                    }
                ]
            },
            {
                "name": "Transporte",
                "desc": "Organizar desplazamientos fuera del hogar.",
                "criteria": [
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Conduce, utiliza transporte público o solicita y usa taxis por sí solo."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Necesita acompañante o ayuda física/de terceros, o no sale del hogar."
                    }
                ]
            },
            {
                "name": "Medicación",
                "desc": "Gestionar dosis y horarios prescritos.",
                "criteria": [
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Administra medicamentos en las dosis e intervalos exactos prescritos."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Depende de dosis preparadas o no puede administrarlas."
                    }
                ]
            },
            {
                "name": "Manejo del dinero",
                "desc": "Gestionar gastos, pagos y recursos económicos.",
                "criteria": [
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Gestiona sus finanzas o las compras cotidianas, aunque requiera apoyo en banca o presupuestos mayores."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Incapaz de manejar efectivo o transacciones."
                    }
                ]
            }
        ]
    },
    "scim": {
        "name": "SCIM III",
        "max": 100,
        "form": "scim-evaluacion.html",
        "result": "scim-resultado.html",
        "items": [
            {
                "name": "1. Alimentación",
                "desc": "Comer y beber.",
                "criteria": [
                    {
                        "label": "Nivel 3",
                        "points": 3,
                        "text": "Independiente sin ayudas."
                    },
                    {
                        "label": "Nivel 2",
                        "points": 2,
                        "text": "Ayuda solo en preparación."
                    },
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Parcial al comer/beber o colocar ayudas."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Asistencia total."
                    }
                ]
            },
            {
                "name": "2A. Baño superior",
                "desc": "Lavar la parte superior.",
                "criteria": [
                    {
                        "label": "Nivel 3",
                        "points": 3,
                        "text": "Sin adaptaciones."
                    },
                    {
                        "label": "Nivel 2",
                        "points": 2,
                        "text": "Independiente con adaptaciones."
                    },
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Parcial."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Total."
                    }
                ]
            },
            {
                "name": "2B. Baño inferior",
                "desc": "Lavar la parte inferior.",
                "criteria": [
                    {
                        "label": "Nivel 3",
                        "points": 3,
                        "text": "Sin adaptaciones."
                    },
                    {
                        "label": "Nivel 2",
                        "points": 2,
                        "text": "Independiente con adaptaciones."
                    },
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Parcial."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Total."
                    }
                ]
            },
            {
                "name": "3A. Vestido superior",
                "desc": "Vestir la parte superior.",
                "criteria": [
                    {
                        "label": "Nivel 4",
                        "points": 4,
                        "text": "Independiente."
                    },
                    {
                        "label": "Nivel 3",
                        "points": 3,
                        "text": "Ayuda solo en cierres."
                    },
                    {
                        "label": "Nivel 2",
                        "points": 2,
                        "text": "Simples con adaptaciones."
                    },
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Parcial en prendas simples."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Total."
                    }
                ]
            },
            {
                "name": "3B. Vestido inferior",
                "desc": "Vestir la parte inferior.",
                "criteria": [
                    {
                        "label": "Nivel 4",
                        "points": 4,
                        "text": "Independiente."
                    },
                    {
                        "label": "Nivel 3",
                        "points": 3,
                        "text": "Ayuda solo en cierres."
                    },
                    {
                        "label": "Nivel 2",
                        "points": 2,
                        "text": "Simples con adaptaciones."
                    },
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Parcial en prendas simples."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Total."
                    }
                ]
            },
            {
                "name": "4. Aseo personal",
                "desc": "Higiene de manos, cara y boca.",
                "criteria": [
                    {
                        "label": "Nivel 3",
                        "points": 3,
                        "text": "Sin ayudas."
                    },
                    {
                        "label": "Nivel 2",
                        "points": 2,
                        "text": "Independiente con ayudas."
                    },
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Parcial."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Total."
                    }
                ]
            },
            {
                "name": "5. Respiración",
                "desc": "Apoyo respiratorio y tos.",
                "criteria": [
                    {
                        "label": "Nivel 10",
                        "points": 10,
                        "text": "Respira sin asistencia ni dispositivos."
                    },
                    {
                        "label": "Nivel 8",
                        "points": 8,
                        "text": "Respira sin traqueostomía; necesita poca ayuda o estimulación para toser."
                    },
                    {
                        "label": "Nivel 6",
                        "points": 6,
                        "text": "Respira sin traqueostomía; requiere oxígeno, mucha ayuda para toser, mascarilla o ventilación intermitente no invasiva."
                    },
                    {
                        "label": "Nivel 4",
                        "points": 4,
                        "text": "Respira con traqueostomía; necesita poca ayuda para toser o manejar la cánula."
                    },
                    {
                        "label": "Nivel 2",
                        "points": 2,
                        "text": "Respira con traqueostomía; necesita oxígeno, mucha ayuda para toser o para manejar la cánula."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Requiere ventilación asistida permanente o intermitente mediante traqueostomía."
                    }
                ]
            },
            {
                "name": "6. Manejo vesical",
                "desc": "Continencia y vaciamiento vesical.",
                "criteria": [
                    {
                        "label": "Nivel 15",
                        "points": 15,
                        "text": "Residual <100 ml, continente."
                    },
                    {
                        "label": "Nivel 13",
                        "points": 13,
                        "text": "Residual <100 ml, colector autónomo."
                    },
                    {
                        "label": "Nivel 11",
                        "points": 11,
                        "text": "Autocateterismo, continente."
                    },
                    {
                        "label": "Nivel 9",
                        "points": 9,
                        "text": "Autocateterismo y colector autónomo."
                    },
                    {
                        "label": "Nivel 6",
                        "points": 6,
                        "text": "Residual <100 ml o autocateterismo; ayuda con colector."
                    },
                    {
                        "label": "Nivel 3",
                        "points": 3,
                        "text": "Residual >100 ml, sin cateterismo regular o asistido."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Sonda permanente."
                    }
                ]
            },
            {
                "name": "7. Manejo intestinal",
                "desc": "Regularidad y continencia intestinal.",
                "criteria": [
                    {
                        "label": "Nivel 10",
                        "points": 10,
                        "text": "Sin accidentes."
                    },
                    {
                        "label": "Nivel 8",
                        "points": 8,
                        "text": "Autónomo; accidentes <2/mes."
                    },
                    {
                        "label": "Nivel 5",
                        "points": 5,
                        "text": "Regular, asistido; accidentes <2/mes."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Irregular o <1/3 días."
                    }
                ]
            },
            {
                "name": "8. Uso del WC",
                "desc": "Higiene perineal y manejo de ropa.",
                "criteria": [
                    {
                        "label": "Nivel 5",
                        "points": 5,
                        "text": "Sin adaptaciones."
                    },
                    {
                        "label": "Nivel 4",
                        "points": 4,
                        "text": "Autónomo con adaptaciones."
                    },
                    {
                        "label": "Nivel 2",
                        "points": 2,
                        "text": "Parcial, se limpia."
                    },
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Parcial, no se limpia."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Total."
                    }
                ]
            },
            {
                "name": "9. Movilidad en cama",
                "desc": "Giros, incorporación y alivio de presión.",
                "criteria": [
                    {
                        "label": "Nivel 6",
                        "points": 6,
                        "text": "Realiza las cuatro actividades sin ayuda. No se consideran ayudas eléctricas."
                    },
                    {
                        "label": "Nivel 4",
                        "points": 4,
                        "text": "Realiza dos o tres de las cuatro actividades sin ayuda."
                    },
                    {
                        "label": "Nivel 2",
                        "points": 2,
                        "text": "Realiza una de las cuatro actividades sin ayuda."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Necesita ayuda en las cuatro actividades: giro superior e inferior en cama, incorporarse y elevarse en silla para aliviar presión."
                    }
                ]
            },
            {
                "name": "10. Cama–silla",
                "desc": "Transferirse entre cama y silla.",
                "criteria": [
                    {
                        "label": "Nivel 2",
                        "points": 2,
                        "text": "Autónomo o no usa silla."
                    },
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Ayuda, supervisión o adaptación."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Total."
                    }
                ]
            },
            {
                "name": "11. Silla–WC/bañera",
                "desc": "Transferirse al WC o bañera.",
                "criteria": [
                    {
                        "label": "Nivel 2",
                        "points": 2,
                        "text": "Autónomo o no usa silla."
                    },
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Ayuda, supervisión o adaptación."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Total."
                    }
                ]
            },
            {
                "name": "12. Movilidad interior",
                "desc": "Desplazarse dentro del hogar.",
                "criteria": [
                    {
                        "label": "Nivel 8",
                        "points": 8,
                        "text": "Camina sin ayudas."
                    },
                    {
                        "label": "Nivel 7",
                        "points": 7,
                        "text": "Solo necesita ortesis de miembro inferior."
                    },
                    {
                        "label": "Nivel 6",
                        "points": 6,
                        "text": "Camina con un bastón."
                    },
                    {
                        "label": "Nivel 5",
                        "points": 5,
                        "text": "Camina con muletas o dos bastones con marcha alterna."
                    },
                    {
                        "label": "Nivel 4",
                        "points": 4,
                        "text": "Camina con andador o muletas con marcha pendular."
                    },
                    {
                        "label": "Nivel 3",
                        "points": 3,
                        "text": "Camina con supervisión, con o sin dispositivos."
                    },
                    {
                        "label": "Nivel 2",
                        "points": 2,
                        "text": "Se desplaza de forma independiente en silla manual."
                    },
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Necesita silla eléctrica o ayuda parcial para manejar una silla manual."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Requiere asistencia total."
                    }
                ]
            },
            {
                "name": "13. Distancias moderadas",
                "desc": "Recorrer entre 10 y 100 metros.",
                "criteria": [
                    {
                        "label": "Nivel 8",
                        "points": 8,
                        "text": "Camina sin ayudas. Distancia: 10–100 m."
                    },
                    {
                        "label": "Nivel 7",
                        "points": 7,
                        "text": "Solo necesita ortesis de miembro inferior. Distancia: 10–100 m."
                    },
                    {
                        "label": "Nivel 6",
                        "points": 6,
                        "text": "Camina con un bastón. Distancia: 10–100 m."
                    },
                    {
                        "label": "Nivel 5",
                        "points": 5,
                        "text": "Camina con muletas o dos bastones con marcha alterna. Distancia: 10–100 m."
                    },
                    {
                        "label": "Nivel 4",
                        "points": 4,
                        "text": "Camina con andador o muletas con marcha pendular. Distancia: 10–100 m."
                    },
                    {
                        "label": "Nivel 3",
                        "points": 3,
                        "text": "Camina con supervisión, con o sin dispositivos. Distancia: 10–100 m."
                    },
                    {
                        "label": "Nivel 2",
                        "points": 2,
                        "text": "Se desplaza de forma independiente en silla manual. Distancia: 10–100 m."
                    },
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Necesita silla eléctrica o ayuda parcial para manejar una silla manual. Distancia: 10–100 m."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Requiere asistencia total. Distancia: 10–100 m."
                    }
                ]
            },
            {
                "name": "14. Movilidad exterior",
                "desc": "Recorrer más de 100 metros.",
                "criteria": [
                    {
                        "label": "Nivel 8",
                        "points": 8,
                        "text": "Camina sin ayudas. Distancia: más de 100 m."
                    },
                    {
                        "label": "Nivel 7",
                        "points": 7,
                        "text": "Solo necesita ortesis de miembro inferior. Distancia: más de 100 m."
                    },
                    {
                        "label": "Nivel 6",
                        "points": 6,
                        "text": "Camina con un bastón. Distancia: más de 100 m."
                    },
                    {
                        "label": "Nivel 5",
                        "points": 5,
                        "text": "Camina con muletas o dos bastones con marcha alterna. Distancia: más de 100 m."
                    },
                    {
                        "label": "Nivel 4",
                        "points": 4,
                        "text": "Camina con andador o muletas con marcha pendular. Distancia: más de 100 m."
                    },
                    {
                        "label": "Nivel 3",
                        "points": 3,
                        "text": "Camina con supervisión, con o sin dispositivos. Distancia: más de 100 m."
                    },
                    {
                        "label": "Nivel 2",
                        "points": 2,
                        "text": "Se desplaza de forma independiente en silla manual. Distancia: más de 100 m."
                    },
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Necesita silla eléctrica o ayuda parcial para manejar una silla manual. Distancia: más de 100 m."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Requiere asistencia total. Distancia: más de 100 m."
                    }
                ]
            },
            {
                "name": "15. Escaleras",
                "desc": "Subir y bajar escalones.",
                "criteria": [
                    {
                        "label": "Nivel 3",
                        "points": 3,
                        "text": "≥3, sin apoyo."
                    },
                    {
                        "label": "Nivel 2",
                        "points": 2,
                        "text": "≥3, baranda/apoyo."
                    },
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "≥3, ayuda personal."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Incapaz."
                    }
                ]
            },
            {
                "name": "16. Silla–automóvil",
                "desc": "Transferirse y manejar la silla.",
                "criteria": [
                    {
                        "label": "Nivel 2",
                        "points": 2,
                        "text": "Autónomo o no usa silla."
                    },
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Ayuda, supervisión o adaptación."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Total."
                    }
                ]
            },
            {
                "name": "17. Suelo–silla",
                "desc": "Transferirse entre suelo y silla.",
                "criteria": [
                    {
                        "label": "Nivel 1",
                        "points": 1,
                        "text": "Autónomo, con/sin ayudas, o no usa silla."
                    },
                    {
                        "label": "Nivel 0",
                        "points": 0,
                        "text": "Ayuda."
                    }
                ]
            }
        ],
        "domains": [
            {
                "key": "selfcare",
                "name": "Autocuidado",
                "max": 20,
                "from": 0,
                "to": 6
            },
            {
                "key": "resp",
                "name": "Respiración y esfínteres",
                "max": 40,
                "from": 6,
                "to": 10
            },
            {
                "key": "mob",
                "name": "Movilidad",
                "max": 40,
                "from": 10,
                "to": 19
            }
        ]
    }
};
