import { Entity, PrimaryGeneratedColumn, Column, Repository, Connection } from 'typeorm';

interface IExercise {
    id?: number;
    uuid: string;
    name: string;
    uri?: string;
    capacity?: string;
    muscles?: string;
    hot_to?: string;
}

@Entity('exercises')
export class ExerciseModel {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true, nullable: false})
    uuid: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    uri: string;

    @Column({ nullable: true })
    muscles: string;

    @Column({ nullable: true })
    capacity: string;

    @Column({ type: "text", nullable: true })
    howTo: string;
}

export class ExerciseRepository {
    private ormRepository: Repository<ExerciseModel>;

    constructor(connection: Connection) {
        this.ormRepository = connection.getRepository(ExerciseModel);
    }

    public async getAll(): Promise<ExerciseModel[]> {
        const exercises = await this.ormRepository.createQueryBuilder().orderBy("name", "ASC").getMany();
        return exercises;
    }

    public async createMany(exercises: IExercise[]): Promise<void>{
        const exercisesCreated = await this.ormRepository
        .createQueryBuilder()
        .insert()
        .into(ExerciseModel)
        .values(exercises)
        .execute()
        
        console.log(exercisesCreated)
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }
}