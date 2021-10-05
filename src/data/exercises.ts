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
        name:"Agachamento",
        image: require("../assets/exercises/agachamento.jpg"),
        uid: "dae302aa-36d9-4c08-bd92-69be6c47d877",
        capacity: "Força",
        muscles: "Quadríceps, Glúteos, Estabilizadores da Coluna",
        howTo: "Comece com os pés na linha dos ombros. O passo seguinte é jogar as nádegas para trás, sem tirar o calcanhar do solo. Agache até o joelho formar um ângulo de 90 graus e deixe o corpo ereto de novo."
    },
    {
        name:"Polichinelo",
        image: require("../assets/exercises/polichinelo.jpg"),
        uid: "258008ba-d567-403c-af10-b19e41791f4b",
        capacity: "Resistência",
        muscles: "Capacidade Cardiorrespiratória, Coordenação",
        howTo: "Fique de pé, com a coluna reta. Abra as pernas e jogue os braços para o alto, encostando as mãos. Logo na sequência, feche as pernas, enquanto coloca os braços colados no corpo."
    },
    {
        name:"Prancha",
        image: require("../assets/exercises/prancha-ventral.jpg"),
        uid: "475918d8-9ca5-4992-a886-a33b08633613",
        capacity: "Resistência",
        muscles: "Musculatura da região central do corpo",
        howTo: "Deitado, sustente o corpo com os antebraços e os pés, sem dobrar a coluna ou as pernas."
    },
    {
        name:"Abdominal Supra no Solo",
        image: require("../assets/exercises/abdominal-supra-no-solo.jpg"),
        uid: "d70894a5-527e-493a-9ff5-6c74b6fc8445",
        capacity: "Força",
        muscles: "Músculos do Abdomen",
        howTo: "Deite de barriga para cima com os joelhos flexionados e os pés no chão. Contraia o abdômen enquanto ergue um pouco o tronco e a cabeça. Atenção: não entorte demais o pescoço."
    },
    {
        name:"Subir e Descer da Cadeira",
        image: require("../assets/exercises/subir-e-descer-da-cadeira.jpg"),
        uid: "e73cb9a1-7cff-43a9-8c85-366d36989d38",
        capacity: "Resistência",
        muscles: "Quadríceps, Glúteo, Estabilizadores da Coluna",
        howTo: "O nome já entrega: basta repetir esse gesto, revezando as pernas. Contudo, certifique-se de que o móvel aguenta o tranco e está firmado no chão. Quanto mais alto o banco, maior a dificuldade."
    },
];