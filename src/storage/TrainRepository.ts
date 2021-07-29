import { Entity, PrimaryGeneratedColumn, Column, Repository, Connection } from 'typeorm';

export interface ITrainRegistry {
    id?: number;
    user_uuid: string;
    train_uuid: string;
    createdAt: Date;
}

@Entity('trains_history')
export class TrainModel {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false })
    user_uuid: string;

    @Column({ nullable: false })
    train_uuid: string;

    @Column({ type: "timestamp", default: new Date() })
    createdAt: Date;
    
}

export class TrainRepository {
    private ormRepository: Repository<TrainModel>;

    constructor(connection: Connection) {
        this.ormRepository = connection.getRepository(TrainModel);
    }

    public async getAllFromUser(uuid: string): Promise<TrainModel[]> {
        const trainsHistory = await this.ormRepository
        .createQueryBuilder()
        .where("user_uuid = :uuid", { uuid: uuid })
        .orderBy("createdAt", "DESC")
        .limit(10)
        .cache(true)
        .getMany()

        return trainsHistory;
    }

    public async create(train: ITrainRegistry): Promise<TrainModel>{
        let trainRegistryCreated = this.ormRepository.create(train)
        
        let created = await this.ormRepository.save(trainRegistryCreated)

        return created;
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }
}