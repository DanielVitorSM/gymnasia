import { Entity, PrimaryGeneratedColumn, Column, Repository, Connection, Generated } from 'typeorm';

export interface IUser {
    id?: number;
    name?: string;
    uuid?: string;
    weight: number;
    height: number;
    birth_date: Date;
    sex: string;
    neck?: number;
    hip?: number;
    waist?: number;
}

@Entity('users')
export class UserModel {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true, nullable: false})
    @Generated("uuid")
    uuid: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: false })
    weight: number;

    @Column({ nullable: false })
    height: number;

    @Column({ type: "date", nullable: false })
    birth_date: Date;

    @Column({ nullable: false })
    sex: string;

    @Column({ nullable: true })
    neck: number;

    @Column({ nullable: true })
    hip: number;

    @Column({ nullable: true })
    waist: number;
}

export class UserRepository {
    private ormRepository: Repository<UserModel>;

    constructor(connection: Connection) {
        this.ormRepository = connection.getRepository(UserModel);
    }

    public async getData(uuid: string): Promise<UserModel | undefined> {
        const user = await this.ormRepository
        .createQueryBuilder()
        .where("uuid = :uuid", { uuid: uuid })
        .cache(true)
        .getOne()

        return user;
    }

    public async create(user: IUser): Promise<UserModel>{
        let userCreated = this.ormRepository.create(user)
        
        let created = await this.ormRepository.save(userCreated)

        return created
    }

    public async update(newUser: IUser): Promise<UserModel>{
        let user = this.ormRepository.create(newUser);
        let userUpdated = await this.ormRepository.save(user);
        return userUpdated;
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }
}