import { Repository } from 'typeorm';
import { UserEntity } from './helpers/users.entity';
import { CreateUserDto } from './helpers/create-user.dto';
import { UpdateUserDto } from './helpers/update-user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    remove(id: string): Promise<void>;
}
