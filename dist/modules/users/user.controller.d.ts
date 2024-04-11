import { UserService } from './user.service';
import { CreateUserDto } from './helpers/create-user.dto';
import { UserEntity } from './helpers/users.entity';
import { UpdateUserDto } from './helpers/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    remove(id: string): Promise<void>;
}
