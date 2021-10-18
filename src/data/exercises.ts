export interface IExerciseObject {
    name: string;
    image: any;
    uid: string;
    capacity: string;
    muscles: string
    howTo: string;
}

/**
 * Find an exercise element on the list with an uid
 * @param uid A parameter relative to exercise identification
 * @returns Return an exercise object or undefined 
 */

export function getExerciseByUid(uid: string){
    return exercises.find((value) => value.uid === uid);
}

export const exercises: IExerciseObject[] = [
    {
        name:"Abdominal",
        image: require("../assets/exercises/abdominal.mp4"),
        uid: "0e16518c-720c-471a-91c5-915704375202",
        capacity: "Força",
        muscles: "Transverso Abdominal, Reto Abdominal, Oblíquo Interno, Oblíquo Externo",
        howTo: "1- Deite-se no solo, com a barriga voltada para cima, joelhos flexionados apontados para o teto e pés firmes no chão alinhados com seu quadril;\n2 - Incline o tronco para frente como se fosse encostar o peito nos joelhos;"
    },
    {
        name:"Agachamento",
        image: require("../assets/exercises/agachamento.mp4"),
        uid: "9f1574a0-d94c-43c6-90c6-19a889d71199",
        capacity: "Força",
        muscles: "Quadríceps, Glúteos, Isquiotibiais, Panturrilha, Quadril, Lombar, Abdômen",
        howTo: "1- Manter os pés ligeiramente afastados e sempre bem apoiados no chão;\n2 - Esticar os braços à frente do corpo;\n3 - Manter as costas retas e evitar compensar com o quadril, como é comum acontecer;\n4 - Inspirar antes de iniciar o agachamento e soltar o ar enquanto desce;\n5 - Descer o suficiente para manter as coxas paralelas ao chão;"
    },
    {
        name:"Agachamento Explosivo",
        image: require("../assets/exercises/agachamento-explosivo.mp4"),
        uid: "4cba3657-233e-4d6a-825d-165fe380f00d",
        capacity: "Força",
        muscles: "Quadríceps, Glúteos, Isquiotibiais, Panturrilha, Quadril, Lombar, Abdômen",
        howTo: "1- Manter os pés ligeiramente afastados e sempre bem apoiados no chão;\n2 - Esticar os braços à frente do corpo;\n3 - Manter as costas retas e evitar compensar com o quadril, como é comum acontecer;\n4 - Inspirar antes de iniciar o agachamento e soltar o ar enquanto desce;\n5 - Descer o suficiente para manter as coxas paralelas ao chão;\n6 - Subir rapidamente executando um salto;"
    },
    {
        name:"Corda Imaginária",
        image: require("../assets/exercises/corda-imaginaria.mp4"),
        uid: "94c9a43a-ee71-4eae-86c6-35ba714ae0af",
        capacity: "Resistência",
        muscles: "Glúteos, Isquiotibiais, Panturrilha, Quadril, Braços",
        howTo: "1 - Fique em pé com os pés abaixo dos quadris;\n2 - Estenda os braços ao longo do corpo e finja segurar uma alça de corda de pular em cada mão;\n3 - Dê um salto levantando os dois pés do chão ao mesmo tempo. Pouse e salte novamente;"
    },
    {
        name:"Corrida Estacionária",
        image: require("../assets/exercises/corrida-estacionaria.mp4"),
        uid: "90a5952d-dd54-4cf7-b020-787e5187d20d",
        capacity: "Resistência",
        muscles: "Quadríceps Femoral, Bíceps Femoral, Glúteos, Musculatura dos Quadris, Panturrilha, Musculatura da Coluna Lombar, Dorsal, Ombros",
        howTo: "1 - Com as pernas paralelas, sem sair do lugar, levante o braço direito e o pé esquerdo ao mesmo tempo;\n2 - Os joelhos devem ir até os quadris, as pernas se flexionam até o calcanhar chegar perto do bumbum e os braços flexionados ao lado do corpo;\n3 - O movimento deve variar para o pé e braço oposto;"
    },
    {
        name:"Flexão do Tronco",
        image: require("../assets/exercises/flexao-de-tronco.mp4"),
        uid: "66b23842-e5e2-4c3d-affb-464d09ec8d78",
        capacity: "Flexibilidade",
        muscles: "Dorsal, Músculos Abdominais, Romboide",
        howTo: "1 - Mantenha os pés à largura dos ombros e as pernas endireitadas nos joelhos durante a execução;\n2 - Faça uma flexão para a perna esquerda, 2 para a perna direita e na terceira o corpo deverá voltar à posição inicial;\n3 - Em seguida, junte as pernas e tente tocar a testa nos joelhos;"
    },
    {
        name:"Flexão do Tronco com Rotação",
        image: require("../assets/exercises/flexao-rotativa.mp4"),
        uid: "c15632b3-2b2f-4973-a55d-edc8172401a2",
        capacity: "Flexibilidade",
        muscles: "Trapézio, Dorsal, Músculos Abdominais, Romboide",
        howTo: "1 - Mantenha-se com o corpo direito sobre as pernas retas, pés à largura dos ombros, tronco dobrado sobre as pernas num ângulo de 90 graus e as mãos endireitada para os lados;\n2 - Efetue movimentos largos para a esquerda e para a direita com o olhar na direção da mão que sobe;"
    },
    {
        name:"Polichinelo",
        image: require("../assets/exercises/polichinelo.mp4"),
        uid: "152c9700-e42a-42f7-a96d-2308c69baaa7",
        capacity: "Resistência",
        muscles: "Panturrilha, Quadríceps, Glúteos, Flexores do quadril, Isquiotibiais, Músculos das Costas, Deltóides, Abdômen",
        howTo: "1 - Para iniciar, mantenha-se numa posição ereta, com as pernas juntas e as mãos estendidas ao longo do corpo;\n2 - Depois, salte do mesmo lugar onde você está, de modo que os braços acompanhem o movimento, elevando-os acima da cabeça onde as palmas devem se encostar uma na outra;\n3 - Logo após, quando as pernas voltam a se encontrar depois de um pequeno salto, os braços também devem voltar à posição inicial. O movimento pode ser feito de maneira rápida, porém, os braços e pernas devem estar sincronizados;\n4 - Lembre-se de estar com os pés posicionados corretamente e flexionar bem os joelhos durante o exercício;\n"
    },
];