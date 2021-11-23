interface IUserConstructorDTO {
    nickname: string;
}
declare class User {
    id: string;
    nickname: string;
    created_at: Date;
    constructor({ nickname }: IUserConstructorDTO);
}
export { User };
