import { DMMF, DMMFClass, Engine } from './runtime';
/**
 * Utility Types
 */
export declare type Enumerable<T> = T | Array<T>;
export declare type MergeTruthyValues<R extends object, S extends object> = {
    [key in keyof S | keyof R]: key extends false ? never : key extends keyof S ? S[key] extends false ? never : S[key] : key extends keyof R ? R[key] : never;
};
export declare type CleanupNever<T> = {
    [key in keyof T]: T[key] extends never ? never : key;
}[keyof T];
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PhotonFetcher {
    private readonly photon;
    private readonly engine;
    private readonly debug;
    private readonly hooks?;
    constructor(photon: Photon, engine: Engine, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, path?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}
/**
 * Client
**/
export declare type Datasources = {
    db?: string;
};
export declare type LogLevel = 'INFO' | 'WARN' | 'QUERY';
export declare type LogOption = LogLevel | {
    level: LogLevel;
    /**
     * @default 'stdout'
     */
    emit?: 'event' | 'stdout';
};
export interface PhotonOptions {
    datasources?: Datasources;
    /**
     * @default false
     */
    log?: boolean | LogOption[];
    debug?: any;
    /**
     * You probably don't want to use this. `__internal` is used by internal tooling.
     */
    __internal?: {
        debug?: boolean;
        hooks?: Hooks;
        engine?: {
            cwd?: string;
            binaryPath?: string;
        };
    };
}
export declare type Hooks = {
    beforeRequest?: (options: {
        query: string;
        path: string[];
        rootField?: string;
        typeName?: string;
        document: any;
    }) => any;
};
export declare class Photon {
    private fetcher;
    private readonly dmmf;
    private readonly engine;
    private connectionPromise?;
    constructor(options?: PhotonOptions);
    private connectEngine;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    readonly users: UserDelegate;
    readonly emails: EmailDelegate;
    readonly phones: PhoneDelegate;
    readonly ratings: RatingDelegate;
    readonly depots: DepotDelegate;
    readonly tools: ToolDelegate;
    readonly toolPictures: ToolPictureDelegate;
    readonly rentedTools: RentedToolDelegate;
}
export declare const OrderByArg: {
    asc: "asc";
    desc: "desc";
};
export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg];
export declare const RatingType: {
    Loaner: "Loaner";
    Renter: "Renter";
};
export declare type RatingType = (typeof RatingType)[keyof typeof RatingType];
/**
 * Model User
 */
export declare type User = {
    id: string;
    password_hash: string;
    email: string;
    first_name: string;
    last_name: string;
    birth_date: Date;
};
export declare type UserScalars = 'id' | 'password_hash' | 'email' | 'first_name' | 'last_name' | 'birth_date';
export declare type UserSelect = {
    id?: boolean;
    password_hash?: boolean;
    email?: boolean;
    first_name?: boolean;
    last_name?: boolean;
    birth_date?: boolean;
    emails?: boolean | FindManyEmailSelectArgsOptional;
    phones?: boolean | FindManyPhoneSelectArgsOptional;
    depots?: boolean | FindManyDepotSelectArgsOptional;
    ratings?: boolean | FindManyRatingSelectArgsOptional;
    rentedTools?: boolean | FindManyRentedToolSelectArgsOptional;
};
export declare type UserInclude = {
    emails?: boolean | FindManyEmailIncludeArgsOptional;
    phones?: boolean | FindManyPhoneIncludeArgsOptional;
    depots?: boolean | FindManyDepotIncludeArgsOptional;
    ratings?: boolean | FindManyRatingIncludeArgsOptional;
    rentedTools?: boolean | FindManyRentedToolIncludeArgsOptional;
};
declare type UserDefault = {
    id: true;
    password_hash: true;
    email: true;
    first_name: true;
    last_name: true;
    birth_date: true;
};
declare type UserGetSelectPayload<S extends boolean | UserSelect> = S extends true ? User : S extends UserSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends UserScalars ? User[P] : P extends 'emails' ? Array<EmailGetSelectPayload<ExtractFindManyEmailSelectArgs<S[P]>>> : P extends 'phones' ? Array<PhoneGetSelectPayload<ExtractFindManyPhoneSelectArgs<S[P]>>> : P extends 'depots' ? Array<DepotGetSelectPayload<ExtractFindManyDepotSelectArgs<S[P]>>> : P extends 'ratings' ? Array<RatingGetSelectPayload<ExtractFindManyRatingSelectArgs<S[P]>>> : P extends 'rentedTools' ? Array<RentedToolGetSelectPayload<ExtractFindManyRentedToolSelectArgs<S[P]>>> : never;
} : never;
declare type UserGetIncludePayload<S extends boolean | UserInclude> = S extends true ? User : S extends UserInclude ? {
    [P in CleanupNever<MergeTruthyValues<UserDefault, S>>]: P extends UserScalars ? User[P] : P extends 'emails' ? Array<EmailGetIncludePayload<ExtractFindManyEmailIncludeArgs<S[P]>>> : P extends 'phones' ? Array<PhoneGetIncludePayload<ExtractFindManyPhoneIncludeArgs<S[P]>>> : P extends 'depots' ? Array<DepotGetIncludePayload<ExtractFindManyDepotIncludeArgs<S[P]>>> : P extends 'ratings' ? Array<RatingGetIncludePayload<ExtractFindManyRatingIncludeArgs<S[P]>>> : P extends 'rentedTools' ? Array<RentedToolGetIncludePayload<ExtractFindManyRentedToolIncludeArgs<S[P]>>> : never;
} : never;
export interface UserDelegate {
    <T extends FindManyUserArgs>(args?: Subset<T, FindManyUserArgs>): T extends FindManyUserArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyUserSelectArgs ? Promise<Array<UserGetSelectPayload<ExtractFindManyUserSelectArgs<T>>>> : T extends FindManyUserIncludeArgs ? Promise<Array<UserGetIncludePayload<ExtractFindManyUserIncludeArgs<T>>>> : Promise<Array<User>>;
    findOne<T extends FindOneUserArgs>(args: Subset<T, FindOneUserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneUserSelectArgs ? Promise<UserGetSelectPayload<ExtractFindOneUserSelectArgs<T>> | null> : T extends FindOneUserIncludeArgs ? Promise<UserGetIncludePayload<ExtractFindOneUserIncludeArgs<T>> | null> : UserClient<User | null>;
    findMany<T extends FindManyUserArgs>(args?: Subset<T, FindManyUserArgs>): T extends FindManyUserArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyUserSelectArgs ? Promise<Array<UserGetSelectPayload<ExtractFindManyUserSelectArgs<T>>>> : T extends FindManyUserIncludeArgs ? Promise<Array<UserGetIncludePayload<ExtractFindManyUserIncludeArgs<T>>>> : Promise<Array<User>>;
    create<T extends UserCreateArgs>(args: Subset<T, UserCreateArgs>): T extends UserCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectCreateArgs ? Promise<UserGetSelectPayload<ExtractUserSelectCreateArgs<T>>> : T extends UserIncludeCreateArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeCreateArgs<T>>> : UserClient<User>;
    delete<T extends UserDeleteArgs>(args: Subset<T, UserDeleteArgs>): T extends UserDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectDeleteArgs ? Promise<UserGetSelectPayload<ExtractUserSelectDeleteArgs<T>>> : T extends UserIncludeDeleteArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeDeleteArgs<T>>> : UserClient<User>;
    update<T extends UserUpdateArgs>(args: Subset<T, UserUpdateArgs>): T extends UserUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectUpdateArgs ? Promise<UserGetSelectPayload<ExtractUserSelectUpdateArgs<T>>> : T extends UserIncludeUpdateArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeUpdateArgs<T>>> : UserClient<User>;
    deleteMany<T extends UserDeleteManyArgs>(args: Subset<T, UserDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Subset<T, UserUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends UserUpsertArgs>(args: Subset<T, UserUpsertArgs>): T extends UserUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectUpsertArgs ? Promise<UserGetSelectPayload<ExtractUserSelectUpsertArgs<T>>> : T extends UserIncludeUpsertArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeUpsertArgs<T>>> : UserClient<User>;
    count(): Promise<number>;
}
export declare class UserClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    emails<T extends FindManyEmailArgs = {}>(args?: Subset<T, FindManyEmailArgs>): T extends FindManyEmailArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyEmailSelectArgs ? Promise<Array<EmailGetSelectPayload<ExtractFindManyEmailSelectArgs<T>>>> : T extends FindManyEmailIncludeArgs ? Promise<Array<EmailGetIncludePayload<ExtractFindManyEmailIncludeArgs<T>>>> : Promise<Array<Email>>;
    phones<T extends FindManyPhoneArgs = {}>(args?: Subset<T, FindManyPhoneArgs>): T extends FindManyPhoneArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyPhoneSelectArgs ? Promise<Array<PhoneGetSelectPayload<ExtractFindManyPhoneSelectArgs<T>>>> : T extends FindManyPhoneIncludeArgs ? Promise<Array<PhoneGetIncludePayload<ExtractFindManyPhoneIncludeArgs<T>>>> : Promise<Array<Phone>>;
    depots<T extends FindManyDepotArgs = {}>(args?: Subset<T, FindManyDepotArgs>): T extends FindManyDepotArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyDepotSelectArgs ? Promise<Array<DepotGetSelectPayload<ExtractFindManyDepotSelectArgs<T>>>> : T extends FindManyDepotIncludeArgs ? Promise<Array<DepotGetIncludePayload<ExtractFindManyDepotIncludeArgs<T>>>> : Promise<Array<Depot>>;
    ratings<T extends FindManyRatingArgs = {}>(args?: Subset<T, FindManyRatingArgs>): T extends FindManyRatingArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyRatingSelectArgs ? Promise<Array<RatingGetSelectPayload<ExtractFindManyRatingSelectArgs<T>>>> : T extends FindManyRatingIncludeArgs ? Promise<Array<RatingGetIncludePayload<ExtractFindManyRatingIncludeArgs<T>>>> : Promise<Array<Rating>>;
    rentedTools<T extends FindManyRentedToolArgs = {}>(args?: Subset<T, FindManyRentedToolArgs>): T extends FindManyRentedToolArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyRentedToolSelectArgs ? Promise<Array<RentedToolGetSelectPayload<ExtractFindManyRentedToolSelectArgs<T>>>> : T extends FindManyRentedToolIncludeArgs ? Promise<Array<RentedToolGetIncludePayload<ExtractFindManyRentedToolIncludeArgs<T>>>> : Promise<Array<RentedTool>>;
    private readonly _document;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * User findOne
 */
export declare type FindOneUserArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserSelectArgs = {
    select: UserSelect;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserSelectArgsOptional = {
    select?: UserSelect | null;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserIncludeArgs = {
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserIncludeArgsOptional = {
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type ExtractFindOneUserSelectArgs<S extends undefined | boolean | FindOneUserSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneUserSelectArgs ? S['select'] : true;
export declare type ExtractFindOneUserIncludeArgs<S extends undefined | boolean | FindOneUserIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneUserIncludeArgs ? S['include'] : true;
/**
 * User findMany
 */
export declare type FindManyUserArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserSelectArgs = {
    select: UserSelect;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserSelectArgsOptional = {
    select?: UserSelect | null;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserIncludeArgs = {
    include: UserInclude;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserIncludeArgsOptional = {
    include?: UserInclude | null;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyUserSelectArgs<S extends undefined | boolean | FindManyUserSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyUserSelectArgs ? S['select'] : true;
export declare type ExtractFindManyUserIncludeArgs<S extends undefined | boolean | FindManyUserIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyUserIncludeArgs ? S['include'] : true;
/**
 * User create
 */
export declare type UserCreateArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    data: UserCreateInput;
};
export declare type UserCreateArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    data: UserCreateInput;
};
export declare type UserSelectCreateArgs = {
    select: UserSelect;
    data: UserCreateInput;
};
export declare type UserSelectCreateArgsOptional = {
    select?: UserSelect | null;
    data: UserCreateInput;
};
export declare type UserIncludeCreateArgs = {
    include: UserInclude;
    data: UserCreateInput;
};
export declare type UserIncludeCreateArgsOptional = {
    include?: UserInclude | null;
    data: UserCreateInput;
};
export declare type ExtractUserSelectCreateArgs<S extends undefined | boolean | UserSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectCreateArgs ? S['select'] : true;
export declare type ExtractUserIncludeCreateArgs<S extends undefined | boolean | UserIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeCreateArgs ? S['include'] : true;
/**
 * User update
 */
export declare type UserUpdateArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserUpdateArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserSelectUpdateArgs = {
    select: UserSelect;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserSelectUpdateArgsOptional = {
    select?: UserSelect | null;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeUpdateArgs = {
    include: UserInclude;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeUpdateArgsOptional = {
    include?: UserInclude | null;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type ExtractUserSelectUpdateArgs<S extends undefined | boolean | UserSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectUpdateArgs ? S['select'] : true;
export declare type ExtractUserIncludeUpdateArgs<S extends undefined | boolean | UserIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeUpdateArgs ? S['include'] : true;
/**
 * User updateMany
 */
export declare type UserUpdateManyArgs = {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput | null;
};
/**
 * User upsert
 */
export declare type UserUpsertArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserUpsertArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserSelectUpsertArgs = {
    select: UserSelect;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserSelectUpsertArgsOptional = {
    select?: UserSelect | null;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserIncludeUpsertArgs = {
    include: UserInclude;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserIncludeUpsertArgsOptional = {
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type ExtractUserSelectUpsertArgs<S extends undefined | boolean | UserSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectUpsertArgs ? S['select'] : true;
export declare type ExtractUserIncludeUpsertArgs<S extends undefined | boolean | UserIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeUpsertArgs ? S['include'] : true;
/**
 * User delete
 */
export declare type UserDeleteArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type UserDeleteArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type UserSelectDeleteArgs = {
    select: UserSelect;
    where: UserWhereUniqueInput;
};
export declare type UserSelectDeleteArgsOptional = {
    select?: UserSelect | null;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeDeleteArgs = {
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeDeleteArgsOptional = {
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type ExtractUserSelectDeleteArgs<S extends undefined | boolean | UserSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectDeleteArgs ? S['select'] : true;
export declare type ExtractUserIncludeDeleteArgs<S extends undefined | boolean | UserIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeDeleteArgs ? S['include'] : true;
/**
 * User deleteMany
 */
export declare type UserDeleteManyArgs = {
    where?: UserWhereInput | null;
};
/**
 * User without action
 */
export declare type UserArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
};
export declare type UserArgsRequired = {
    select: UserSelect;
    include: UserInclude;
};
export declare type UserSelectArgs = {
    select: UserSelect;
};
export declare type UserSelectArgsOptional = {
    select?: UserSelect | null;
};
export declare type UserIncludeArgs = {
    include: UserInclude;
};
export declare type UserIncludeArgsOptional = {
    include?: UserInclude | null;
};
export declare type ExtractUserSelectArgs<S extends undefined | boolean | UserSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectArgs ? S['select'] : true;
export declare type ExtractUserIncludeArgs<S extends undefined | boolean | UserIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeArgs ? S['include'] : true;
/**
 * Model Email
 */
export declare type Email = {
    id: string;
    address: string;
    purpose: string | null;
};
export declare type EmailScalars = 'id' | 'address' | 'purpose';
export declare type EmailSelect = {
    id?: boolean;
    address?: boolean;
    purpose?: boolean;
    owner?: boolean | UserSelectArgsOptional;
};
export declare type EmailInclude = {
    owner?: boolean | UserIncludeArgsOptional;
};
declare type EmailDefault = {
    id: true;
    address: true;
    purpose: true;
};
declare type EmailGetSelectPayload<S extends boolean | EmailSelect> = S extends true ? Email : S extends EmailSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends EmailScalars ? Email[P] : P extends 'owner' ? UserGetSelectPayload<ExtractUserSelectArgs<S[P]>> : never;
} : never;
declare type EmailGetIncludePayload<S extends boolean | EmailInclude> = S extends true ? Email : S extends EmailInclude ? {
    [P in CleanupNever<MergeTruthyValues<EmailDefault, S>>]: P extends EmailScalars ? Email[P] : P extends 'owner' ? UserGetIncludePayload<ExtractUserIncludeArgs<S[P]>> : never;
} : never;
export interface EmailDelegate {
    <T extends FindManyEmailArgs>(args?: Subset<T, FindManyEmailArgs>): T extends FindManyEmailArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyEmailSelectArgs ? Promise<Array<EmailGetSelectPayload<ExtractFindManyEmailSelectArgs<T>>>> : T extends FindManyEmailIncludeArgs ? Promise<Array<EmailGetIncludePayload<ExtractFindManyEmailIncludeArgs<T>>>> : Promise<Array<Email>>;
    findOne<T extends FindOneEmailArgs>(args: Subset<T, FindOneEmailArgs>): T extends FindOneEmailArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneEmailSelectArgs ? Promise<EmailGetSelectPayload<ExtractFindOneEmailSelectArgs<T>> | null> : T extends FindOneEmailIncludeArgs ? Promise<EmailGetIncludePayload<ExtractFindOneEmailIncludeArgs<T>> | null> : EmailClient<Email | null>;
    findMany<T extends FindManyEmailArgs>(args?: Subset<T, FindManyEmailArgs>): T extends FindManyEmailArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyEmailSelectArgs ? Promise<Array<EmailGetSelectPayload<ExtractFindManyEmailSelectArgs<T>>>> : T extends FindManyEmailIncludeArgs ? Promise<Array<EmailGetIncludePayload<ExtractFindManyEmailIncludeArgs<T>>>> : Promise<Array<Email>>;
    create<T extends EmailCreateArgs>(args: Subset<T, EmailCreateArgs>): T extends EmailCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends EmailSelectCreateArgs ? Promise<EmailGetSelectPayload<ExtractEmailSelectCreateArgs<T>>> : T extends EmailIncludeCreateArgs ? Promise<EmailGetIncludePayload<ExtractEmailIncludeCreateArgs<T>>> : EmailClient<Email>;
    delete<T extends EmailDeleteArgs>(args: Subset<T, EmailDeleteArgs>): T extends EmailDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends EmailSelectDeleteArgs ? Promise<EmailGetSelectPayload<ExtractEmailSelectDeleteArgs<T>>> : T extends EmailIncludeDeleteArgs ? Promise<EmailGetIncludePayload<ExtractEmailIncludeDeleteArgs<T>>> : EmailClient<Email>;
    update<T extends EmailUpdateArgs>(args: Subset<T, EmailUpdateArgs>): T extends EmailUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends EmailSelectUpdateArgs ? Promise<EmailGetSelectPayload<ExtractEmailSelectUpdateArgs<T>>> : T extends EmailIncludeUpdateArgs ? Promise<EmailGetIncludePayload<ExtractEmailIncludeUpdateArgs<T>>> : EmailClient<Email>;
    deleteMany<T extends EmailDeleteManyArgs>(args: Subset<T, EmailDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends EmailUpdateManyArgs>(args: Subset<T, EmailUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends EmailUpsertArgs>(args: Subset<T, EmailUpsertArgs>): T extends EmailUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends EmailSelectUpsertArgs ? Promise<EmailGetSelectPayload<ExtractEmailSelectUpsertArgs<T>>> : T extends EmailIncludeUpsertArgs ? Promise<EmailGetIncludePayload<ExtractEmailIncludeUpsertArgs<T>>> : EmailClient<Email>;
    count(): Promise<number>;
}
export declare class EmailClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    owner<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectArgs ? Promise<UserGetSelectPayload<ExtractUserSelectArgs<T>> | null> : T extends UserIncludeArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeArgs<T>> | null> : UserClient<User | null>;
    private readonly _document;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * Email findOne
 */
export declare type FindOneEmailArgs = {
    select?: EmailSelect | null;
    include?: EmailInclude | null;
    where: EmailWhereUniqueInput;
};
export declare type FindOneEmailArgsRequired = {
    select: EmailSelect;
    include: EmailInclude;
    where: EmailWhereUniqueInput;
};
export declare type FindOneEmailSelectArgs = {
    select: EmailSelect;
    where: EmailWhereUniqueInput;
};
export declare type FindOneEmailSelectArgsOptional = {
    select?: EmailSelect | null;
    where: EmailWhereUniqueInput;
};
export declare type FindOneEmailIncludeArgs = {
    include: EmailInclude;
    where: EmailWhereUniqueInput;
};
export declare type FindOneEmailIncludeArgsOptional = {
    include?: EmailInclude | null;
    where: EmailWhereUniqueInput;
};
export declare type ExtractFindOneEmailSelectArgs<S extends undefined | boolean | FindOneEmailSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneEmailSelectArgs ? S['select'] : true;
export declare type ExtractFindOneEmailIncludeArgs<S extends undefined | boolean | FindOneEmailIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneEmailIncludeArgs ? S['include'] : true;
/**
 * Email findMany
 */
export declare type FindManyEmailArgs = {
    select?: EmailSelect | null;
    include?: EmailInclude | null;
    where?: EmailWhereInput | null;
    orderBy?: EmailOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyEmailArgsRequired = {
    select: EmailSelect;
    include: EmailInclude;
    where?: EmailWhereInput | null;
    orderBy?: EmailOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyEmailSelectArgs = {
    select: EmailSelect;
    where?: EmailWhereInput | null;
    orderBy?: EmailOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyEmailSelectArgsOptional = {
    select?: EmailSelect | null;
    where?: EmailWhereInput | null;
    orderBy?: EmailOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyEmailIncludeArgs = {
    include: EmailInclude;
    where?: EmailWhereInput | null;
    orderBy?: EmailOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyEmailIncludeArgsOptional = {
    include?: EmailInclude | null;
    where?: EmailWhereInput | null;
    orderBy?: EmailOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyEmailSelectArgs<S extends undefined | boolean | FindManyEmailSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyEmailSelectArgs ? S['select'] : true;
export declare type ExtractFindManyEmailIncludeArgs<S extends undefined | boolean | FindManyEmailIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyEmailIncludeArgs ? S['include'] : true;
/**
 * Email create
 */
export declare type EmailCreateArgs = {
    select?: EmailSelect | null;
    include?: EmailInclude | null;
    data: EmailCreateInput;
};
export declare type EmailCreateArgsRequired = {
    select: EmailSelect;
    include: EmailInclude;
    data: EmailCreateInput;
};
export declare type EmailSelectCreateArgs = {
    select: EmailSelect;
    data: EmailCreateInput;
};
export declare type EmailSelectCreateArgsOptional = {
    select?: EmailSelect | null;
    data: EmailCreateInput;
};
export declare type EmailIncludeCreateArgs = {
    include: EmailInclude;
    data: EmailCreateInput;
};
export declare type EmailIncludeCreateArgsOptional = {
    include?: EmailInclude | null;
    data: EmailCreateInput;
};
export declare type ExtractEmailSelectCreateArgs<S extends undefined | boolean | EmailSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends EmailSelectCreateArgs ? S['select'] : true;
export declare type ExtractEmailIncludeCreateArgs<S extends undefined | boolean | EmailIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends EmailIncludeCreateArgs ? S['include'] : true;
/**
 * Email update
 */
export declare type EmailUpdateArgs = {
    select?: EmailSelect | null;
    include?: EmailInclude | null;
    data: EmailUpdateInput;
    where: EmailWhereUniqueInput;
};
export declare type EmailUpdateArgsRequired = {
    select: EmailSelect;
    include: EmailInclude;
    data: EmailUpdateInput;
    where: EmailWhereUniqueInput;
};
export declare type EmailSelectUpdateArgs = {
    select: EmailSelect;
    data: EmailUpdateInput;
    where: EmailWhereUniqueInput;
};
export declare type EmailSelectUpdateArgsOptional = {
    select?: EmailSelect | null;
    data: EmailUpdateInput;
    where: EmailWhereUniqueInput;
};
export declare type EmailIncludeUpdateArgs = {
    include: EmailInclude;
    data: EmailUpdateInput;
    where: EmailWhereUniqueInput;
};
export declare type EmailIncludeUpdateArgsOptional = {
    include?: EmailInclude | null;
    data: EmailUpdateInput;
    where: EmailWhereUniqueInput;
};
export declare type ExtractEmailSelectUpdateArgs<S extends undefined | boolean | EmailSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends EmailSelectUpdateArgs ? S['select'] : true;
export declare type ExtractEmailIncludeUpdateArgs<S extends undefined | boolean | EmailIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends EmailIncludeUpdateArgs ? S['include'] : true;
/**
 * Email updateMany
 */
export declare type EmailUpdateManyArgs = {
    data: EmailUpdateManyMutationInput;
    where?: EmailWhereInput | null;
};
/**
 * Email upsert
 */
export declare type EmailUpsertArgs = {
    select?: EmailSelect | null;
    include?: EmailInclude | null;
    where: EmailWhereUniqueInput;
    create: EmailCreateInput;
    update: EmailUpdateInput;
};
export declare type EmailUpsertArgsRequired = {
    select: EmailSelect;
    include: EmailInclude;
    where: EmailWhereUniqueInput;
    create: EmailCreateInput;
    update: EmailUpdateInput;
};
export declare type EmailSelectUpsertArgs = {
    select: EmailSelect;
    where: EmailWhereUniqueInput;
    create: EmailCreateInput;
    update: EmailUpdateInput;
};
export declare type EmailSelectUpsertArgsOptional = {
    select?: EmailSelect | null;
    where: EmailWhereUniqueInput;
    create: EmailCreateInput;
    update: EmailUpdateInput;
};
export declare type EmailIncludeUpsertArgs = {
    include: EmailInclude;
    where: EmailWhereUniqueInput;
    create: EmailCreateInput;
    update: EmailUpdateInput;
};
export declare type EmailIncludeUpsertArgsOptional = {
    include?: EmailInclude | null;
    where: EmailWhereUniqueInput;
    create: EmailCreateInput;
    update: EmailUpdateInput;
};
export declare type ExtractEmailSelectUpsertArgs<S extends undefined | boolean | EmailSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends EmailSelectUpsertArgs ? S['select'] : true;
export declare type ExtractEmailIncludeUpsertArgs<S extends undefined | boolean | EmailIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends EmailIncludeUpsertArgs ? S['include'] : true;
/**
 * Email delete
 */
export declare type EmailDeleteArgs = {
    select?: EmailSelect | null;
    include?: EmailInclude | null;
    where: EmailWhereUniqueInput;
};
export declare type EmailDeleteArgsRequired = {
    select: EmailSelect;
    include: EmailInclude;
    where: EmailWhereUniqueInput;
};
export declare type EmailSelectDeleteArgs = {
    select: EmailSelect;
    where: EmailWhereUniqueInput;
};
export declare type EmailSelectDeleteArgsOptional = {
    select?: EmailSelect | null;
    where: EmailWhereUniqueInput;
};
export declare type EmailIncludeDeleteArgs = {
    include: EmailInclude;
    where: EmailWhereUniqueInput;
};
export declare type EmailIncludeDeleteArgsOptional = {
    include?: EmailInclude | null;
    where: EmailWhereUniqueInput;
};
export declare type ExtractEmailSelectDeleteArgs<S extends undefined | boolean | EmailSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends EmailSelectDeleteArgs ? S['select'] : true;
export declare type ExtractEmailIncludeDeleteArgs<S extends undefined | boolean | EmailIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends EmailIncludeDeleteArgs ? S['include'] : true;
/**
 * Email deleteMany
 */
export declare type EmailDeleteManyArgs = {
    where?: EmailWhereInput | null;
};
/**
 * Email without action
 */
export declare type EmailArgs = {
    select?: EmailSelect | null;
    include?: EmailInclude | null;
};
export declare type EmailArgsRequired = {
    select: EmailSelect;
    include: EmailInclude;
};
export declare type EmailSelectArgs = {
    select: EmailSelect;
};
export declare type EmailSelectArgsOptional = {
    select?: EmailSelect | null;
};
export declare type EmailIncludeArgs = {
    include: EmailInclude;
};
export declare type EmailIncludeArgsOptional = {
    include?: EmailInclude | null;
};
export declare type ExtractEmailSelectArgs<S extends undefined | boolean | EmailSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends EmailSelectArgs ? S['select'] : true;
export declare type ExtractEmailIncludeArgs<S extends undefined | boolean | EmailIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends EmailIncludeArgs ? S['include'] : true;
/**
 * Model Phone
 */
export declare type Phone = {
    id: string;
    num: string;
    purpose: string | null;
};
export declare type PhoneScalars = 'id' | 'num' | 'purpose';
export declare type PhoneSelect = {
    id?: boolean;
    num?: boolean;
    purpose?: boolean;
    owner?: boolean | UserSelectArgsOptional;
};
export declare type PhoneInclude = {
    owner?: boolean | UserIncludeArgsOptional;
};
declare type PhoneDefault = {
    id: true;
    num: true;
    purpose: true;
};
declare type PhoneGetSelectPayload<S extends boolean | PhoneSelect> = S extends true ? Phone : S extends PhoneSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends PhoneScalars ? Phone[P] : P extends 'owner' ? UserGetSelectPayload<ExtractUserSelectArgs<S[P]>> : never;
} : never;
declare type PhoneGetIncludePayload<S extends boolean | PhoneInclude> = S extends true ? Phone : S extends PhoneInclude ? {
    [P in CleanupNever<MergeTruthyValues<PhoneDefault, S>>]: P extends PhoneScalars ? Phone[P] : P extends 'owner' ? UserGetIncludePayload<ExtractUserIncludeArgs<S[P]>> : never;
} : never;
export interface PhoneDelegate {
    <T extends FindManyPhoneArgs>(args?: Subset<T, FindManyPhoneArgs>): T extends FindManyPhoneArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyPhoneSelectArgs ? Promise<Array<PhoneGetSelectPayload<ExtractFindManyPhoneSelectArgs<T>>>> : T extends FindManyPhoneIncludeArgs ? Promise<Array<PhoneGetIncludePayload<ExtractFindManyPhoneIncludeArgs<T>>>> : Promise<Array<Phone>>;
    findOne<T extends FindOnePhoneArgs>(args: Subset<T, FindOnePhoneArgs>): T extends FindOnePhoneArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOnePhoneSelectArgs ? Promise<PhoneGetSelectPayload<ExtractFindOnePhoneSelectArgs<T>> | null> : T extends FindOnePhoneIncludeArgs ? Promise<PhoneGetIncludePayload<ExtractFindOnePhoneIncludeArgs<T>> | null> : PhoneClient<Phone | null>;
    findMany<T extends FindManyPhoneArgs>(args?: Subset<T, FindManyPhoneArgs>): T extends FindManyPhoneArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyPhoneSelectArgs ? Promise<Array<PhoneGetSelectPayload<ExtractFindManyPhoneSelectArgs<T>>>> : T extends FindManyPhoneIncludeArgs ? Promise<Array<PhoneGetIncludePayload<ExtractFindManyPhoneIncludeArgs<T>>>> : Promise<Array<Phone>>;
    create<T extends PhoneCreateArgs>(args: Subset<T, PhoneCreateArgs>): T extends PhoneCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends PhoneSelectCreateArgs ? Promise<PhoneGetSelectPayload<ExtractPhoneSelectCreateArgs<T>>> : T extends PhoneIncludeCreateArgs ? Promise<PhoneGetIncludePayload<ExtractPhoneIncludeCreateArgs<T>>> : PhoneClient<Phone>;
    delete<T extends PhoneDeleteArgs>(args: Subset<T, PhoneDeleteArgs>): T extends PhoneDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends PhoneSelectDeleteArgs ? Promise<PhoneGetSelectPayload<ExtractPhoneSelectDeleteArgs<T>>> : T extends PhoneIncludeDeleteArgs ? Promise<PhoneGetIncludePayload<ExtractPhoneIncludeDeleteArgs<T>>> : PhoneClient<Phone>;
    update<T extends PhoneUpdateArgs>(args: Subset<T, PhoneUpdateArgs>): T extends PhoneUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends PhoneSelectUpdateArgs ? Promise<PhoneGetSelectPayload<ExtractPhoneSelectUpdateArgs<T>>> : T extends PhoneIncludeUpdateArgs ? Promise<PhoneGetIncludePayload<ExtractPhoneIncludeUpdateArgs<T>>> : PhoneClient<Phone>;
    deleteMany<T extends PhoneDeleteManyArgs>(args: Subset<T, PhoneDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends PhoneUpdateManyArgs>(args: Subset<T, PhoneUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends PhoneUpsertArgs>(args: Subset<T, PhoneUpsertArgs>): T extends PhoneUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends PhoneSelectUpsertArgs ? Promise<PhoneGetSelectPayload<ExtractPhoneSelectUpsertArgs<T>>> : T extends PhoneIncludeUpsertArgs ? Promise<PhoneGetIncludePayload<ExtractPhoneIncludeUpsertArgs<T>>> : PhoneClient<Phone>;
    count(): Promise<number>;
}
export declare class PhoneClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    owner<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectArgs ? Promise<UserGetSelectPayload<ExtractUserSelectArgs<T>> | null> : T extends UserIncludeArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeArgs<T>> | null> : UserClient<User | null>;
    private readonly _document;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * Phone findOne
 */
export declare type FindOnePhoneArgs = {
    select?: PhoneSelect | null;
    include?: PhoneInclude | null;
    where: PhoneWhereUniqueInput;
};
export declare type FindOnePhoneArgsRequired = {
    select: PhoneSelect;
    include: PhoneInclude;
    where: PhoneWhereUniqueInput;
};
export declare type FindOnePhoneSelectArgs = {
    select: PhoneSelect;
    where: PhoneWhereUniqueInput;
};
export declare type FindOnePhoneSelectArgsOptional = {
    select?: PhoneSelect | null;
    where: PhoneWhereUniqueInput;
};
export declare type FindOnePhoneIncludeArgs = {
    include: PhoneInclude;
    where: PhoneWhereUniqueInput;
};
export declare type FindOnePhoneIncludeArgsOptional = {
    include?: PhoneInclude | null;
    where: PhoneWhereUniqueInput;
};
export declare type ExtractFindOnePhoneSelectArgs<S extends undefined | boolean | FindOnePhoneSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOnePhoneSelectArgs ? S['select'] : true;
export declare type ExtractFindOnePhoneIncludeArgs<S extends undefined | boolean | FindOnePhoneIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOnePhoneIncludeArgs ? S['include'] : true;
/**
 * Phone findMany
 */
export declare type FindManyPhoneArgs = {
    select?: PhoneSelect | null;
    include?: PhoneInclude | null;
    where?: PhoneWhereInput | null;
    orderBy?: PhoneOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPhoneArgsRequired = {
    select: PhoneSelect;
    include: PhoneInclude;
    where?: PhoneWhereInput | null;
    orderBy?: PhoneOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPhoneSelectArgs = {
    select: PhoneSelect;
    where?: PhoneWhereInput | null;
    orderBy?: PhoneOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPhoneSelectArgsOptional = {
    select?: PhoneSelect | null;
    where?: PhoneWhereInput | null;
    orderBy?: PhoneOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPhoneIncludeArgs = {
    include: PhoneInclude;
    where?: PhoneWhereInput | null;
    orderBy?: PhoneOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyPhoneIncludeArgsOptional = {
    include?: PhoneInclude | null;
    where?: PhoneWhereInput | null;
    orderBy?: PhoneOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyPhoneSelectArgs<S extends undefined | boolean | FindManyPhoneSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyPhoneSelectArgs ? S['select'] : true;
export declare type ExtractFindManyPhoneIncludeArgs<S extends undefined | boolean | FindManyPhoneIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyPhoneIncludeArgs ? S['include'] : true;
/**
 * Phone create
 */
export declare type PhoneCreateArgs = {
    select?: PhoneSelect | null;
    include?: PhoneInclude | null;
    data: PhoneCreateInput;
};
export declare type PhoneCreateArgsRequired = {
    select: PhoneSelect;
    include: PhoneInclude;
    data: PhoneCreateInput;
};
export declare type PhoneSelectCreateArgs = {
    select: PhoneSelect;
    data: PhoneCreateInput;
};
export declare type PhoneSelectCreateArgsOptional = {
    select?: PhoneSelect | null;
    data: PhoneCreateInput;
};
export declare type PhoneIncludeCreateArgs = {
    include: PhoneInclude;
    data: PhoneCreateInput;
};
export declare type PhoneIncludeCreateArgsOptional = {
    include?: PhoneInclude | null;
    data: PhoneCreateInput;
};
export declare type ExtractPhoneSelectCreateArgs<S extends undefined | boolean | PhoneSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PhoneSelectCreateArgs ? S['select'] : true;
export declare type ExtractPhoneIncludeCreateArgs<S extends undefined | boolean | PhoneIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PhoneIncludeCreateArgs ? S['include'] : true;
/**
 * Phone update
 */
export declare type PhoneUpdateArgs = {
    select?: PhoneSelect | null;
    include?: PhoneInclude | null;
    data: PhoneUpdateInput;
    where: PhoneWhereUniqueInput;
};
export declare type PhoneUpdateArgsRequired = {
    select: PhoneSelect;
    include: PhoneInclude;
    data: PhoneUpdateInput;
    where: PhoneWhereUniqueInput;
};
export declare type PhoneSelectUpdateArgs = {
    select: PhoneSelect;
    data: PhoneUpdateInput;
    where: PhoneWhereUniqueInput;
};
export declare type PhoneSelectUpdateArgsOptional = {
    select?: PhoneSelect | null;
    data: PhoneUpdateInput;
    where: PhoneWhereUniqueInput;
};
export declare type PhoneIncludeUpdateArgs = {
    include: PhoneInclude;
    data: PhoneUpdateInput;
    where: PhoneWhereUniqueInput;
};
export declare type PhoneIncludeUpdateArgsOptional = {
    include?: PhoneInclude | null;
    data: PhoneUpdateInput;
    where: PhoneWhereUniqueInput;
};
export declare type ExtractPhoneSelectUpdateArgs<S extends undefined | boolean | PhoneSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PhoneSelectUpdateArgs ? S['select'] : true;
export declare type ExtractPhoneIncludeUpdateArgs<S extends undefined | boolean | PhoneIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PhoneIncludeUpdateArgs ? S['include'] : true;
/**
 * Phone updateMany
 */
export declare type PhoneUpdateManyArgs = {
    data: PhoneUpdateManyMutationInput;
    where?: PhoneWhereInput | null;
};
/**
 * Phone upsert
 */
export declare type PhoneUpsertArgs = {
    select?: PhoneSelect | null;
    include?: PhoneInclude | null;
    where: PhoneWhereUniqueInput;
    create: PhoneCreateInput;
    update: PhoneUpdateInput;
};
export declare type PhoneUpsertArgsRequired = {
    select: PhoneSelect;
    include: PhoneInclude;
    where: PhoneWhereUniqueInput;
    create: PhoneCreateInput;
    update: PhoneUpdateInput;
};
export declare type PhoneSelectUpsertArgs = {
    select: PhoneSelect;
    where: PhoneWhereUniqueInput;
    create: PhoneCreateInput;
    update: PhoneUpdateInput;
};
export declare type PhoneSelectUpsertArgsOptional = {
    select?: PhoneSelect | null;
    where: PhoneWhereUniqueInput;
    create: PhoneCreateInput;
    update: PhoneUpdateInput;
};
export declare type PhoneIncludeUpsertArgs = {
    include: PhoneInclude;
    where: PhoneWhereUniqueInput;
    create: PhoneCreateInput;
    update: PhoneUpdateInput;
};
export declare type PhoneIncludeUpsertArgsOptional = {
    include?: PhoneInclude | null;
    where: PhoneWhereUniqueInput;
    create: PhoneCreateInput;
    update: PhoneUpdateInput;
};
export declare type ExtractPhoneSelectUpsertArgs<S extends undefined | boolean | PhoneSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PhoneSelectUpsertArgs ? S['select'] : true;
export declare type ExtractPhoneIncludeUpsertArgs<S extends undefined | boolean | PhoneIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PhoneIncludeUpsertArgs ? S['include'] : true;
/**
 * Phone delete
 */
export declare type PhoneDeleteArgs = {
    select?: PhoneSelect | null;
    include?: PhoneInclude | null;
    where: PhoneWhereUniqueInput;
};
export declare type PhoneDeleteArgsRequired = {
    select: PhoneSelect;
    include: PhoneInclude;
    where: PhoneWhereUniqueInput;
};
export declare type PhoneSelectDeleteArgs = {
    select: PhoneSelect;
    where: PhoneWhereUniqueInput;
};
export declare type PhoneSelectDeleteArgsOptional = {
    select?: PhoneSelect | null;
    where: PhoneWhereUniqueInput;
};
export declare type PhoneIncludeDeleteArgs = {
    include: PhoneInclude;
    where: PhoneWhereUniqueInput;
};
export declare type PhoneIncludeDeleteArgsOptional = {
    include?: PhoneInclude | null;
    where: PhoneWhereUniqueInput;
};
export declare type ExtractPhoneSelectDeleteArgs<S extends undefined | boolean | PhoneSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PhoneSelectDeleteArgs ? S['select'] : true;
export declare type ExtractPhoneIncludeDeleteArgs<S extends undefined | boolean | PhoneIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PhoneIncludeDeleteArgs ? S['include'] : true;
/**
 * Phone deleteMany
 */
export declare type PhoneDeleteManyArgs = {
    where?: PhoneWhereInput | null;
};
/**
 * Phone without action
 */
export declare type PhoneArgs = {
    select?: PhoneSelect | null;
    include?: PhoneInclude | null;
};
export declare type PhoneArgsRequired = {
    select: PhoneSelect;
    include: PhoneInclude;
};
export declare type PhoneSelectArgs = {
    select: PhoneSelect;
};
export declare type PhoneSelectArgsOptional = {
    select?: PhoneSelect | null;
};
export declare type PhoneIncludeArgs = {
    include: PhoneInclude;
};
export declare type PhoneIncludeArgsOptional = {
    include?: PhoneInclude | null;
};
export declare type ExtractPhoneSelectArgs<S extends undefined | boolean | PhoneSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PhoneSelectArgs ? S['select'] : true;
export declare type ExtractPhoneIncludeArgs<S extends undefined | boolean | PhoneIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends PhoneIncludeArgs ? S['include'] : true;
/**
 * Model Rating
 */
export declare type Rating = {
    id: string;
    point: number;
    type: RatingType;
    comment: string | null;
};
export declare type RatingScalars = 'id' | 'point' | 'type' | 'comment';
export declare type RatingSelect = {
    id?: boolean;
    point?: boolean;
    type?: boolean;
    comment?: boolean;
    user?: boolean | UserSelectArgsOptional;
};
export declare type RatingInclude = {
    user?: boolean | UserIncludeArgsOptional;
};
declare type RatingDefault = {
    id: true;
    point: true;
    type: true;
    comment: true;
};
declare type RatingGetSelectPayload<S extends boolean | RatingSelect> = S extends true ? Rating : S extends RatingSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends RatingScalars ? Rating[P] : P extends 'user' ? UserGetSelectPayload<ExtractUserSelectArgs<S[P]>> : never;
} : never;
declare type RatingGetIncludePayload<S extends boolean | RatingInclude> = S extends true ? Rating : S extends RatingInclude ? {
    [P in CleanupNever<MergeTruthyValues<RatingDefault, S>>]: P extends RatingScalars ? Rating[P] : P extends 'user' ? UserGetIncludePayload<ExtractUserIncludeArgs<S[P]>> : never;
} : never;
export interface RatingDelegate {
    <T extends FindManyRatingArgs>(args?: Subset<T, FindManyRatingArgs>): T extends FindManyRatingArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyRatingSelectArgs ? Promise<Array<RatingGetSelectPayload<ExtractFindManyRatingSelectArgs<T>>>> : T extends FindManyRatingIncludeArgs ? Promise<Array<RatingGetIncludePayload<ExtractFindManyRatingIncludeArgs<T>>>> : Promise<Array<Rating>>;
    findOne<T extends FindOneRatingArgs>(args: Subset<T, FindOneRatingArgs>): T extends FindOneRatingArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneRatingSelectArgs ? Promise<RatingGetSelectPayload<ExtractFindOneRatingSelectArgs<T>> | null> : T extends FindOneRatingIncludeArgs ? Promise<RatingGetIncludePayload<ExtractFindOneRatingIncludeArgs<T>> | null> : RatingClient<Rating | null>;
    findMany<T extends FindManyRatingArgs>(args?: Subset<T, FindManyRatingArgs>): T extends FindManyRatingArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyRatingSelectArgs ? Promise<Array<RatingGetSelectPayload<ExtractFindManyRatingSelectArgs<T>>>> : T extends FindManyRatingIncludeArgs ? Promise<Array<RatingGetIncludePayload<ExtractFindManyRatingIncludeArgs<T>>>> : Promise<Array<Rating>>;
    create<T extends RatingCreateArgs>(args: Subset<T, RatingCreateArgs>): T extends RatingCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends RatingSelectCreateArgs ? Promise<RatingGetSelectPayload<ExtractRatingSelectCreateArgs<T>>> : T extends RatingIncludeCreateArgs ? Promise<RatingGetIncludePayload<ExtractRatingIncludeCreateArgs<T>>> : RatingClient<Rating>;
    delete<T extends RatingDeleteArgs>(args: Subset<T, RatingDeleteArgs>): T extends RatingDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends RatingSelectDeleteArgs ? Promise<RatingGetSelectPayload<ExtractRatingSelectDeleteArgs<T>>> : T extends RatingIncludeDeleteArgs ? Promise<RatingGetIncludePayload<ExtractRatingIncludeDeleteArgs<T>>> : RatingClient<Rating>;
    update<T extends RatingUpdateArgs>(args: Subset<T, RatingUpdateArgs>): T extends RatingUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends RatingSelectUpdateArgs ? Promise<RatingGetSelectPayload<ExtractRatingSelectUpdateArgs<T>>> : T extends RatingIncludeUpdateArgs ? Promise<RatingGetIncludePayload<ExtractRatingIncludeUpdateArgs<T>>> : RatingClient<Rating>;
    deleteMany<T extends RatingDeleteManyArgs>(args: Subset<T, RatingDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends RatingUpdateManyArgs>(args: Subset<T, RatingUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends RatingUpsertArgs>(args: Subset<T, RatingUpsertArgs>): T extends RatingUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends RatingSelectUpsertArgs ? Promise<RatingGetSelectPayload<ExtractRatingSelectUpsertArgs<T>>> : T extends RatingIncludeUpsertArgs ? Promise<RatingGetIncludePayload<ExtractRatingIncludeUpsertArgs<T>>> : RatingClient<Rating>;
    count(): Promise<number>;
}
export declare class RatingClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectArgs ? Promise<UserGetSelectPayload<ExtractUserSelectArgs<T>> | null> : T extends UserIncludeArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeArgs<T>> | null> : UserClient<User | null>;
    private readonly _document;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * Rating findOne
 */
export declare type FindOneRatingArgs = {
    select?: RatingSelect | null;
    include?: RatingInclude | null;
    where: RatingWhereUniqueInput;
};
export declare type FindOneRatingArgsRequired = {
    select: RatingSelect;
    include: RatingInclude;
    where: RatingWhereUniqueInput;
};
export declare type FindOneRatingSelectArgs = {
    select: RatingSelect;
    where: RatingWhereUniqueInput;
};
export declare type FindOneRatingSelectArgsOptional = {
    select?: RatingSelect | null;
    where: RatingWhereUniqueInput;
};
export declare type FindOneRatingIncludeArgs = {
    include: RatingInclude;
    where: RatingWhereUniqueInput;
};
export declare type FindOneRatingIncludeArgsOptional = {
    include?: RatingInclude | null;
    where: RatingWhereUniqueInput;
};
export declare type ExtractFindOneRatingSelectArgs<S extends undefined | boolean | FindOneRatingSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneRatingSelectArgs ? S['select'] : true;
export declare type ExtractFindOneRatingIncludeArgs<S extends undefined | boolean | FindOneRatingIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneRatingIncludeArgs ? S['include'] : true;
/**
 * Rating findMany
 */
export declare type FindManyRatingArgs = {
    select?: RatingSelect | null;
    include?: RatingInclude | null;
    where?: RatingWhereInput | null;
    orderBy?: RatingOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyRatingArgsRequired = {
    select: RatingSelect;
    include: RatingInclude;
    where?: RatingWhereInput | null;
    orderBy?: RatingOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyRatingSelectArgs = {
    select: RatingSelect;
    where?: RatingWhereInput | null;
    orderBy?: RatingOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyRatingSelectArgsOptional = {
    select?: RatingSelect | null;
    where?: RatingWhereInput | null;
    orderBy?: RatingOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyRatingIncludeArgs = {
    include: RatingInclude;
    where?: RatingWhereInput | null;
    orderBy?: RatingOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyRatingIncludeArgsOptional = {
    include?: RatingInclude | null;
    where?: RatingWhereInput | null;
    orderBy?: RatingOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyRatingSelectArgs<S extends undefined | boolean | FindManyRatingSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyRatingSelectArgs ? S['select'] : true;
export declare type ExtractFindManyRatingIncludeArgs<S extends undefined | boolean | FindManyRatingIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyRatingIncludeArgs ? S['include'] : true;
/**
 * Rating create
 */
export declare type RatingCreateArgs = {
    select?: RatingSelect | null;
    include?: RatingInclude | null;
    data: RatingCreateInput;
};
export declare type RatingCreateArgsRequired = {
    select: RatingSelect;
    include: RatingInclude;
    data: RatingCreateInput;
};
export declare type RatingSelectCreateArgs = {
    select: RatingSelect;
    data: RatingCreateInput;
};
export declare type RatingSelectCreateArgsOptional = {
    select?: RatingSelect | null;
    data: RatingCreateInput;
};
export declare type RatingIncludeCreateArgs = {
    include: RatingInclude;
    data: RatingCreateInput;
};
export declare type RatingIncludeCreateArgsOptional = {
    include?: RatingInclude | null;
    data: RatingCreateInput;
};
export declare type ExtractRatingSelectCreateArgs<S extends undefined | boolean | RatingSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RatingSelectCreateArgs ? S['select'] : true;
export declare type ExtractRatingIncludeCreateArgs<S extends undefined | boolean | RatingIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RatingIncludeCreateArgs ? S['include'] : true;
/**
 * Rating update
 */
export declare type RatingUpdateArgs = {
    select?: RatingSelect | null;
    include?: RatingInclude | null;
    data: RatingUpdateInput;
    where: RatingWhereUniqueInput;
};
export declare type RatingUpdateArgsRequired = {
    select: RatingSelect;
    include: RatingInclude;
    data: RatingUpdateInput;
    where: RatingWhereUniqueInput;
};
export declare type RatingSelectUpdateArgs = {
    select: RatingSelect;
    data: RatingUpdateInput;
    where: RatingWhereUniqueInput;
};
export declare type RatingSelectUpdateArgsOptional = {
    select?: RatingSelect | null;
    data: RatingUpdateInput;
    where: RatingWhereUniqueInput;
};
export declare type RatingIncludeUpdateArgs = {
    include: RatingInclude;
    data: RatingUpdateInput;
    where: RatingWhereUniqueInput;
};
export declare type RatingIncludeUpdateArgsOptional = {
    include?: RatingInclude | null;
    data: RatingUpdateInput;
    where: RatingWhereUniqueInput;
};
export declare type ExtractRatingSelectUpdateArgs<S extends undefined | boolean | RatingSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RatingSelectUpdateArgs ? S['select'] : true;
export declare type ExtractRatingIncludeUpdateArgs<S extends undefined | boolean | RatingIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RatingIncludeUpdateArgs ? S['include'] : true;
/**
 * Rating updateMany
 */
export declare type RatingUpdateManyArgs = {
    data: RatingUpdateManyMutationInput;
    where?: RatingWhereInput | null;
};
/**
 * Rating upsert
 */
export declare type RatingUpsertArgs = {
    select?: RatingSelect | null;
    include?: RatingInclude | null;
    where: RatingWhereUniqueInput;
    create: RatingCreateInput;
    update: RatingUpdateInput;
};
export declare type RatingUpsertArgsRequired = {
    select: RatingSelect;
    include: RatingInclude;
    where: RatingWhereUniqueInput;
    create: RatingCreateInput;
    update: RatingUpdateInput;
};
export declare type RatingSelectUpsertArgs = {
    select: RatingSelect;
    where: RatingWhereUniqueInput;
    create: RatingCreateInput;
    update: RatingUpdateInput;
};
export declare type RatingSelectUpsertArgsOptional = {
    select?: RatingSelect | null;
    where: RatingWhereUniqueInput;
    create: RatingCreateInput;
    update: RatingUpdateInput;
};
export declare type RatingIncludeUpsertArgs = {
    include: RatingInclude;
    where: RatingWhereUniqueInput;
    create: RatingCreateInput;
    update: RatingUpdateInput;
};
export declare type RatingIncludeUpsertArgsOptional = {
    include?: RatingInclude | null;
    where: RatingWhereUniqueInput;
    create: RatingCreateInput;
    update: RatingUpdateInput;
};
export declare type ExtractRatingSelectUpsertArgs<S extends undefined | boolean | RatingSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RatingSelectUpsertArgs ? S['select'] : true;
export declare type ExtractRatingIncludeUpsertArgs<S extends undefined | boolean | RatingIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RatingIncludeUpsertArgs ? S['include'] : true;
/**
 * Rating delete
 */
export declare type RatingDeleteArgs = {
    select?: RatingSelect | null;
    include?: RatingInclude | null;
    where: RatingWhereUniqueInput;
};
export declare type RatingDeleteArgsRequired = {
    select: RatingSelect;
    include: RatingInclude;
    where: RatingWhereUniqueInput;
};
export declare type RatingSelectDeleteArgs = {
    select: RatingSelect;
    where: RatingWhereUniqueInput;
};
export declare type RatingSelectDeleteArgsOptional = {
    select?: RatingSelect | null;
    where: RatingWhereUniqueInput;
};
export declare type RatingIncludeDeleteArgs = {
    include: RatingInclude;
    where: RatingWhereUniqueInput;
};
export declare type RatingIncludeDeleteArgsOptional = {
    include?: RatingInclude | null;
    where: RatingWhereUniqueInput;
};
export declare type ExtractRatingSelectDeleteArgs<S extends undefined | boolean | RatingSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RatingSelectDeleteArgs ? S['select'] : true;
export declare type ExtractRatingIncludeDeleteArgs<S extends undefined | boolean | RatingIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RatingIncludeDeleteArgs ? S['include'] : true;
/**
 * Rating deleteMany
 */
export declare type RatingDeleteManyArgs = {
    where?: RatingWhereInput | null;
};
/**
 * Rating without action
 */
export declare type RatingArgs = {
    select?: RatingSelect | null;
    include?: RatingInclude | null;
};
export declare type RatingArgsRequired = {
    select: RatingSelect;
    include: RatingInclude;
};
export declare type RatingSelectArgs = {
    select: RatingSelect;
};
export declare type RatingSelectArgsOptional = {
    select?: RatingSelect | null;
};
export declare type RatingIncludeArgs = {
    include: RatingInclude;
};
export declare type RatingIncludeArgsOptional = {
    include?: RatingInclude | null;
};
export declare type ExtractRatingSelectArgs<S extends undefined | boolean | RatingSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RatingSelectArgs ? S['select'] : true;
export declare type ExtractRatingIncludeArgs<S extends undefined | boolean | RatingIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RatingIncludeArgs ? S['include'] : true;
/**
 * Model Depot
 */
export declare type Depot = {
    id: string;
    address_1: string;
    address_2: string | null;
    city: string;
    state: string;
    zipcode: string;
};
export declare type DepotScalars = 'id' | 'address_1' | 'address_2' | 'city' | 'state' | 'zipcode';
export declare type DepotSelect = {
    id?: boolean;
    address_1?: boolean;
    address_2?: boolean;
    city?: boolean;
    state?: boolean;
    zipcode?: boolean;
    owner?: boolean | UserSelectArgsOptional;
    tools?: boolean | FindManyToolSelectArgsOptional;
};
export declare type DepotInclude = {
    owner?: boolean | UserIncludeArgsOptional;
    tools?: boolean | FindManyToolIncludeArgsOptional;
};
declare type DepotDefault = {
    id: true;
    address_1: true;
    address_2: true;
    city: true;
    state: true;
    zipcode: true;
};
declare type DepotGetSelectPayload<S extends boolean | DepotSelect> = S extends true ? Depot : S extends DepotSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends DepotScalars ? Depot[P] : P extends 'owner' ? UserGetSelectPayload<ExtractUserSelectArgs<S[P]>> : P extends 'tools' ? Array<ToolGetSelectPayload<ExtractFindManyToolSelectArgs<S[P]>>> : never;
} : never;
declare type DepotGetIncludePayload<S extends boolean | DepotInclude> = S extends true ? Depot : S extends DepotInclude ? {
    [P in CleanupNever<MergeTruthyValues<DepotDefault, S>>]: P extends DepotScalars ? Depot[P] : P extends 'owner' ? UserGetIncludePayload<ExtractUserIncludeArgs<S[P]>> : P extends 'tools' ? Array<ToolGetIncludePayload<ExtractFindManyToolIncludeArgs<S[P]>>> : never;
} : never;
export interface DepotDelegate {
    <T extends FindManyDepotArgs>(args?: Subset<T, FindManyDepotArgs>): T extends FindManyDepotArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyDepotSelectArgs ? Promise<Array<DepotGetSelectPayload<ExtractFindManyDepotSelectArgs<T>>>> : T extends FindManyDepotIncludeArgs ? Promise<Array<DepotGetIncludePayload<ExtractFindManyDepotIncludeArgs<T>>>> : Promise<Array<Depot>>;
    findOne<T extends FindOneDepotArgs>(args: Subset<T, FindOneDepotArgs>): T extends FindOneDepotArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneDepotSelectArgs ? Promise<DepotGetSelectPayload<ExtractFindOneDepotSelectArgs<T>> | null> : T extends FindOneDepotIncludeArgs ? Promise<DepotGetIncludePayload<ExtractFindOneDepotIncludeArgs<T>> | null> : DepotClient<Depot | null>;
    findMany<T extends FindManyDepotArgs>(args?: Subset<T, FindManyDepotArgs>): T extends FindManyDepotArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyDepotSelectArgs ? Promise<Array<DepotGetSelectPayload<ExtractFindManyDepotSelectArgs<T>>>> : T extends FindManyDepotIncludeArgs ? Promise<Array<DepotGetIncludePayload<ExtractFindManyDepotIncludeArgs<T>>>> : Promise<Array<Depot>>;
    create<T extends DepotCreateArgs>(args: Subset<T, DepotCreateArgs>): T extends DepotCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends DepotSelectCreateArgs ? Promise<DepotGetSelectPayload<ExtractDepotSelectCreateArgs<T>>> : T extends DepotIncludeCreateArgs ? Promise<DepotGetIncludePayload<ExtractDepotIncludeCreateArgs<T>>> : DepotClient<Depot>;
    delete<T extends DepotDeleteArgs>(args: Subset<T, DepotDeleteArgs>): T extends DepotDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends DepotSelectDeleteArgs ? Promise<DepotGetSelectPayload<ExtractDepotSelectDeleteArgs<T>>> : T extends DepotIncludeDeleteArgs ? Promise<DepotGetIncludePayload<ExtractDepotIncludeDeleteArgs<T>>> : DepotClient<Depot>;
    update<T extends DepotUpdateArgs>(args: Subset<T, DepotUpdateArgs>): T extends DepotUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends DepotSelectUpdateArgs ? Promise<DepotGetSelectPayload<ExtractDepotSelectUpdateArgs<T>>> : T extends DepotIncludeUpdateArgs ? Promise<DepotGetIncludePayload<ExtractDepotIncludeUpdateArgs<T>>> : DepotClient<Depot>;
    deleteMany<T extends DepotDeleteManyArgs>(args: Subset<T, DepotDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends DepotUpdateManyArgs>(args: Subset<T, DepotUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends DepotUpsertArgs>(args: Subset<T, DepotUpsertArgs>): T extends DepotUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends DepotSelectUpsertArgs ? Promise<DepotGetSelectPayload<ExtractDepotSelectUpsertArgs<T>>> : T extends DepotIncludeUpsertArgs ? Promise<DepotGetIncludePayload<ExtractDepotIncludeUpsertArgs<T>>> : DepotClient<Depot>;
    count(): Promise<number>;
}
export declare class DepotClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    owner<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectArgs ? Promise<UserGetSelectPayload<ExtractUserSelectArgs<T>> | null> : T extends UserIncludeArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeArgs<T>> | null> : UserClient<User | null>;
    tools<T extends FindManyToolArgs = {}>(args?: Subset<T, FindManyToolArgs>): T extends FindManyToolArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyToolSelectArgs ? Promise<Array<ToolGetSelectPayload<ExtractFindManyToolSelectArgs<T>>>> : T extends FindManyToolIncludeArgs ? Promise<Array<ToolGetIncludePayload<ExtractFindManyToolIncludeArgs<T>>>> : Promise<Array<Tool>>;
    private readonly _document;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * Depot findOne
 */
export declare type FindOneDepotArgs = {
    select?: DepotSelect | null;
    include?: DepotInclude | null;
    where: DepotWhereUniqueInput;
};
export declare type FindOneDepotArgsRequired = {
    select: DepotSelect;
    include: DepotInclude;
    where: DepotWhereUniqueInput;
};
export declare type FindOneDepotSelectArgs = {
    select: DepotSelect;
    where: DepotWhereUniqueInput;
};
export declare type FindOneDepotSelectArgsOptional = {
    select?: DepotSelect | null;
    where: DepotWhereUniqueInput;
};
export declare type FindOneDepotIncludeArgs = {
    include: DepotInclude;
    where: DepotWhereUniqueInput;
};
export declare type FindOneDepotIncludeArgsOptional = {
    include?: DepotInclude | null;
    where: DepotWhereUniqueInput;
};
export declare type ExtractFindOneDepotSelectArgs<S extends undefined | boolean | FindOneDepotSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneDepotSelectArgs ? S['select'] : true;
export declare type ExtractFindOneDepotIncludeArgs<S extends undefined | boolean | FindOneDepotIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneDepotIncludeArgs ? S['include'] : true;
/**
 * Depot findMany
 */
export declare type FindManyDepotArgs = {
    select?: DepotSelect | null;
    include?: DepotInclude | null;
    where?: DepotWhereInput | null;
    orderBy?: DepotOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyDepotArgsRequired = {
    select: DepotSelect;
    include: DepotInclude;
    where?: DepotWhereInput | null;
    orderBy?: DepotOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyDepotSelectArgs = {
    select: DepotSelect;
    where?: DepotWhereInput | null;
    orderBy?: DepotOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyDepotSelectArgsOptional = {
    select?: DepotSelect | null;
    where?: DepotWhereInput | null;
    orderBy?: DepotOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyDepotIncludeArgs = {
    include: DepotInclude;
    where?: DepotWhereInput | null;
    orderBy?: DepotOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyDepotIncludeArgsOptional = {
    include?: DepotInclude | null;
    where?: DepotWhereInput | null;
    orderBy?: DepotOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyDepotSelectArgs<S extends undefined | boolean | FindManyDepotSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyDepotSelectArgs ? S['select'] : true;
export declare type ExtractFindManyDepotIncludeArgs<S extends undefined | boolean | FindManyDepotIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyDepotIncludeArgs ? S['include'] : true;
/**
 * Depot create
 */
export declare type DepotCreateArgs = {
    select?: DepotSelect | null;
    include?: DepotInclude | null;
    data: DepotCreateInput;
};
export declare type DepotCreateArgsRequired = {
    select: DepotSelect;
    include: DepotInclude;
    data: DepotCreateInput;
};
export declare type DepotSelectCreateArgs = {
    select: DepotSelect;
    data: DepotCreateInput;
};
export declare type DepotSelectCreateArgsOptional = {
    select?: DepotSelect | null;
    data: DepotCreateInput;
};
export declare type DepotIncludeCreateArgs = {
    include: DepotInclude;
    data: DepotCreateInput;
};
export declare type DepotIncludeCreateArgsOptional = {
    include?: DepotInclude | null;
    data: DepotCreateInput;
};
export declare type ExtractDepotSelectCreateArgs<S extends undefined | boolean | DepotSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends DepotSelectCreateArgs ? S['select'] : true;
export declare type ExtractDepotIncludeCreateArgs<S extends undefined | boolean | DepotIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends DepotIncludeCreateArgs ? S['include'] : true;
/**
 * Depot update
 */
export declare type DepotUpdateArgs = {
    select?: DepotSelect | null;
    include?: DepotInclude | null;
    data: DepotUpdateInput;
    where: DepotWhereUniqueInput;
};
export declare type DepotUpdateArgsRequired = {
    select: DepotSelect;
    include: DepotInclude;
    data: DepotUpdateInput;
    where: DepotWhereUniqueInput;
};
export declare type DepotSelectUpdateArgs = {
    select: DepotSelect;
    data: DepotUpdateInput;
    where: DepotWhereUniqueInput;
};
export declare type DepotSelectUpdateArgsOptional = {
    select?: DepotSelect | null;
    data: DepotUpdateInput;
    where: DepotWhereUniqueInput;
};
export declare type DepotIncludeUpdateArgs = {
    include: DepotInclude;
    data: DepotUpdateInput;
    where: DepotWhereUniqueInput;
};
export declare type DepotIncludeUpdateArgsOptional = {
    include?: DepotInclude | null;
    data: DepotUpdateInput;
    where: DepotWhereUniqueInput;
};
export declare type ExtractDepotSelectUpdateArgs<S extends undefined | boolean | DepotSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends DepotSelectUpdateArgs ? S['select'] : true;
export declare type ExtractDepotIncludeUpdateArgs<S extends undefined | boolean | DepotIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends DepotIncludeUpdateArgs ? S['include'] : true;
/**
 * Depot updateMany
 */
export declare type DepotUpdateManyArgs = {
    data: DepotUpdateManyMutationInput;
    where?: DepotWhereInput | null;
};
/**
 * Depot upsert
 */
export declare type DepotUpsertArgs = {
    select?: DepotSelect | null;
    include?: DepotInclude | null;
    where: DepotWhereUniqueInput;
    create: DepotCreateInput;
    update: DepotUpdateInput;
};
export declare type DepotUpsertArgsRequired = {
    select: DepotSelect;
    include: DepotInclude;
    where: DepotWhereUniqueInput;
    create: DepotCreateInput;
    update: DepotUpdateInput;
};
export declare type DepotSelectUpsertArgs = {
    select: DepotSelect;
    where: DepotWhereUniqueInput;
    create: DepotCreateInput;
    update: DepotUpdateInput;
};
export declare type DepotSelectUpsertArgsOptional = {
    select?: DepotSelect | null;
    where: DepotWhereUniqueInput;
    create: DepotCreateInput;
    update: DepotUpdateInput;
};
export declare type DepotIncludeUpsertArgs = {
    include: DepotInclude;
    where: DepotWhereUniqueInput;
    create: DepotCreateInput;
    update: DepotUpdateInput;
};
export declare type DepotIncludeUpsertArgsOptional = {
    include?: DepotInclude | null;
    where: DepotWhereUniqueInput;
    create: DepotCreateInput;
    update: DepotUpdateInput;
};
export declare type ExtractDepotSelectUpsertArgs<S extends undefined | boolean | DepotSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends DepotSelectUpsertArgs ? S['select'] : true;
export declare type ExtractDepotIncludeUpsertArgs<S extends undefined | boolean | DepotIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends DepotIncludeUpsertArgs ? S['include'] : true;
/**
 * Depot delete
 */
export declare type DepotDeleteArgs = {
    select?: DepotSelect | null;
    include?: DepotInclude | null;
    where: DepotWhereUniqueInput;
};
export declare type DepotDeleteArgsRequired = {
    select: DepotSelect;
    include: DepotInclude;
    where: DepotWhereUniqueInput;
};
export declare type DepotSelectDeleteArgs = {
    select: DepotSelect;
    where: DepotWhereUniqueInput;
};
export declare type DepotSelectDeleteArgsOptional = {
    select?: DepotSelect | null;
    where: DepotWhereUniqueInput;
};
export declare type DepotIncludeDeleteArgs = {
    include: DepotInclude;
    where: DepotWhereUniqueInput;
};
export declare type DepotIncludeDeleteArgsOptional = {
    include?: DepotInclude | null;
    where: DepotWhereUniqueInput;
};
export declare type ExtractDepotSelectDeleteArgs<S extends undefined | boolean | DepotSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends DepotSelectDeleteArgs ? S['select'] : true;
export declare type ExtractDepotIncludeDeleteArgs<S extends undefined | boolean | DepotIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends DepotIncludeDeleteArgs ? S['include'] : true;
/**
 * Depot deleteMany
 */
export declare type DepotDeleteManyArgs = {
    where?: DepotWhereInput | null;
};
/**
 * Depot without action
 */
export declare type DepotArgs = {
    select?: DepotSelect | null;
    include?: DepotInclude | null;
};
export declare type DepotArgsRequired = {
    select: DepotSelect;
    include: DepotInclude;
};
export declare type DepotSelectArgs = {
    select: DepotSelect;
};
export declare type DepotSelectArgsOptional = {
    select?: DepotSelect | null;
};
export declare type DepotIncludeArgs = {
    include: DepotInclude;
};
export declare type DepotIncludeArgsOptional = {
    include?: DepotInclude | null;
};
export declare type ExtractDepotSelectArgs<S extends undefined | boolean | DepotSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends DepotSelectArgs ? S['select'] : true;
export declare type ExtractDepotIncludeArgs<S extends undefined | boolean | DepotIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends DepotIncludeArgs ? S['include'] : true;
/**
 * Model Tool
 */
export declare type Tool = {
    id: string;
    title: string;
    category: string;
    description: string;
    price: number;
};
export declare type ToolScalars = 'id' | 'title' | 'category' | 'description' | 'price';
export declare type ToolSelect = {
    id?: boolean;
    title?: boolean;
    category?: boolean;
    description?: boolean;
    price?: boolean;
    depot?: boolean | DepotSelectArgsOptional;
    pictures?: boolean | FindManyToolPictureSelectArgsOptional;
    rentedTools?: boolean | FindManyRentedToolSelectArgsOptional;
};
export declare type ToolInclude = {
    depot?: boolean | DepotIncludeArgsOptional;
    pictures?: boolean | FindManyToolPictureIncludeArgsOptional;
    rentedTools?: boolean | FindManyRentedToolIncludeArgsOptional;
};
declare type ToolDefault = {
    id: true;
    title: true;
    category: true;
    description: true;
    price: true;
};
declare type ToolGetSelectPayload<S extends boolean | ToolSelect> = S extends true ? Tool : S extends ToolSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends ToolScalars ? Tool[P] : P extends 'depot' ? DepotGetSelectPayload<ExtractDepotSelectArgs<S[P]>> : P extends 'pictures' ? Array<ToolPictureGetSelectPayload<ExtractFindManyToolPictureSelectArgs<S[P]>>> : P extends 'rentedTools' ? Array<RentedToolGetSelectPayload<ExtractFindManyRentedToolSelectArgs<S[P]>>> : never;
} : never;
declare type ToolGetIncludePayload<S extends boolean | ToolInclude> = S extends true ? Tool : S extends ToolInclude ? {
    [P in CleanupNever<MergeTruthyValues<ToolDefault, S>>]: P extends ToolScalars ? Tool[P] : P extends 'depot' ? DepotGetIncludePayload<ExtractDepotIncludeArgs<S[P]>> : P extends 'pictures' ? Array<ToolPictureGetIncludePayload<ExtractFindManyToolPictureIncludeArgs<S[P]>>> : P extends 'rentedTools' ? Array<RentedToolGetIncludePayload<ExtractFindManyRentedToolIncludeArgs<S[P]>>> : never;
} : never;
export interface ToolDelegate {
    <T extends FindManyToolArgs>(args?: Subset<T, FindManyToolArgs>): T extends FindManyToolArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyToolSelectArgs ? Promise<Array<ToolGetSelectPayload<ExtractFindManyToolSelectArgs<T>>>> : T extends FindManyToolIncludeArgs ? Promise<Array<ToolGetIncludePayload<ExtractFindManyToolIncludeArgs<T>>>> : Promise<Array<Tool>>;
    findOne<T extends FindOneToolArgs>(args: Subset<T, FindOneToolArgs>): T extends FindOneToolArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneToolSelectArgs ? Promise<ToolGetSelectPayload<ExtractFindOneToolSelectArgs<T>> | null> : T extends FindOneToolIncludeArgs ? Promise<ToolGetIncludePayload<ExtractFindOneToolIncludeArgs<T>> | null> : ToolClient<Tool | null>;
    findMany<T extends FindManyToolArgs>(args?: Subset<T, FindManyToolArgs>): T extends FindManyToolArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyToolSelectArgs ? Promise<Array<ToolGetSelectPayload<ExtractFindManyToolSelectArgs<T>>>> : T extends FindManyToolIncludeArgs ? Promise<Array<ToolGetIncludePayload<ExtractFindManyToolIncludeArgs<T>>>> : Promise<Array<Tool>>;
    create<T extends ToolCreateArgs>(args: Subset<T, ToolCreateArgs>): T extends ToolCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends ToolSelectCreateArgs ? Promise<ToolGetSelectPayload<ExtractToolSelectCreateArgs<T>>> : T extends ToolIncludeCreateArgs ? Promise<ToolGetIncludePayload<ExtractToolIncludeCreateArgs<T>>> : ToolClient<Tool>;
    delete<T extends ToolDeleteArgs>(args: Subset<T, ToolDeleteArgs>): T extends ToolDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends ToolSelectDeleteArgs ? Promise<ToolGetSelectPayload<ExtractToolSelectDeleteArgs<T>>> : T extends ToolIncludeDeleteArgs ? Promise<ToolGetIncludePayload<ExtractToolIncludeDeleteArgs<T>>> : ToolClient<Tool>;
    update<T extends ToolUpdateArgs>(args: Subset<T, ToolUpdateArgs>): T extends ToolUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends ToolSelectUpdateArgs ? Promise<ToolGetSelectPayload<ExtractToolSelectUpdateArgs<T>>> : T extends ToolIncludeUpdateArgs ? Promise<ToolGetIncludePayload<ExtractToolIncludeUpdateArgs<T>>> : ToolClient<Tool>;
    deleteMany<T extends ToolDeleteManyArgs>(args: Subset<T, ToolDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends ToolUpdateManyArgs>(args: Subset<T, ToolUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends ToolUpsertArgs>(args: Subset<T, ToolUpsertArgs>): T extends ToolUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends ToolSelectUpsertArgs ? Promise<ToolGetSelectPayload<ExtractToolSelectUpsertArgs<T>>> : T extends ToolIncludeUpsertArgs ? Promise<ToolGetIncludePayload<ExtractToolIncludeUpsertArgs<T>>> : ToolClient<Tool>;
    count(): Promise<number>;
}
export declare class ToolClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    depot<T extends DepotArgs = {}>(args?: Subset<T, DepotArgs>): T extends FindOneDepotArgsRequired ? 'Please either choose `select` or `include`' : T extends DepotSelectArgs ? Promise<DepotGetSelectPayload<ExtractDepotSelectArgs<T>> | null> : T extends DepotIncludeArgs ? Promise<DepotGetIncludePayload<ExtractDepotIncludeArgs<T>> | null> : DepotClient<Depot | null>;
    pictures<T extends FindManyToolPictureArgs = {}>(args?: Subset<T, FindManyToolPictureArgs>): T extends FindManyToolPictureArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyToolPictureSelectArgs ? Promise<Array<ToolPictureGetSelectPayload<ExtractFindManyToolPictureSelectArgs<T>>>> : T extends FindManyToolPictureIncludeArgs ? Promise<Array<ToolPictureGetIncludePayload<ExtractFindManyToolPictureIncludeArgs<T>>>> : Promise<Array<ToolPicture>>;
    rentedTools<T extends FindManyRentedToolArgs = {}>(args?: Subset<T, FindManyRentedToolArgs>): T extends FindManyRentedToolArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyRentedToolSelectArgs ? Promise<Array<RentedToolGetSelectPayload<ExtractFindManyRentedToolSelectArgs<T>>>> : T extends FindManyRentedToolIncludeArgs ? Promise<Array<RentedToolGetIncludePayload<ExtractFindManyRentedToolIncludeArgs<T>>>> : Promise<Array<RentedTool>>;
    private readonly _document;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * Tool findOne
 */
export declare type FindOneToolArgs = {
    select?: ToolSelect | null;
    include?: ToolInclude | null;
    where: ToolWhereUniqueInput;
};
export declare type FindOneToolArgsRequired = {
    select: ToolSelect;
    include: ToolInclude;
    where: ToolWhereUniqueInput;
};
export declare type FindOneToolSelectArgs = {
    select: ToolSelect;
    where: ToolWhereUniqueInput;
};
export declare type FindOneToolSelectArgsOptional = {
    select?: ToolSelect | null;
    where: ToolWhereUniqueInput;
};
export declare type FindOneToolIncludeArgs = {
    include: ToolInclude;
    where: ToolWhereUniqueInput;
};
export declare type FindOneToolIncludeArgsOptional = {
    include?: ToolInclude | null;
    where: ToolWhereUniqueInput;
};
export declare type ExtractFindOneToolSelectArgs<S extends undefined | boolean | FindOneToolSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneToolSelectArgs ? S['select'] : true;
export declare type ExtractFindOneToolIncludeArgs<S extends undefined | boolean | FindOneToolIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneToolIncludeArgs ? S['include'] : true;
/**
 * Tool findMany
 */
export declare type FindManyToolArgs = {
    select?: ToolSelect | null;
    include?: ToolInclude | null;
    where?: ToolWhereInput | null;
    orderBy?: ToolOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyToolArgsRequired = {
    select: ToolSelect;
    include: ToolInclude;
    where?: ToolWhereInput | null;
    orderBy?: ToolOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyToolSelectArgs = {
    select: ToolSelect;
    where?: ToolWhereInput | null;
    orderBy?: ToolOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyToolSelectArgsOptional = {
    select?: ToolSelect | null;
    where?: ToolWhereInput | null;
    orderBy?: ToolOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyToolIncludeArgs = {
    include: ToolInclude;
    where?: ToolWhereInput | null;
    orderBy?: ToolOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyToolIncludeArgsOptional = {
    include?: ToolInclude | null;
    where?: ToolWhereInput | null;
    orderBy?: ToolOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyToolSelectArgs<S extends undefined | boolean | FindManyToolSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyToolSelectArgs ? S['select'] : true;
export declare type ExtractFindManyToolIncludeArgs<S extends undefined | boolean | FindManyToolIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyToolIncludeArgs ? S['include'] : true;
/**
 * Tool create
 */
export declare type ToolCreateArgs = {
    select?: ToolSelect | null;
    include?: ToolInclude | null;
    data: ToolCreateInput;
};
export declare type ToolCreateArgsRequired = {
    select: ToolSelect;
    include: ToolInclude;
    data: ToolCreateInput;
};
export declare type ToolSelectCreateArgs = {
    select: ToolSelect;
    data: ToolCreateInput;
};
export declare type ToolSelectCreateArgsOptional = {
    select?: ToolSelect | null;
    data: ToolCreateInput;
};
export declare type ToolIncludeCreateArgs = {
    include: ToolInclude;
    data: ToolCreateInput;
};
export declare type ToolIncludeCreateArgsOptional = {
    include?: ToolInclude | null;
    data: ToolCreateInput;
};
export declare type ExtractToolSelectCreateArgs<S extends undefined | boolean | ToolSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolSelectCreateArgs ? S['select'] : true;
export declare type ExtractToolIncludeCreateArgs<S extends undefined | boolean | ToolIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolIncludeCreateArgs ? S['include'] : true;
/**
 * Tool update
 */
export declare type ToolUpdateArgs = {
    select?: ToolSelect | null;
    include?: ToolInclude | null;
    data: ToolUpdateInput;
    where: ToolWhereUniqueInput;
};
export declare type ToolUpdateArgsRequired = {
    select: ToolSelect;
    include: ToolInclude;
    data: ToolUpdateInput;
    where: ToolWhereUniqueInput;
};
export declare type ToolSelectUpdateArgs = {
    select: ToolSelect;
    data: ToolUpdateInput;
    where: ToolWhereUniqueInput;
};
export declare type ToolSelectUpdateArgsOptional = {
    select?: ToolSelect | null;
    data: ToolUpdateInput;
    where: ToolWhereUniqueInput;
};
export declare type ToolIncludeUpdateArgs = {
    include: ToolInclude;
    data: ToolUpdateInput;
    where: ToolWhereUniqueInput;
};
export declare type ToolIncludeUpdateArgsOptional = {
    include?: ToolInclude | null;
    data: ToolUpdateInput;
    where: ToolWhereUniqueInput;
};
export declare type ExtractToolSelectUpdateArgs<S extends undefined | boolean | ToolSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolSelectUpdateArgs ? S['select'] : true;
export declare type ExtractToolIncludeUpdateArgs<S extends undefined | boolean | ToolIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolIncludeUpdateArgs ? S['include'] : true;
/**
 * Tool updateMany
 */
export declare type ToolUpdateManyArgs = {
    data: ToolUpdateManyMutationInput;
    where?: ToolWhereInput | null;
};
/**
 * Tool upsert
 */
export declare type ToolUpsertArgs = {
    select?: ToolSelect | null;
    include?: ToolInclude | null;
    where: ToolWhereUniqueInput;
    create: ToolCreateInput;
    update: ToolUpdateInput;
};
export declare type ToolUpsertArgsRequired = {
    select: ToolSelect;
    include: ToolInclude;
    where: ToolWhereUniqueInput;
    create: ToolCreateInput;
    update: ToolUpdateInput;
};
export declare type ToolSelectUpsertArgs = {
    select: ToolSelect;
    where: ToolWhereUniqueInput;
    create: ToolCreateInput;
    update: ToolUpdateInput;
};
export declare type ToolSelectUpsertArgsOptional = {
    select?: ToolSelect | null;
    where: ToolWhereUniqueInput;
    create: ToolCreateInput;
    update: ToolUpdateInput;
};
export declare type ToolIncludeUpsertArgs = {
    include: ToolInclude;
    where: ToolWhereUniqueInput;
    create: ToolCreateInput;
    update: ToolUpdateInput;
};
export declare type ToolIncludeUpsertArgsOptional = {
    include?: ToolInclude | null;
    where: ToolWhereUniqueInput;
    create: ToolCreateInput;
    update: ToolUpdateInput;
};
export declare type ExtractToolSelectUpsertArgs<S extends undefined | boolean | ToolSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolSelectUpsertArgs ? S['select'] : true;
export declare type ExtractToolIncludeUpsertArgs<S extends undefined | boolean | ToolIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolIncludeUpsertArgs ? S['include'] : true;
/**
 * Tool delete
 */
export declare type ToolDeleteArgs = {
    select?: ToolSelect | null;
    include?: ToolInclude | null;
    where: ToolWhereUniqueInput;
};
export declare type ToolDeleteArgsRequired = {
    select: ToolSelect;
    include: ToolInclude;
    where: ToolWhereUniqueInput;
};
export declare type ToolSelectDeleteArgs = {
    select: ToolSelect;
    where: ToolWhereUniqueInput;
};
export declare type ToolSelectDeleteArgsOptional = {
    select?: ToolSelect | null;
    where: ToolWhereUniqueInput;
};
export declare type ToolIncludeDeleteArgs = {
    include: ToolInclude;
    where: ToolWhereUniqueInput;
};
export declare type ToolIncludeDeleteArgsOptional = {
    include?: ToolInclude | null;
    where: ToolWhereUniqueInput;
};
export declare type ExtractToolSelectDeleteArgs<S extends undefined | boolean | ToolSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolSelectDeleteArgs ? S['select'] : true;
export declare type ExtractToolIncludeDeleteArgs<S extends undefined | boolean | ToolIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolIncludeDeleteArgs ? S['include'] : true;
/**
 * Tool deleteMany
 */
export declare type ToolDeleteManyArgs = {
    where?: ToolWhereInput | null;
};
/**
 * Tool without action
 */
export declare type ToolArgs = {
    select?: ToolSelect | null;
    include?: ToolInclude | null;
};
export declare type ToolArgsRequired = {
    select: ToolSelect;
    include: ToolInclude;
};
export declare type ToolSelectArgs = {
    select: ToolSelect;
};
export declare type ToolSelectArgsOptional = {
    select?: ToolSelect | null;
};
export declare type ToolIncludeArgs = {
    include: ToolInclude;
};
export declare type ToolIncludeArgsOptional = {
    include?: ToolInclude | null;
};
export declare type ExtractToolSelectArgs<S extends undefined | boolean | ToolSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolSelectArgs ? S['select'] : true;
export declare type ExtractToolIncludeArgs<S extends undefined | boolean | ToolIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolIncludeArgs ? S['include'] : true;
/**
 * Model ToolPicture
 */
export declare type ToolPicture = {
    id: string;
    image: string;
    description: string | null;
};
export declare type ToolPictureScalars = 'id' | 'image' | 'description';
export declare type ToolPictureSelect = {
    id?: boolean;
    image?: boolean;
    description?: boolean;
    tool?: boolean | ToolSelectArgsOptional;
};
export declare type ToolPictureInclude = {
    tool?: boolean | ToolIncludeArgsOptional;
};
declare type ToolPictureDefault = {
    id: true;
    image: true;
    description: true;
};
declare type ToolPictureGetSelectPayload<S extends boolean | ToolPictureSelect> = S extends true ? ToolPicture : S extends ToolPictureSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends ToolPictureScalars ? ToolPicture[P] : P extends 'tool' ? ToolGetSelectPayload<ExtractToolSelectArgs<S[P]>> : never;
} : never;
declare type ToolPictureGetIncludePayload<S extends boolean | ToolPictureInclude> = S extends true ? ToolPicture : S extends ToolPictureInclude ? {
    [P in CleanupNever<MergeTruthyValues<ToolPictureDefault, S>>]: P extends ToolPictureScalars ? ToolPicture[P] : P extends 'tool' ? ToolGetIncludePayload<ExtractToolIncludeArgs<S[P]>> : never;
} : never;
export interface ToolPictureDelegate {
    <T extends FindManyToolPictureArgs>(args?: Subset<T, FindManyToolPictureArgs>): T extends FindManyToolPictureArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyToolPictureSelectArgs ? Promise<Array<ToolPictureGetSelectPayload<ExtractFindManyToolPictureSelectArgs<T>>>> : T extends FindManyToolPictureIncludeArgs ? Promise<Array<ToolPictureGetIncludePayload<ExtractFindManyToolPictureIncludeArgs<T>>>> : Promise<Array<ToolPicture>>;
    findOne<T extends FindOneToolPictureArgs>(args: Subset<T, FindOneToolPictureArgs>): T extends FindOneToolPictureArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneToolPictureSelectArgs ? Promise<ToolPictureGetSelectPayload<ExtractFindOneToolPictureSelectArgs<T>> | null> : T extends FindOneToolPictureIncludeArgs ? Promise<ToolPictureGetIncludePayload<ExtractFindOneToolPictureIncludeArgs<T>> | null> : ToolPictureClient<ToolPicture | null>;
    findMany<T extends FindManyToolPictureArgs>(args?: Subset<T, FindManyToolPictureArgs>): T extends FindManyToolPictureArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyToolPictureSelectArgs ? Promise<Array<ToolPictureGetSelectPayload<ExtractFindManyToolPictureSelectArgs<T>>>> : T extends FindManyToolPictureIncludeArgs ? Promise<Array<ToolPictureGetIncludePayload<ExtractFindManyToolPictureIncludeArgs<T>>>> : Promise<Array<ToolPicture>>;
    create<T extends ToolPictureCreateArgs>(args: Subset<T, ToolPictureCreateArgs>): T extends ToolPictureCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends ToolPictureSelectCreateArgs ? Promise<ToolPictureGetSelectPayload<ExtractToolPictureSelectCreateArgs<T>>> : T extends ToolPictureIncludeCreateArgs ? Promise<ToolPictureGetIncludePayload<ExtractToolPictureIncludeCreateArgs<T>>> : ToolPictureClient<ToolPicture>;
    delete<T extends ToolPictureDeleteArgs>(args: Subset<T, ToolPictureDeleteArgs>): T extends ToolPictureDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends ToolPictureSelectDeleteArgs ? Promise<ToolPictureGetSelectPayload<ExtractToolPictureSelectDeleteArgs<T>>> : T extends ToolPictureIncludeDeleteArgs ? Promise<ToolPictureGetIncludePayload<ExtractToolPictureIncludeDeleteArgs<T>>> : ToolPictureClient<ToolPicture>;
    update<T extends ToolPictureUpdateArgs>(args: Subset<T, ToolPictureUpdateArgs>): T extends ToolPictureUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends ToolPictureSelectUpdateArgs ? Promise<ToolPictureGetSelectPayload<ExtractToolPictureSelectUpdateArgs<T>>> : T extends ToolPictureIncludeUpdateArgs ? Promise<ToolPictureGetIncludePayload<ExtractToolPictureIncludeUpdateArgs<T>>> : ToolPictureClient<ToolPicture>;
    deleteMany<T extends ToolPictureDeleteManyArgs>(args: Subset<T, ToolPictureDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends ToolPictureUpdateManyArgs>(args: Subset<T, ToolPictureUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends ToolPictureUpsertArgs>(args: Subset<T, ToolPictureUpsertArgs>): T extends ToolPictureUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends ToolPictureSelectUpsertArgs ? Promise<ToolPictureGetSelectPayload<ExtractToolPictureSelectUpsertArgs<T>>> : T extends ToolPictureIncludeUpsertArgs ? Promise<ToolPictureGetIncludePayload<ExtractToolPictureIncludeUpsertArgs<T>>> : ToolPictureClient<ToolPicture>;
    count(): Promise<number>;
}
export declare class ToolPictureClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    tool<T extends ToolArgs = {}>(args?: Subset<T, ToolArgs>): T extends FindOneToolArgsRequired ? 'Please either choose `select` or `include`' : T extends ToolSelectArgs ? Promise<ToolGetSelectPayload<ExtractToolSelectArgs<T>> | null> : T extends ToolIncludeArgs ? Promise<ToolGetIncludePayload<ExtractToolIncludeArgs<T>> | null> : ToolClient<Tool | null>;
    private readonly _document;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * ToolPicture findOne
 */
export declare type FindOneToolPictureArgs = {
    select?: ToolPictureSelect | null;
    include?: ToolPictureInclude | null;
    where: ToolPictureWhereUniqueInput;
};
export declare type FindOneToolPictureArgsRequired = {
    select: ToolPictureSelect;
    include: ToolPictureInclude;
    where: ToolPictureWhereUniqueInput;
};
export declare type FindOneToolPictureSelectArgs = {
    select: ToolPictureSelect;
    where: ToolPictureWhereUniqueInput;
};
export declare type FindOneToolPictureSelectArgsOptional = {
    select?: ToolPictureSelect | null;
    where: ToolPictureWhereUniqueInput;
};
export declare type FindOneToolPictureIncludeArgs = {
    include: ToolPictureInclude;
    where: ToolPictureWhereUniqueInput;
};
export declare type FindOneToolPictureIncludeArgsOptional = {
    include?: ToolPictureInclude | null;
    where: ToolPictureWhereUniqueInput;
};
export declare type ExtractFindOneToolPictureSelectArgs<S extends undefined | boolean | FindOneToolPictureSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneToolPictureSelectArgs ? S['select'] : true;
export declare type ExtractFindOneToolPictureIncludeArgs<S extends undefined | boolean | FindOneToolPictureIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneToolPictureIncludeArgs ? S['include'] : true;
/**
 * ToolPicture findMany
 */
export declare type FindManyToolPictureArgs = {
    select?: ToolPictureSelect | null;
    include?: ToolPictureInclude | null;
    where?: ToolPictureWhereInput | null;
    orderBy?: ToolPictureOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyToolPictureArgsRequired = {
    select: ToolPictureSelect;
    include: ToolPictureInclude;
    where?: ToolPictureWhereInput | null;
    orderBy?: ToolPictureOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyToolPictureSelectArgs = {
    select: ToolPictureSelect;
    where?: ToolPictureWhereInput | null;
    orderBy?: ToolPictureOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyToolPictureSelectArgsOptional = {
    select?: ToolPictureSelect | null;
    where?: ToolPictureWhereInput | null;
    orderBy?: ToolPictureOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyToolPictureIncludeArgs = {
    include: ToolPictureInclude;
    where?: ToolPictureWhereInput | null;
    orderBy?: ToolPictureOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyToolPictureIncludeArgsOptional = {
    include?: ToolPictureInclude | null;
    where?: ToolPictureWhereInput | null;
    orderBy?: ToolPictureOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyToolPictureSelectArgs<S extends undefined | boolean | FindManyToolPictureSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyToolPictureSelectArgs ? S['select'] : true;
export declare type ExtractFindManyToolPictureIncludeArgs<S extends undefined | boolean | FindManyToolPictureIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyToolPictureIncludeArgs ? S['include'] : true;
/**
 * ToolPicture create
 */
export declare type ToolPictureCreateArgs = {
    select?: ToolPictureSelect | null;
    include?: ToolPictureInclude | null;
    data: ToolPictureCreateInput;
};
export declare type ToolPictureCreateArgsRequired = {
    select: ToolPictureSelect;
    include: ToolPictureInclude;
    data: ToolPictureCreateInput;
};
export declare type ToolPictureSelectCreateArgs = {
    select: ToolPictureSelect;
    data: ToolPictureCreateInput;
};
export declare type ToolPictureSelectCreateArgsOptional = {
    select?: ToolPictureSelect | null;
    data: ToolPictureCreateInput;
};
export declare type ToolPictureIncludeCreateArgs = {
    include: ToolPictureInclude;
    data: ToolPictureCreateInput;
};
export declare type ToolPictureIncludeCreateArgsOptional = {
    include?: ToolPictureInclude | null;
    data: ToolPictureCreateInput;
};
export declare type ExtractToolPictureSelectCreateArgs<S extends undefined | boolean | ToolPictureSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolPictureSelectCreateArgs ? S['select'] : true;
export declare type ExtractToolPictureIncludeCreateArgs<S extends undefined | boolean | ToolPictureIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolPictureIncludeCreateArgs ? S['include'] : true;
/**
 * ToolPicture update
 */
export declare type ToolPictureUpdateArgs = {
    select?: ToolPictureSelect | null;
    include?: ToolPictureInclude | null;
    data: ToolPictureUpdateInput;
    where: ToolPictureWhereUniqueInput;
};
export declare type ToolPictureUpdateArgsRequired = {
    select: ToolPictureSelect;
    include: ToolPictureInclude;
    data: ToolPictureUpdateInput;
    where: ToolPictureWhereUniqueInput;
};
export declare type ToolPictureSelectUpdateArgs = {
    select: ToolPictureSelect;
    data: ToolPictureUpdateInput;
    where: ToolPictureWhereUniqueInput;
};
export declare type ToolPictureSelectUpdateArgsOptional = {
    select?: ToolPictureSelect | null;
    data: ToolPictureUpdateInput;
    where: ToolPictureWhereUniqueInput;
};
export declare type ToolPictureIncludeUpdateArgs = {
    include: ToolPictureInclude;
    data: ToolPictureUpdateInput;
    where: ToolPictureWhereUniqueInput;
};
export declare type ToolPictureIncludeUpdateArgsOptional = {
    include?: ToolPictureInclude | null;
    data: ToolPictureUpdateInput;
    where: ToolPictureWhereUniqueInput;
};
export declare type ExtractToolPictureSelectUpdateArgs<S extends undefined | boolean | ToolPictureSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolPictureSelectUpdateArgs ? S['select'] : true;
export declare type ExtractToolPictureIncludeUpdateArgs<S extends undefined | boolean | ToolPictureIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolPictureIncludeUpdateArgs ? S['include'] : true;
/**
 * ToolPicture updateMany
 */
export declare type ToolPictureUpdateManyArgs = {
    data: ToolPictureUpdateManyMutationInput;
    where?: ToolPictureWhereInput | null;
};
/**
 * ToolPicture upsert
 */
export declare type ToolPictureUpsertArgs = {
    select?: ToolPictureSelect | null;
    include?: ToolPictureInclude | null;
    where: ToolPictureWhereUniqueInput;
    create: ToolPictureCreateInput;
    update: ToolPictureUpdateInput;
};
export declare type ToolPictureUpsertArgsRequired = {
    select: ToolPictureSelect;
    include: ToolPictureInclude;
    where: ToolPictureWhereUniqueInput;
    create: ToolPictureCreateInput;
    update: ToolPictureUpdateInput;
};
export declare type ToolPictureSelectUpsertArgs = {
    select: ToolPictureSelect;
    where: ToolPictureWhereUniqueInput;
    create: ToolPictureCreateInput;
    update: ToolPictureUpdateInput;
};
export declare type ToolPictureSelectUpsertArgsOptional = {
    select?: ToolPictureSelect | null;
    where: ToolPictureWhereUniqueInput;
    create: ToolPictureCreateInput;
    update: ToolPictureUpdateInput;
};
export declare type ToolPictureIncludeUpsertArgs = {
    include: ToolPictureInclude;
    where: ToolPictureWhereUniqueInput;
    create: ToolPictureCreateInput;
    update: ToolPictureUpdateInput;
};
export declare type ToolPictureIncludeUpsertArgsOptional = {
    include?: ToolPictureInclude | null;
    where: ToolPictureWhereUniqueInput;
    create: ToolPictureCreateInput;
    update: ToolPictureUpdateInput;
};
export declare type ExtractToolPictureSelectUpsertArgs<S extends undefined | boolean | ToolPictureSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolPictureSelectUpsertArgs ? S['select'] : true;
export declare type ExtractToolPictureIncludeUpsertArgs<S extends undefined | boolean | ToolPictureIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolPictureIncludeUpsertArgs ? S['include'] : true;
/**
 * ToolPicture delete
 */
export declare type ToolPictureDeleteArgs = {
    select?: ToolPictureSelect | null;
    include?: ToolPictureInclude | null;
    where: ToolPictureWhereUniqueInput;
};
export declare type ToolPictureDeleteArgsRequired = {
    select: ToolPictureSelect;
    include: ToolPictureInclude;
    where: ToolPictureWhereUniqueInput;
};
export declare type ToolPictureSelectDeleteArgs = {
    select: ToolPictureSelect;
    where: ToolPictureWhereUniqueInput;
};
export declare type ToolPictureSelectDeleteArgsOptional = {
    select?: ToolPictureSelect | null;
    where: ToolPictureWhereUniqueInput;
};
export declare type ToolPictureIncludeDeleteArgs = {
    include: ToolPictureInclude;
    where: ToolPictureWhereUniqueInput;
};
export declare type ToolPictureIncludeDeleteArgsOptional = {
    include?: ToolPictureInclude | null;
    where: ToolPictureWhereUniqueInput;
};
export declare type ExtractToolPictureSelectDeleteArgs<S extends undefined | boolean | ToolPictureSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolPictureSelectDeleteArgs ? S['select'] : true;
export declare type ExtractToolPictureIncludeDeleteArgs<S extends undefined | boolean | ToolPictureIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolPictureIncludeDeleteArgs ? S['include'] : true;
/**
 * ToolPicture deleteMany
 */
export declare type ToolPictureDeleteManyArgs = {
    where?: ToolPictureWhereInput | null;
};
/**
 * ToolPicture without action
 */
export declare type ToolPictureArgs = {
    select?: ToolPictureSelect | null;
    include?: ToolPictureInclude | null;
};
export declare type ToolPictureArgsRequired = {
    select: ToolPictureSelect;
    include: ToolPictureInclude;
};
export declare type ToolPictureSelectArgs = {
    select: ToolPictureSelect;
};
export declare type ToolPictureSelectArgsOptional = {
    select?: ToolPictureSelect | null;
};
export declare type ToolPictureIncludeArgs = {
    include: ToolPictureInclude;
};
export declare type ToolPictureIncludeArgsOptional = {
    include?: ToolPictureInclude | null;
};
export declare type ExtractToolPictureSelectArgs<S extends undefined | boolean | ToolPictureSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolPictureSelectArgs ? S['select'] : true;
export declare type ExtractToolPictureIncludeArgs<S extends undefined | boolean | ToolPictureIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ToolPictureIncludeArgs ? S['include'] : true;
/**
 * Model RentedTool
 */
export declare type RentedTool = {
    id: string;
    start_date: Date;
    end_date: Date;
};
export declare type RentedToolScalars = 'id' | 'start_date' | 'end_date';
export declare type RentedToolSelect = {
    id?: boolean;
    tool?: boolean | ToolSelectArgsOptional;
    renter?: boolean | UserSelectArgsOptional;
    start_date?: boolean;
    end_date?: boolean;
};
export declare type RentedToolInclude = {
    tool?: boolean | ToolIncludeArgsOptional;
    renter?: boolean | UserIncludeArgsOptional;
};
declare type RentedToolDefault = {
    id: true;
    start_date: true;
    end_date: true;
};
declare type RentedToolGetSelectPayload<S extends boolean | RentedToolSelect> = S extends true ? RentedTool : S extends RentedToolSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends RentedToolScalars ? RentedTool[P] : P extends 'tool' ? ToolGetSelectPayload<ExtractToolSelectArgs<S[P]>> : P extends 'renter' ? UserGetSelectPayload<ExtractUserSelectArgs<S[P]>> : never;
} : never;
declare type RentedToolGetIncludePayload<S extends boolean | RentedToolInclude> = S extends true ? RentedTool : S extends RentedToolInclude ? {
    [P in CleanupNever<MergeTruthyValues<RentedToolDefault, S>>]: P extends RentedToolScalars ? RentedTool[P] : P extends 'tool' ? ToolGetIncludePayload<ExtractToolIncludeArgs<S[P]>> : P extends 'renter' ? UserGetIncludePayload<ExtractUserIncludeArgs<S[P]>> : never;
} : never;
export interface RentedToolDelegate {
    <T extends FindManyRentedToolArgs>(args?: Subset<T, FindManyRentedToolArgs>): T extends FindManyRentedToolArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyRentedToolSelectArgs ? Promise<Array<RentedToolGetSelectPayload<ExtractFindManyRentedToolSelectArgs<T>>>> : T extends FindManyRentedToolIncludeArgs ? Promise<Array<RentedToolGetIncludePayload<ExtractFindManyRentedToolIncludeArgs<T>>>> : Promise<Array<RentedTool>>;
    findOne<T extends FindOneRentedToolArgs>(args: Subset<T, FindOneRentedToolArgs>): T extends FindOneRentedToolArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneRentedToolSelectArgs ? Promise<RentedToolGetSelectPayload<ExtractFindOneRentedToolSelectArgs<T>> | null> : T extends FindOneRentedToolIncludeArgs ? Promise<RentedToolGetIncludePayload<ExtractFindOneRentedToolIncludeArgs<T>> | null> : RentedToolClient<RentedTool | null>;
    findMany<T extends FindManyRentedToolArgs>(args?: Subset<T, FindManyRentedToolArgs>): T extends FindManyRentedToolArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyRentedToolSelectArgs ? Promise<Array<RentedToolGetSelectPayload<ExtractFindManyRentedToolSelectArgs<T>>>> : T extends FindManyRentedToolIncludeArgs ? Promise<Array<RentedToolGetIncludePayload<ExtractFindManyRentedToolIncludeArgs<T>>>> : Promise<Array<RentedTool>>;
    create<T extends RentedToolCreateArgs>(args: Subset<T, RentedToolCreateArgs>): T extends RentedToolCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends RentedToolSelectCreateArgs ? Promise<RentedToolGetSelectPayload<ExtractRentedToolSelectCreateArgs<T>>> : T extends RentedToolIncludeCreateArgs ? Promise<RentedToolGetIncludePayload<ExtractRentedToolIncludeCreateArgs<T>>> : RentedToolClient<RentedTool>;
    delete<T extends RentedToolDeleteArgs>(args: Subset<T, RentedToolDeleteArgs>): T extends RentedToolDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends RentedToolSelectDeleteArgs ? Promise<RentedToolGetSelectPayload<ExtractRentedToolSelectDeleteArgs<T>>> : T extends RentedToolIncludeDeleteArgs ? Promise<RentedToolGetIncludePayload<ExtractRentedToolIncludeDeleteArgs<T>>> : RentedToolClient<RentedTool>;
    update<T extends RentedToolUpdateArgs>(args: Subset<T, RentedToolUpdateArgs>): T extends RentedToolUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends RentedToolSelectUpdateArgs ? Promise<RentedToolGetSelectPayload<ExtractRentedToolSelectUpdateArgs<T>>> : T extends RentedToolIncludeUpdateArgs ? Promise<RentedToolGetIncludePayload<ExtractRentedToolIncludeUpdateArgs<T>>> : RentedToolClient<RentedTool>;
    deleteMany<T extends RentedToolDeleteManyArgs>(args: Subset<T, RentedToolDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends RentedToolUpdateManyArgs>(args: Subset<T, RentedToolUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends RentedToolUpsertArgs>(args: Subset<T, RentedToolUpsertArgs>): T extends RentedToolUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends RentedToolSelectUpsertArgs ? Promise<RentedToolGetSelectPayload<ExtractRentedToolSelectUpsertArgs<T>>> : T extends RentedToolIncludeUpsertArgs ? Promise<RentedToolGetIncludePayload<ExtractRentedToolIncludeUpsertArgs<T>>> : RentedToolClient<RentedTool>;
    count(): Promise<number>;
}
export declare class RentedToolClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    tool<T extends ToolArgs = {}>(args?: Subset<T, ToolArgs>): T extends FindOneToolArgsRequired ? 'Please either choose `select` or `include`' : T extends ToolSelectArgs ? Promise<ToolGetSelectPayload<ExtractToolSelectArgs<T>> | null> : T extends ToolIncludeArgs ? Promise<ToolGetIncludePayload<ExtractToolIncludeArgs<T>> | null> : ToolClient<Tool | null>;
    renter<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectArgs ? Promise<UserGetSelectPayload<ExtractUserSelectArgs<T>> | null> : T extends UserIncludeArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeArgs<T>> | null> : UserClient<User | null>;
    private readonly _document;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * RentedTool findOne
 */
export declare type FindOneRentedToolArgs = {
    select?: RentedToolSelect | null;
    include?: RentedToolInclude | null;
    where: RentedToolWhereUniqueInput;
};
export declare type FindOneRentedToolArgsRequired = {
    select: RentedToolSelect;
    include: RentedToolInclude;
    where: RentedToolWhereUniqueInput;
};
export declare type FindOneRentedToolSelectArgs = {
    select: RentedToolSelect;
    where: RentedToolWhereUniqueInput;
};
export declare type FindOneRentedToolSelectArgsOptional = {
    select?: RentedToolSelect | null;
    where: RentedToolWhereUniqueInput;
};
export declare type FindOneRentedToolIncludeArgs = {
    include: RentedToolInclude;
    where: RentedToolWhereUniqueInput;
};
export declare type FindOneRentedToolIncludeArgsOptional = {
    include?: RentedToolInclude | null;
    where: RentedToolWhereUniqueInput;
};
export declare type ExtractFindOneRentedToolSelectArgs<S extends undefined | boolean | FindOneRentedToolSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneRentedToolSelectArgs ? S['select'] : true;
export declare type ExtractFindOneRentedToolIncludeArgs<S extends undefined | boolean | FindOneRentedToolIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneRentedToolIncludeArgs ? S['include'] : true;
/**
 * RentedTool findMany
 */
export declare type FindManyRentedToolArgs = {
    select?: RentedToolSelect | null;
    include?: RentedToolInclude | null;
    where?: RentedToolWhereInput | null;
    orderBy?: RentedToolOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyRentedToolArgsRequired = {
    select: RentedToolSelect;
    include: RentedToolInclude;
    where?: RentedToolWhereInput | null;
    orderBy?: RentedToolOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyRentedToolSelectArgs = {
    select: RentedToolSelect;
    where?: RentedToolWhereInput | null;
    orderBy?: RentedToolOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyRentedToolSelectArgsOptional = {
    select?: RentedToolSelect | null;
    where?: RentedToolWhereInput | null;
    orderBy?: RentedToolOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyRentedToolIncludeArgs = {
    include: RentedToolInclude;
    where?: RentedToolWhereInput | null;
    orderBy?: RentedToolOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyRentedToolIncludeArgsOptional = {
    include?: RentedToolInclude | null;
    where?: RentedToolWhereInput | null;
    orderBy?: RentedToolOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyRentedToolSelectArgs<S extends undefined | boolean | FindManyRentedToolSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyRentedToolSelectArgs ? S['select'] : true;
export declare type ExtractFindManyRentedToolIncludeArgs<S extends undefined | boolean | FindManyRentedToolIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyRentedToolIncludeArgs ? S['include'] : true;
/**
 * RentedTool create
 */
export declare type RentedToolCreateArgs = {
    select?: RentedToolSelect | null;
    include?: RentedToolInclude | null;
    data: RentedToolCreateInput;
};
export declare type RentedToolCreateArgsRequired = {
    select: RentedToolSelect;
    include: RentedToolInclude;
    data: RentedToolCreateInput;
};
export declare type RentedToolSelectCreateArgs = {
    select: RentedToolSelect;
    data: RentedToolCreateInput;
};
export declare type RentedToolSelectCreateArgsOptional = {
    select?: RentedToolSelect | null;
    data: RentedToolCreateInput;
};
export declare type RentedToolIncludeCreateArgs = {
    include: RentedToolInclude;
    data: RentedToolCreateInput;
};
export declare type RentedToolIncludeCreateArgsOptional = {
    include?: RentedToolInclude | null;
    data: RentedToolCreateInput;
};
export declare type ExtractRentedToolSelectCreateArgs<S extends undefined | boolean | RentedToolSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RentedToolSelectCreateArgs ? S['select'] : true;
export declare type ExtractRentedToolIncludeCreateArgs<S extends undefined | boolean | RentedToolIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RentedToolIncludeCreateArgs ? S['include'] : true;
/**
 * RentedTool update
 */
export declare type RentedToolUpdateArgs = {
    select?: RentedToolSelect | null;
    include?: RentedToolInclude | null;
    data: RentedToolUpdateInput;
    where: RentedToolWhereUniqueInput;
};
export declare type RentedToolUpdateArgsRequired = {
    select: RentedToolSelect;
    include: RentedToolInclude;
    data: RentedToolUpdateInput;
    where: RentedToolWhereUniqueInput;
};
export declare type RentedToolSelectUpdateArgs = {
    select: RentedToolSelect;
    data: RentedToolUpdateInput;
    where: RentedToolWhereUniqueInput;
};
export declare type RentedToolSelectUpdateArgsOptional = {
    select?: RentedToolSelect | null;
    data: RentedToolUpdateInput;
    where: RentedToolWhereUniqueInput;
};
export declare type RentedToolIncludeUpdateArgs = {
    include: RentedToolInclude;
    data: RentedToolUpdateInput;
    where: RentedToolWhereUniqueInput;
};
export declare type RentedToolIncludeUpdateArgsOptional = {
    include?: RentedToolInclude | null;
    data: RentedToolUpdateInput;
    where: RentedToolWhereUniqueInput;
};
export declare type ExtractRentedToolSelectUpdateArgs<S extends undefined | boolean | RentedToolSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RentedToolSelectUpdateArgs ? S['select'] : true;
export declare type ExtractRentedToolIncludeUpdateArgs<S extends undefined | boolean | RentedToolIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RentedToolIncludeUpdateArgs ? S['include'] : true;
/**
 * RentedTool updateMany
 */
export declare type RentedToolUpdateManyArgs = {
    data: RentedToolUpdateManyMutationInput;
    where?: RentedToolWhereInput | null;
};
/**
 * RentedTool upsert
 */
export declare type RentedToolUpsertArgs = {
    select?: RentedToolSelect | null;
    include?: RentedToolInclude | null;
    where: RentedToolWhereUniqueInput;
    create: RentedToolCreateInput;
    update: RentedToolUpdateInput;
};
export declare type RentedToolUpsertArgsRequired = {
    select: RentedToolSelect;
    include: RentedToolInclude;
    where: RentedToolWhereUniqueInput;
    create: RentedToolCreateInput;
    update: RentedToolUpdateInput;
};
export declare type RentedToolSelectUpsertArgs = {
    select: RentedToolSelect;
    where: RentedToolWhereUniqueInput;
    create: RentedToolCreateInput;
    update: RentedToolUpdateInput;
};
export declare type RentedToolSelectUpsertArgsOptional = {
    select?: RentedToolSelect | null;
    where: RentedToolWhereUniqueInput;
    create: RentedToolCreateInput;
    update: RentedToolUpdateInput;
};
export declare type RentedToolIncludeUpsertArgs = {
    include: RentedToolInclude;
    where: RentedToolWhereUniqueInput;
    create: RentedToolCreateInput;
    update: RentedToolUpdateInput;
};
export declare type RentedToolIncludeUpsertArgsOptional = {
    include?: RentedToolInclude | null;
    where: RentedToolWhereUniqueInput;
    create: RentedToolCreateInput;
    update: RentedToolUpdateInput;
};
export declare type ExtractRentedToolSelectUpsertArgs<S extends undefined | boolean | RentedToolSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RentedToolSelectUpsertArgs ? S['select'] : true;
export declare type ExtractRentedToolIncludeUpsertArgs<S extends undefined | boolean | RentedToolIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RentedToolIncludeUpsertArgs ? S['include'] : true;
/**
 * RentedTool delete
 */
export declare type RentedToolDeleteArgs = {
    select?: RentedToolSelect | null;
    include?: RentedToolInclude | null;
    where: RentedToolWhereUniqueInput;
};
export declare type RentedToolDeleteArgsRequired = {
    select: RentedToolSelect;
    include: RentedToolInclude;
    where: RentedToolWhereUniqueInput;
};
export declare type RentedToolSelectDeleteArgs = {
    select: RentedToolSelect;
    where: RentedToolWhereUniqueInput;
};
export declare type RentedToolSelectDeleteArgsOptional = {
    select?: RentedToolSelect | null;
    where: RentedToolWhereUniqueInput;
};
export declare type RentedToolIncludeDeleteArgs = {
    include: RentedToolInclude;
    where: RentedToolWhereUniqueInput;
};
export declare type RentedToolIncludeDeleteArgsOptional = {
    include?: RentedToolInclude | null;
    where: RentedToolWhereUniqueInput;
};
export declare type ExtractRentedToolSelectDeleteArgs<S extends undefined | boolean | RentedToolSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RentedToolSelectDeleteArgs ? S['select'] : true;
export declare type ExtractRentedToolIncludeDeleteArgs<S extends undefined | boolean | RentedToolIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RentedToolIncludeDeleteArgs ? S['include'] : true;
/**
 * RentedTool deleteMany
 */
export declare type RentedToolDeleteManyArgs = {
    where?: RentedToolWhereInput | null;
};
/**
 * RentedTool without action
 */
export declare type RentedToolArgs = {
    select?: RentedToolSelect | null;
    include?: RentedToolInclude | null;
};
export declare type RentedToolArgsRequired = {
    select: RentedToolSelect;
    include: RentedToolInclude;
};
export declare type RentedToolSelectArgs = {
    select: RentedToolSelect;
};
export declare type RentedToolSelectArgsOptional = {
    select?: RentedToolSelect | null;
};
export declare type RentedToolIncludeArgs = {
    include: RentedToolInclude;
};
export declare type RentedToolIncludeArgsOptional = {
    include?: RentedToolInclude | null;
};
export declare type ExtractRentedToolSelectArgs<S extends undefined | boolean | RentedToolSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RentedToolSelectArgs ? S['select'] : true;
export declare type ExtractRentedToolIncludeArgs<S extends undefined | boolean | RentedToolIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends RentedToolIncludeArgs ? S['include'] : true;
/**
 * Deep Input Types
 */
export declare type EmailWhereInput = {
    id?: string | StringFilter | null;
    address?: string | StringFilter | null;
    purpose?: string | NullableStringFilter | null | null;
    AND?: Enumerable<EmailWhereInput> | null;
    OR?: Enumerable<EmailWhereInput> | null;
    NOT?: Enumerable<EmailWhereInput> | null;
    owner?: UserWhereInput | null;
};
export declare type PhoneWhereInput = {
    id?: string | StringFilter | null;
    num?: string | StringFilter | null;
    purpose?: string | NullableStringFilter | null | null;
    AND?: Enumerable<PhoneWhereInput> | null;
    OR?: Enumerable<PhoneWhereInput> | null;
    NOT?: Enumerable<PhoneWhereInput> | null;
    owner?: UserWhereInput | null;
};
export declare type ToolPictureWhereInput = {
    id?: string | StringFilter | null;
    image?: string | StringFilter | null;
    description?: string | NullableStringFilter | null | null;
    AND?: Enumerable<ToolPictureWhereInput> | null;
    OR?: Enumerable<ToolPictureWhereInput> | null;
    NOT?: Enumerable<ToolPictureWhereInput> | null;
    tool?: ToolWhereInput | null;
};
export declare type RentedToolWhereInput = {
    id?: string | StringFilter | null;
    start_date?: Date | string | DateTimeFilter | null;
    end_date?: Date | string | DateTimeFilter | null;
    AND?: Enumerable<RentedToolWhereInput> | null;
    OR?: Enumerable<RentedToolWhereInput> | null;
    NOT?: Enumerable<RentedToolWhereInput> | null;
    tool?: ToolWhereInput | null;
    renter?: UserWhereInput | null;
};
export declare type ToolWhereInput = {
    id?: string | StringFilter | null;
    title?: string | StringFilter | null;
    category?: string | StringFilter | null;
    description?: string | StringFilter | null;
    price?: number | FloatFilter | null;
    pictures?: ToolPictureFilter | null;
    rentedTools?: RentedToolFilter | null;
    AND?: Enumerable<ToolWhereInput> | null;
    OR?: Enumerable<ToolWhereInput> | null;
    NOT?: Enumerable<ToolWhereInput> | null;
    depot?: DepotWhereInput | null;
};
export declare type DepotWhereInput = {
    id?: string | StringFilter | null;
    address_1?: string | StringFilter | null;
    address_2?: string | NullableStringFilter | null | null;
    city?: string | StringFilter | null;
    state?: string | StringFilter | null;
    zipcode?: string | StringFilter | null;
    tools?: ToolFilter | null;
    AND?: Enumerable<DepotWhereInput> | null;
    OR?: Enumerable<DepotWhereInput> | null;
    NOT?: Enumerable<DepotWhereInput> | null;
    owner?: UserWhereInput | null;
};
export declare type RatingWhereInput = {
    id?: string | StringFilter | null;
    point?: number | IntFilter | null;
    type?: RatingType | RatingTypeFilter | null;
    comment?: string | NullableStringFilter | null | null;
    AND?: Enumerable<RatingWhereInput> | null;
    OR?: Enumerable<RatingWhereInput> | null;
    NOT?: Enumerable<RatingWhereInput> | null;
    user?: UserWhereInput | null;
};
export declare type UserWhereInput = {
    id?: string | StringFilter | null;
    password_hash?: string | StringFilter | null;
    email?: string | StringFilter | null;
    first_name?: string | StringFilter | null;
    last_name?: string | StringFilter | null;
    birth_date?: Date | string | DateTimeFilter | null;
    emails?: EmailFilter | null;
    phones?: PhoneFilter | null;
    depots?: DepotFilter | null;
    ratings?: RatingFilter | null;
    rentedTools?: RentedToolFilter | null;
    AND?: Enumerable<UserWhereInput> | null;
    OR?: Enumerable<UserWhereInput> | null;
    NOT?: Enumerable<UserWhereInput> | null;
};
export declare type UserWhereUniqueInput = {
    id?: string | null;
    email?: string | null;
};
export declare type EmailWhereUniqueInput = {
    id?: string | null;
};
export declare type PhoneWhereUniqueInput = {
    id?: string | null;
};
export declare type RatingWhereUniqueInput = {
    id?: string | null;
};
export declare type DepotWhereUniqueInput = {
    id?: string | null;
};
export declare type ToolWhereUniqueInput = {
    id?: string | null;
};
export declare type ToolPictureWhereUniqueInput = {
    id?: string | null;
};
export declare type RentedToolWhereUniqueInput = {
    id?: string | null;
};
export declare type EmailCreateWithoutOwnerInput = {
    id?: string | null;
    address: string;
    purpose?: string | null;
};
export declare type EmailCreateManyWithoutEmailsInput = {
    create?: Enumerable<EmailCreateWithoutOwnerInput> | null;
    connect?: Enumerable<EmailWhereUniqueInput> | null;
};
export declare type PhoneCreateWithoutOwnerInput = {
    id?: string | null;
    num: string;
    purpose?: string | null;
};
export declare type PhoneCreateManyWithoutPhonesInput = {
    create?: Enumerable<PhoneCreateWithoutOwnerInput> | null;
    connect?: Enumerable<PhoneWhereUniqueInput> | null;
};
export declare type ToolPictureCreateWithoutToolInput = {
    id?: string | null;
    image: string;
    description?: string | null;
};
export declare type ToolPictureCreateManyWithoutPicturesInput = {
    create?: Enumerable<ToolPictureCreateWithoutToolInput> | null;
    connect?: Enumerable<ToolPictureWhereUniqueInput> | null;
};
export declare type RatingCreateWithoutUserInput = {
    id?: string | null;
    point: number;
    type: RatingType;
    comment?: string | null;
};
export declare type RatingCreateManyWithoutRatingsInput = {
    create?: Enumerable<RatingCreateWithoutUserInput> | null;
    connect?: Enumerable<RatingWhereUniqueInput> | null;
};
export declare type UserCreateWithoutRentedToolsInput = {
    id?: string | null;
    password_hash: string;
    email: string;
    first_name: string;
    last_name: string;
    birth_date: Date | string;
    emails?: EmailCreateManyWithoutEmailsInput | null;
    phones?: PhoneCreateManyWithoutPhonesInput | null;
    depots?: DepotCreateManyWithoutDepotsInput | null;
    ratings?: RatingCreateManyWithoutRatingsInput | null;
};
export declare type UserCreateOneWithoutRenterInput = {
    create?: UserCreateWithoutRentedToolsInput | null;
    connect?: UserWhereUniqueInput | null;
};
export declare type RentedToolCreateWithoutToolInput = {
    id?: string | null;
    start_date: Date | string;
    end_date: Date | string;
    renter: UserCreateOneWithoutRenterInput;
};
export declare type RentedToolCreateManyWithoutRentedToolsInput = {
    create?: Enumerable<RentedToolCreateWithoutToolInput> | null;
    connect?: Enumerable<RentedToolWhereUniqueInput> | null;
};
export declare type ToolCreateWithoutDepotInput = {
    id?: string | null;
    title: string;
    category: string;
    description: string;
    price: number;
    pictures?: ToolPictureCreateManyWithoutPicturesInput | null;
    rentedTools?: RentedToolCreateManyWithoutRentedToolsInput | null;
};
export declare type ToolCreateManyWithoutToolsInput = {
    create?: Enumerable<ToolCreateWithoutDepotInput> | null;
    connect?: Enumerable<ToolWhereUniqueInput> | null;
};
export declare type DepotCreateWithoutOwnerInput = {
    id?: string | null;
    address_1: string;
    address_2?: string | null;
    city: string;
    state: string;
    zipcode: string;
    tools?: ToolCreateManyWithoutToolsInput | null;
};
export declare type DepotCreateManyWithoutDepotsInput = {
    create?: Enumerable<DepotCreateWithoutOwnerInput> | null;
    connect?: Enumerable<DepotWhereUniqueInput> | null;
};
export declare type UserCreateInput = {
    id?: string | null;
    password_hash: string;
    email: string;
    first_name: string;
    last_name: string;
    birth_date: Date | string;
    emails?: EmailCreateManyWithoutEmailsInput | null;
    phones?: PhoneCreateManyWithoutPhonesInput | null;
    depots?: DepotCreateManyWithoutDepotsInput | null;
    ratings?: RatingCreateManyWithoutRatingsInput | null;
    rentedTools?: RentedToolCreateManyWithoutRentedToolsInput | null;
};
export declare type EmailUpdateWithoutOwnerDataInput = {
    id?: string | null;
    address?: string | null;
    purpose?: string | null;
};
export declare type EmailUpdateWithWhereUniqueWithoutOwnerInput = {
    where: EmailWhereUniqueInput;
    data: EmailUpdateWithoutOwnerDataInput;
};
export declare type EmailScalarWhereInput = {
    id?: string | StringFilter | null;
    address?: string | StringFilter | null;
    purpose?: string | NullableStringFilter | null | null;
    AND?: Enumerable<EmailScalarWhereInput> | null;
    OR?: Enumerable<EmailScalarWhereInput> | null;
    NOT?: Enumerable<EmailScalarWhereInput> | null;
};
export declare type EmailUpdateManyDataInput = {
    id?: string | null;
    address?: string | null;
    purpose?: string | null;
};
export declare type EmailUpdateManyWithWhereNestedInput = {
    where: EmailScalarWhereInput;
    data: EmailUpdateManyDataInput;
};
export declare type EmailUpsertWithWhereUniqueWithoutOwnerInput = {
    where: EmailWhereUniqueInput;
    update: EmailUpdateWithoutOwnerDataInput;
    create: EmailCreateWithoutOwnerInput;
};
export declare type EmailUpdateManyWithoutOwnerInput = {
    create?: Enumerable<EmailCreateWithoutOwnerInput> | null;
    connect?: Enumerable<EmailWhereUniqueInput> | null;
    set?: Enumerable<EmailWhereUniqueInput> | null;
    disconnect?: Enumerable<EmailWhereUniqueInput> | null;
    delete?: Enumerable<EmailWhereUniqueInput> | null;
    update?: Enumerable<EmailUpdateWithWhereUniqueWithoutOwnerInput> | null;
    updateMany?: Enumerable<EmailUpdateManyWithWhereNestedInput> | null;
    deleteMany?: Enumerable<EmailScalarWhereInput> | null;
    upsert?: Enumerable<EmailUpsertWithWhereUniqueWithoutOwnerInput> | null;
};
export declare type PhoneUpdateWithoutOwnerDataInput = {
    id?: string | null;
    num?: string | null;
    purpose?: string | null;
};
export declare type PhoneUpdateWithWhereUniqueWithoutOwnerInput = {
    where: PhoneWhereUniqueInput;
    data: PhoneUpdateWithoutOwnerDataInput;
};
export declare type PhoneScalarWhereInput = {
    id?: string | StringFilter | null;
    num?: string | StringFilter | null;
    purpose?: string | NullableStringFilter | null | null;
    AND?: Enumerable<PhoneScalarWhereInput> | null;
    OR?: Enumerable<PhoneScalarWhereInput> | null;
    NOT?: Enumerable<PhoneScalarWhereInput> | null;
};
export declare type PhoneUpdateManyDataInput = {
    id?: string | null;
    num?: string | null;
    purpose?: string | null;
};
export declare type PhoneUpdateManyWithWhereNestedInput = {
    where: PhoneScalarWhereInput;
    data: PhoneUpdateManyDataInput;
};
export declare type PhoneUpsertWithWhereUniqueWithoutOwnerInput = {
    where: PhoneWhereUniqueInput;
    update: PhoneUpdateWithoutOwnerDataInput;
    create: PhoneCreateWithoutOwnerInput;
};
export declare type PhoneUpdateManyWithoutOwnerInput = {
    create?: Enumerable<PhoneCreateWithoutOwnerInput> | null;
    connect?: Enumerable<PhoneWhereUniqueInput> | null;
    set?: Enumerable<PhoneWhereUniqueInput> | null;
    disconnect?: Enumerable<PhoneWhereUniqueInput> | null;
    delete?: Enumerable<PhoneWhereUniqueInput> | null;
    update?: Enumerable<PhoneUpdateWithWhereUniqueWithoutOwnerInput> | null;
    updateMany?: Enumerable<PhoneUpdateManyWithWhereNestedInput> | null;
    deleteMany?: Enumerable<PhoneScalarWhereInput> | null;
    upsert?: Enumerable<PhoneUpsertWithWhereUniqueWithoutOwnerInput> | null;
};
export declare type ToolPictureUpdateWithoutToolDataInput = {
    id?: string | null;
    image?: string | null;
    description?: string | null;
};
export declare type ToolPictureUpdateWithWhereUniqueWithoutToolInput = {
    where: ToolPictureWhereUniqueInput;
    data: ToolPictureUpdateWithoutToolDataInput;
};
export declare type ToolPictureScalarWhereInput = {
    id?: string | StringFilter | null;
    image?: string | StringFilter | null;
    description?: string | NullableStringFilter | null | null;
    AND?: Enumerable<ToolPictureScalarWhereInput> | null;
    OR?: Enumerable<ToolPictureScalarWhereInput> | null;
    NOT?: Enumerable<ToolPictureScalarWhereInput> | null;
};
export declare type ToolPictureUpdateManyDataInput = {
    id?: string | null;
    image?: string | null;
    description?: string | null;
};
export declare type ToolPictureUpdateManyWithWhereNestedInput = {
    where: ToolPictureScalarWhereInput;
    data: ToolPictureUpdateManyDataInput;
};
export declare type ToolPictureUpsertWithWhereUniqueWithoutToolInput = {
    where: ToolPictureWhereUniqueInput;
    update: ToolPictureUpdateWithoutToolDataInput;
    create: ToolPictureCreateWithoutToolInput;
};
export declare type ToolPictureUpdateManyWithoutToolInput = {
    create?: Enumerable<ToolPictureCreateWithoutToolInput> | null;
    connect?: Enumerable<ToolPictureWhereUniqueInput> | null;
    set?: Enumerable<ToolPictureWhereUniqueInput> | null;
    disconnect?: Enumerable<ToolPictureWhereUniqueInput> | null;
    delete?: Enumerable<ToolPictureWhereUniqueInput> | null;
    update?: Enumerable<ToolPictureUpdateWithWhereUniqueWithoutToolInput> | null;
    updateMany?: Enumerable<ToolPictureUpdateManyWithWhereNestedInput> | null;
    deleteMany?: Enumerable<ToolPictureScalarWhereInput> | null;
    upsert?: Enumerable<ToolPictureUpsertWithWhereUniqueWithoutToolInput> | null;
};
export declare type RatingUpdateWithoutUserDataInput = {
    id?: string | null;
    point?: number | null;
    type?: RatingType | null;
    comment?: string | null;
};
export declare type RatingUpdateWithWhereUniqueWithoutUserInput = {
    where: RatingWhereUniqueInput;
    data: RatingUpdateWithoutUserDataInput;
};
export declare type RatingScalarWhereInput = {
    id?: string | StringFilter | null;
    point?: number | IntFilter | null;
    type?: RatingType | RatingTypeFilter | null;
    comment?: string | NullableStringFilter | null | null;
    AND?: Enumerable<RatingScalarWhereInput> | null;
    OR?: Enumerable<RatingScalarWhereInput> | null;
    NOT?: Enumerable<RatingScalarWhereInput> | null;
};
export declare type RatingUpdateManyDataInput = {
    id?: string | null;
    point?: number | null;
    type?: RatingType | null;
    comment?: string | null;
};
export declare type RatingUpdateManyWithWhereNestedInput = {
    where: RatingScalarWhereInput;
    data: RatingUpdateManyDataInput;
};
export declare type RatingUpsertWithWhereUniqueWithoutUserInput = {
    where: RatingWhereUniqueInput;
    update: RatingUpdateWithoutUserDataInput;
    create: RatingCreateWithoutUserInput;
};
export declare type RatingUpdateManyWithoutUserInput = {
    create?: Enumerable<RatingCreateWithoutUserInput> | null;
    connect?: Enumerable<RatingWhereUniqueInput> | null;
    set?: Enumerable<RatingWhereUniqueInput> | null;
    disconnect?: Enumerable<RatingWhereUniqueInput> | null;
    delete?: Enumerable<RatingWhereUniqueInput> | null;
    update?: Enumerable<RatingUpdateWithWhereUniqueWithoutUserInput> | null;
    updateMany?: Enumerable<RatingUpdateManyWithWhereNestedInput> | null;
    deleteMany?: Enumerable<RatingScalarWhereInput> | null;
    upsert?: Enumerable<RatingUpsertWithWhereUniqueWithoutUserInput> | null;
};
export declare type UserUpdateWithoutRentedToolsDataInput = {
    id?: string | null;
    password_hash?: string | null;
    email?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    birth_date?: Date | string | null;
    emails?: EmailUpdateManyWithoutOwnerInput | null;
    phones?: PhoneUpdateManyWithoutOwnerInput | null;
    depots?: DepotUpdateManyWithoutOwnerInput | null;
    ratings?: RatingUpdateManyWithoutUserInput | null;
};
export declare type UserUpsertWithoutRentedToolsInput = {
    update: UserUpdateWithoutRentedToolsDataInput;
    create: UserCreateWithoutRentedToolsInput;
};
export declare type UserUpdateOneRequiredWithoutRentedToolsInput = {
    create?: UserCreateWithoutRentedToolsInput | null;
    connect?: UserWhereUniqueInput | null;
    update?: UserUpdateWithoutRentedToolsDataInput | null;
    upsert?: UserUpsertWithoutRentedToolsInput | null;
};
export declare type RentedToolUpdateWithoutToolDataInput = {
    id?: string | null;
    start_date?: Date | string | null;
    end_date?: Date | string | null;
    renter?: UserUpdateOneRequiredWithoutRentedToolsInput | null;
};
export declare type RentedToolUpdateWithWhereUniqueWithoutToolInput = {
    where: RentedToolWhereUniqueInput;
    data: RentedToolUpdateWithoutToolDataInput;
};
export declare type RentedToolScalarWhereInput = {
    id?: string | StringFilter | null;
    start_date?: Date | string | DateTimeFilter | null;
    end_date?: Date | string | DateTimeFilter | null;
    AND?: Enumerable<RentedToolScalarWhereInput> | null;
    OR?: Enumerable<RentedToolScalarWhereInput> | null;
    NOT?: Enumerable<RentedToolScalarWhereInput> | null;
};
export declare type RentedToolUpdateManyDataInput = {
    id?: string | null;
    start_date?: Date | string | null;
    end_date?: Date | string | null;
};
export declare type RentedToolUpdateManyWithWhereNestedInput = {
    where: RentedToolScalarWhereInput;
    data: RentedToolUpdateManyDataInput;
};
export declare type RentedToolUpsertWithWhereUniqueWithoutToolInput = {
    where: RentedToolWhereUniqueInput;
    update: RentedToolUpdateWithoutToolDataInput;
    create: RentedToolCreateWithoutToolInput;
};
export declare type RentedToolUpdateManyWithoutToolInput = {
    create?: Enumerable<RentedToolCreateWithoutToolInput> | null;
    connect?: Enumerable<RentedToolWhereUniqueInput> | null;
    set?: Enumerable<RentedToolWhereUniqueInput> | null;
    disconnect?: Enumerable<RentedToolWhereUniqueInput> | null;
    delete?: Enumerable<RentedToolWhereUniqueInput> | null;
    update?: Enumerable<RentedToolUpdateWithWhereUniqueWithoutToolInput> | null;
    updateMany?: Enumerable<RentedToolUpdateManyWithWhereNestedInput> | null;
    deleteMany?: Enumerable<RentedToolScalarWhereInput> | null;
    upsert?: Enumerable<RentedToolUpsertWithWhereUniqueWithoutToolInput> | null;
};
export declare type ToolUpdateWithoutDepotDataInput = {
    id?: string | null;
    title?: string | null;
    category?: string | null;
    description?: string | null;
    price?: number | null;
    pictures?: ToolPictureUpdateManyWithoutToolInput | null;
    rentedTools?: RentedToolUpdateManyWithoutToolInput | null;
};
export declare type ToolUpdateWithWhereUniqueWithoutDepotInput = {
    where: ToolWhereUniqueInput;
    data: ToolUpdateWithoutDepotDataInput;
};
export declare type ToolScalarWhereInput = {
    id?: string | StringFilter | null;
    title?: string | StringFilter | null;
    category?: string | StringFilter | null;
    description?: string | StringFilter | null;
    price?: number | FloatFilter | null;
    pictures?: ToolPictureFilter | null;
    rentedTools?: RentedToolFilter | null;
    AND?: Enumerable<ToolScalarWhereInput> | null;
    OR?: Enumerable<ToolScalarWhereInput> | null;
    NOT?: Enumerable<ToolScalarWhereInput> | null;
};
export declare type ToolUpdateManyDataInput = {
    id?: string | null;
    title?: string | null;
    category?: string | null;
    description?: string | null;
    price?: number | null;
};
export declare type ToolUpdateManyWithWhereNestedInput = {
    where: ToolScalarWhereInput;
    data: ToolUpdateManyDataInput;
};
export declare type ToolUpsertWithWhereUniqueWithoutDepotInput = {
    where: ToolWhereUniqueInput;
    update: ToolUpdateWithoutDepotDataInput;
    create: ToolCreateWithoutDepotInput;
};
export declare type ToolUpdateManyWithoutDepotInput = {
    create?: Enumerable<ToolCreateWithoutDepotInput> | null;
    connect?: Enumerable<ToolWhereUniqueInput> | null;
    set?: Enumerable<ToolWhereUniqueInput> | null;
    disconnect?: Enumerable<ToolWhereUniqueInput> | null;
    delete?: Enumerable<ToolWhereUniqueInput> | null;
    update?: Enumerable<ToolUpdateWithWhereUniqueWithoutDepotInput> | null;
    updateMany?: Enumerable<ToolUpdateManyWithWhereNestedInput> | null;
    deleteMany?: Enumerable<ToolScalarWhereInput> | null;
    upsert?: Enumerable<ToolUpsertWithWhereUniqueWithoutDepotInput> | null;
};
export declare type DepotUpdateWithoutOwnerDataInput = {
    id?: string | null;
    address_1?: string | null;
    address_2?: string | null;
    city?: string | null;
    state?: string | null;
    zipcode?: string | null;
    tools?: ToolUpdateManyWithoutDepotInput | null;
};
export declare type DepotUpdateWithWhereUniqueWithoutOwnerInput = {
    where: DepotWhereUniqueInput;
    data: DepotUpdateWithoutOwnerDataInput;
};
export declare type DepotScalarWhereInput = {
    id?: string | StringFilter | null;
    address_1?: string | StringFilter | null;
    address_2?: string | NullableStringFilter | null | null;
    city?: string | StringFilter | null;
    state?: string | StringFilter | null;
    zipcode?: string | StringFilter | null;
    tools?: ToolFilter | null;
    AND?: Enumerable<DepotScalarWhereInput> | null;
    OR?: Enumerable<DepotScalarWhereInput> | null;
    NOT?: Enumerable<DepotScalarWhereInput> | null;
};
export declare type DepotUpdateManyDataInput = {
    id?: string | null;
    address_1?: string | null;
    address_2?: string | null;
    city?: string | null;
    state?: string | null;
    zipcode?: string | null;
};
export declare type DepotUpdateManyWithWhereNestedInput = {
    where: DepotScalarWhereInput;
    data: DepotUpdateManyDataInput;
};
export declare type DepotUpsertWithWhereUniqueWithoutOwnerInput = {
    where: DepotWhereUniqueInput;
    update: DepotUpdateWithoutOwnerDataInput;
    create: DepotCreateWithoutOwnerInput;
};
export declare type DepotUpdateManyWithoutOwnerInput = {
    create?: Enumerable<DepotCreateWithoutOwnerInput> | null;
    connect?: Enumerable<DepotWhereUniqueInput> | null;
    set?: Enumerable<DepotWhereUniqueInput> | null;
    disconnect?: Enumerable<DepotWhereUniqueInput> | null;
    delete?: Enumerable<DepotWhereUniqueInput> | null;
    update?: Enumerable<DepotUpdateWithWhereUniqueWithoutOwnerInput> | null;
    updateMany?: Enumerable<DepotUpdateManyWithWhereNestedInput> | null;
    deleteMany?: Enumerable<DepotScalarWhereInput> | null;
    upsert?: Enumerable<DepotUpsertWithWhereUniqueWithoutOwnerInput> | null;
};
export declare type UserCreateWithoutDepotsInput = {
    id?: string | null;
    password_hash: string;
    email: string;
    first_name: string;
    last_name: string;
    birth_date: Date | string;
    emails?: EmailCreateManyWithoutEmailsInput | null;
    phones?: PhoneCreateManyWithoutPhonesInput | null;
    ratings?: RatingCreateManyWithoutRatingsInput | null;
    rentedTools?: RentedToolCreateManyWithoutRentedToolsInput | null;
};
export declare type UserCreateOneWithoutOwnerInput = {
    create?: UserCreateWithoutDepotsInput | null;
    connect?: UserWhereUniqueInput | null;
};
export declare type DepotCreateWithoutToolsInput = {
    id?: string | null;
    address_1: string;
    address_2?: string | null;
    city: string;
    state: string;
    zipcode: string;
    owner: UserCreateOneWithoutOwnerInput;
};
export declare type DepotCreateOneWithoutDepotInput = {
    create?: DepotCreateWithoutToolsInput | null;
    connect?: DepotWhereUniqueInput | null;
};
export declare type ToolCreateWithoutRentedToolsInput = {
    id?: string | null;
    title: string;
    category: string;
    description: string;
    price: number;
    depot: DepotCreateOneWithoutDepotInput;
    pictures?: ToolPictureCreateManyWithoutPicturesInput | null;
};
export declare type ToolCreateOneWithoutToolInput = {
    create?: ToolCreateWithoutRentedToolsInput | null;
    connect?: ToolWhereUniqueInput | null;
};
export declare type RentedToolCreateWithoutRenterInput = {
    id?: string | null;
    start_date: Date | string;
    end_date: Date | string;
    tool: ToolCreateOneWithoutToolInput;
};
export declare type UserUpdateWithoutDepotsDataInput = {
    id?: string | null;
    password_hash?: string | null;
    email?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    birth_date?: Date | string | null;
    emails?: EmailUpdateManyWithoutOwnerInput | null;
    phones?: PhoneUpdateManyWithoutOwnerInput | null;
    ratings?: RatingUpdateManyWithoutUserInput | null;
    rentedTools?: RentedToolUpdateManyWithoutRenterInput | null;
};
export declare type UserUpsertWithoutDepotsInput = {
    update: UserUpdateWithoutDepotsDataInput;
    create: UserCreateWithoutDepotsInput;
};
export declare type UserUpdateOneRequiredWithoutDepotsInput = {
    create?: UserCreateWithoutDepotsInput | null;
    connect?: UserWhereUniqueInput | null;
    update?: UserUpdateWithoutDepotsDataInput | null;
    upsert?: UserUpsertWithoutDepotsInput | null;
};
export declare type DepotUpdateWithoutToolsDataInput = {
    id?: string | null;
    address_1?: string | null;
    address_2?: string | null;
    city?: string | null;
    state?: string | null;
    zipcode?: string | null;
    owner?: UserUpdateOneRequiredWithoutDepotsInput | null;
};
export declare type DepotUpsertWithoutToolsInput = {
    update: DepotUpdateWithoutToolsDataInput;
    create: DepotCreateWithoutToolsInput;
};
export declare type DepotUpdateOneRequiredWithoutToolsInput = {
    create?: DepotCreateWithoutToolsInput | null;
    connect?: DepotWhereUniqueInput | null;
    update?: DepotUpdateWithoutToolsDataInput | null;
    upsert?: DepotUpsertWithoutToolsInput | null;
};
export declare type ToolUpdateWithoutRentedToolsDataInput = {
    id?: string | null;
    title?: string | null;
    category?: string | null;
    description?: string | null;
    price?: number | null;
    depot?: DepotUpdateOneRequiredWithoutToolsInput | null;
    pictures?: ToolPictureUpdateManyWithoutToolInput | null;
};
export declare type ToolUpsertWithoutRentedToolsInput = {
    update: ToolUpdateWithoutRentedToolsDataInput;
    create: ToolCreateWithoutRentedToolsInput;
};
export declare type ToolUpdateOneRequiredWithoutRentedToolsInput = {
    create?: ToolCreateWithoutRentedToolsInput | null;
    connect?: ToolWhereUniqueInput | null;
    update?: ToolUpdateWithoutRentedToolsDataInput | null;
    upsert?: ToolUpsertWithoutRentedToolsInput | null;
};
export declare type RentedToolUpdateWithoutRenterDataInput = {
    id?: string | null;
    start_date?: Date | string | null;
    end_date?: Date | string | null;
    tool?: ToolUpdateOneRequiredWithoutRentedToolsInput | null;
};
export declare type RentedToolUpdateWithWhereUniqueWithoutRenterInput = {
    where: RentedToolWhereUniqueInput;
    data: RentedToolUpdateWithoutRenterDataInput;
};
export declare type RentedToolUpsertWithWhereUniqueWithoutRenterInput = {
    where: RentedToolWhereUniqueInput;
    update: RentedToolUpdateWithoutRenterDataInput;
    create: RentedToolCreateWithoutRenterInput;
};
export declare type RentedToolUpdateManyWithoutRenterInput = {
    create?: Enumerable<RentedToolCreateWithoutRenterInput> | null;
    connect?: Enumerable<RentedToolWhereUniqueInput> | null;
    set?: Enumerable<RentedToolWhereUniqueInput> | null;
    disconnect?: Enumerable<RentedToolWhereUniqueInput> | null;
    delete?: Enumerable<RentedToolWhereUniqueInput> | null;
    update?: Enumerable<RentedToolUpdateWithWhereUniqueWithoutRenterInput> | null;
    updateMany?: Enumerable<RentedToolUpdateManyWithWhereNestedInput> | null;
    deleteMany?: Enumerable<RentedToolScalarWhereInput> | null;
    upsert?: Enumerable<RentedToolUpsertWithWhereUniqueWithoutRenterInput> | null;
};
export declare type UserUpdateInput = {
    id?: string | null;
    password_hash?: string | null;
    email?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    birth_date?: Date | string | null;
    emails?: EmailUpdateManyWithoutOwnerInput | null;
    phones?: PhoneUpdateManyWithoutOwnerInput | null;
    depots?: DepotUpdateManyWithoutOwnerInput | null;
    ratings?: RatingUpdateManyWithoutUserInput | null;
    rentedTools?: RentedToolUpdateManyWithoutRenterInput | null;
};
export declare type UserUpdateManyMutationInput = {
    id?: string | null;
    password_hash?: string | null;
    email?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    birth_date?: Date | string | null;
};
export declare type EmailCreateInput = {
    id?: string | null;
    address: string;
    purpose?: string | null;
    owner: UserCreateOneWithoutOwnerInput;
};
export declare type UserCreateWithoutEmailsInput = {
    id?: string | null;
    password_hash: string;
    email: string;
    first_name: string;
    last_name: string;
    birth_date: Date | string;
    phones?: PhoneCreateManyWithoutPhonesInput | null;
    depots?: DepotCreateManyWithoutDepotsInput | null;
    ratings?: RatingCreateManyWithoutRatingsInput | null;
    rentedTools?: RentedToolCreateManyWithoutRentedToolsInput | null;
};
export declare type UserUpdateWithoutEmailsDataInput = {
    id?: string | null;
    password_hash?: string | null;
    email?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    birth_date?: Date | string | null;
    phones?: PhoneUpdateManyWithoutOwnerInput | null;
    depots?: DepotUpdateManyWithoutOwnerInput | null;
    ratings?: RatingUpdateManyWithoutUserInput | null;
    rentedTools?: RentedToolUpdateManyWithoutRenterInput | null;
};
export declare type UserUpsertWithoutEmailsInput = {
    update: UserUpdateWithoutEmailsDataInput;
    create: UserCreateWithoutEmailsInput;
};
export declare type UserUpdateOneRequiredWithoutEmailsInput = {
    create?: UserCreateWithoutEmailsInput | null;
    connect?: UserWhereUniqueInput | null;
    update?: UserUpdateWithoutEmailsDataInput | null;
    upsert?: UserUpsertWithoutEmailsInput | null;
};
export declare type EmailUpdateInput = {
    id?: string | null;
    address?: string | null;
    purpose?: string | null;
    owner?: UserUpdateOneRequiredWithoutEmailsInput | null;
};
export declare type EmailUpdateManyMutationInput = {
    id?: string | null;
    address?: string | null;
    purpose?: string | null;
};
export declare type PhoneCreateInput = {
    id?: string | null;
    num: string;
    purpose?: string | null;
    owner: UserCreateOneWithoutOwnerInput;
};
export declare type UserCreateWithoutPhonesInput = {
    id?: string | null;
    password_hash: string;
    email: string;
    first_name: string;
    last_name: string;
    birth_date: Date | string;
    emails?: EmailCreateManyWithoutEmailsInput | null;
    depots?: DepotCreateManyWithoutDepotsInput | null;
    ratings?: RatingCreateManyWithoutRatingsInput | null;
    rentedTools?: RentedToolCreateManyWithoutRentedToolsInput | null;
};
export declare type UserUpdateWithoutPhonesDataInput = {
    id?: string | null;
    password_hash?: string | null;
    email?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    birth_date?: Date | string | null;
    emails?: EmailUpdateManyWithoutOwnerInput | null;
    depots?: DepotUpdateManyWithoutOwnerInput | null;
    ratings?: RatingUpdateManyWithoutUserInput | null;
    rentedTools?: RentedToolUpdateManyWithoutRenterInput | null;
};
export declare type UserUpsertWithoutPhonesInput = {
    update: UserUpdateWithoutPhonesDataInput;
    create: UserCreateWithoutPhonesInput;
};
export declare type UserUpdateOneRequiredWithoutPhonesInput = {
    create?: UserCreateWithoutPhonesInput | null;
    connect?: UserWhereUniqueInput | null;
    update?: UserUpdateWithoutPhonesDataInput | null;
    upsert?: UserUpsertWithoutPhonesInput | null;
};
export declare type PhoneUpdateInput = {
    id?: string | null;
    num?: string | null;
    purpose?: string | null;
    owner?: UserUpdateOneRequiredWithoutPhonesInput | null;
};
export declare type PhoneUpdateManyMutationInput = {
    id?: string | null;
    num?: string | null;
    purpose?: string | null;
};
export declare type UserCreateWithoutRatingsInput = {
    id?: string | null;
    password_hash: string;
    email: string;
    first_name: string;
    last_name: string;
    birth_date: Date | string;
    emails?: EmailCreateManyWithoutEmailsInput | null;
    phones?: PhoneCreateManyWithoutPhonesInput | null;
    depots?: DepotCreateManyWithoutDepotsInput | null;
    rentedTools?: RentedToolCreateManyWithoutRentedToolsInput | null;
};
export declare type UserCreateOneWithoutUserInput = {
    create?: UserCreateWithoutRatingsInput | null;
    connect?: UserWhereUniqueInput | null;
};
export declare type RatingCreateInput = {
    id?: string | null;
    point: number;
    type: RatingType;
    comment?: string | null;
    user: UserCreateOneWithoutUserInput;
};
export declare type UserUpdateWithoutRatingsDataInput = {
    id?: string | null;
    password_hash?: string | null;
    email?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    birth_date?: Date | string | null;
    emails?: EmailUpdateManyWithoutOwnerInput | null;
    phones?: PhoneUpdateManyWithoutOwnerInput | null;
    depots?: DepotUpdateManyWithoutOwnerInput | null;
    rentedTools?: RentedToolUpdateManyWithoutRenterInput | null;
};
export declare type UserUpsertWithoutRatingsInput = {
    update: UserUpdateWithoutRatingsDataInput;
    create: UserCreateWithoutRatingsInput;
};
export declare type UserUpdateOneRequiredWithoutRatingsInput = {
    create?: UserCreateWithoutRatingsInput | null;
    connect?: UserWhereUniqueInput | null;
    update?: UserUpdateWithoutRatingsDataInput | null;
    upsert?: UserUpsertWithoutRatingsInput | null;
};
export declare type RatingUpdateInput = {
    id?: string | null;
    point?: number | null;
    type?: RatingType | null;
    comment?: string | null;
    user?: UserUpdateOneRequiredWithoutRatingsInput | null;
};
export declare type RatingUpdateManyMutationInput = {
    id?: string | null;
    point?: number | null;
    type?: RatingType | null;
    comment?: string | null;
};
export declare type DepotCreateInput = {
    id?: string | null;
    address_1: string;
    address_2?: string | null;
    city: string;
    state: string;
    zipcode: string;
    owner: UserCreateOneWithoutOwnerInput;
    tools?: ToolCreateManyWithoutToolsInput | null;
};
export declare type DepotUpdateInput = {
    id?: string | null;
    address_1?: string | null;
    address_2?: string | null;
    city?: string | null;
    state?: string | null;
    zipcode?: string | null;
    owner?: UserUpdateOneRequiredWithoutDepotsInput | null;
    tools?: ToolUpdateManyWithoutDepotInput | null;
};
export declare type DepotUpdateManyMutationInput = {
    id?: string | null;
    address_1?: string | null;
    address_2?: string | null;
    city?: string | null;
    state?: string | null;
    zipcode?: string | null;
};
export declare type ToolCreateInput = {
    id?: string | null;
    title: string;
    category: string;
    description: string;
    price: number;
    depot: DepotCreateOneWithoutDepotInput;
    pictures?: ToolPictureCreateManyWithoutPicturesInput | null;
    rentedTools?: RentedToolCreateManyWithoutRentedToolsInput | null;
};
export declare type ToolUpdateInput = {
    id?: string | null;
    title?: string | null;
    category?: string | null;
    description?: string | null;
    price?: number | null;
    depot?: DepotUpdateOneRequiredWithoutToolsInput | null;
    pictures?: ToolPictureUpdateManyWithoutToolInput | null;
    rentedTools?: RentedToolUpdateManyWithoutToolInput | null;
};
export declare type ToolUpdateManyMutationInput = {
    id?: string | null;
    title?: string | null;
    category?: string | null;
    description?: string | null;
    price?: number | null;
};
export declare type ToolPictureCreateInput = {
    id?: string | null;
    image: string;
    description?: string | null;
    tool: ToolCreateOneWithoutToolInput;
};
export declare type ToolCreateWithoutPicturesInput = {
    id?: string | null;
    title: string;
    category: string;
    description: string;
    price: number;
    depot: DepotCreateOneWithoutDepotInput;
    rentedTools?: RentedToolCreateManyWithoutRentedToolsInput | null;
};
export declare type ToolUpdateWithoutPicturesDataInput = {
    id?: string | null;
    title?: string | null;
    category?: string | null;
    description?: string | null;
    price?: number | null;
    depot?: DepotUpdateOneRequiredWithoutToolsInput | null;
    rentedTools?: RentedToolUpdateManyWithoutToolInput | null;
};
export declare type ToolUpsertWithoutPicturesInput = {
    update: ToolUpdateWithoutPicturesDataInput;
    create: ToolCreateWithoutPicturesInput;
};
export declare type ToolUpdateOneRequiredWithoutPicturesInput = {
    create?: ToolCreateWithoutPicturesInput | null;
    connect?: ToolWhereUniqueInput | null;
    update?: ToolUpdateWithoutPicturesDataInput | null;
    upsert?: ToolUpsertWithoutPicturesInput | null;
};
export declare type ToolPictureUpdateInput = {
    id?: string | null;
    image?: string | null;
    description?: string | null;
    tool?: ToolUpdateOneRequiredWithoutPicturesInput | null;
};
export declare type ToolPictureUpdateManyMutationInput = {
    id?: string | null;
    image?: string | null;
    description?: string | null;
};
export declare type RentedToolCreateInput = {
    id?: string | null;
    start_date: Date | string;
    end_date: Date | string;
    tool: ToolCreateOneWithoutToolInput;
    renter: UserCreateOneWithoutRenterInput;
};
export declare type RentedToolUpdateInput = {
    id?: string | null;
    start_date?: Date | string | null;
    end_date?: Date | string | null;
    tool?: ToolUpdateOneRequiredWithoutRentedToolsInput | null;
    renter?: UserUpdateOneRequiredWithoutRentedToolsInput | null;
};
export declare type RentedToolUpdateManyMutationInput = {
    id?: string | null;
    start_date?: Date | string | null;
    end_date?: Date | string | null;
};
export declare type StringFilter = {
    equals?: string | null;
    not?: string | StringFilter | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string | null;
    lte?: string | null;
    gt?: string | null;
    gte?: string | null;
    contains?: string | null;
    startsWith?: string | null;
    endsWith?: string | null;
};
export declare type NullableStringFilter = {
    equals?: string | null | null;
    not?: string | null | NullableStringFilter | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string | null;
    lte?: string | null;
    gt?: string | null;
    gte?: string | null;
    contains?: string | null;
    startsWith?: string | null;
    endsWith?: string | null;
};
export declare type DateTimeFilter = {
    equals?: Date | string | null;
    not?: Date | string | DateTimeFilter | null;
    in?: Enumerable<Date | string> | null;
    notIn?: Enumerable<Date | string> | null;
    lt?: Date | string | null;
    lte?: Date | string | null;
    gt?: Date | string | null;
    gte?: Date | string | null;
};
export declare type FloatFilter = {
    equals?: number | null;
    not?: number | FloatFilter | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number | null;
    lte?: number | null;
    gt?: number | null;
    gte?: number | null;
};
export declare type ToolPictureFilter = {
    every?: ToolPictureWhereInput | null;
    some?: ToolPictureWhereInput | null;
    none?: ToolPictureWhereInput | null;
};
export declare type RentedToolFilter = {
    every?: RentedToolWhereInput | null;
    some?: RentedToolWhereInput | null;
    none?: RentedToolWhereInput | null;
};
export declare type ToolFilter = {
    every?: ToolWhereInput | null;
    some?: ToolWhereInput | null;
    none?: ToolWhereInput | null;
};
export declare type IntFilter = {
    equals?: number | null;
    not?: number | IntFilter | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number | null;
    lte?: number | null;
    gt?: number | null;
    gte?: number | null;
};
export declare type RatingTypeFilter = {};
export declare type EmailFilter = {
    every?: EmailWhereInput | null;
    some?: EmailWhereInput | null;
    none?: EmailWhereInput | null;
};
export declare type PhoneFilter = {
    every?: PhoneWhereInput | null;
    some?: PhoneWhereInput | null;
    none?: PhoneWhereInput | null;
};
export declare type DepotFilter = {
    every?: DepotWhereInput | null;
    some?: DepotWhereInput | null;
    none?: DepotWhereInput | null;
};
export declare type RatingFilter = {
    every?: RatingWhereInput | null;
    some?: RatingWhereInput | null;
    none?: RatingWhereInput | null;
};
export declare type UserOrderByInput = {
    id?: OrderByArg | null;
    password_hash?: OrderByArg | null;
    email?: OrderByArg | null;
    first_name?: OrderByArg | null;
    last_name?: OrderByArg | null;
    birth_date?: OrderByArg | null;
};
export declare type EmailOrderByInput = {
    id?: OrderByArg | null;
    address?: OrderByArg | null;
    purpose?: OrderByArg | null;
};
export declare type PhoneOrderByInput = {
    id?: OrderByArg | null;
    num?: OrderByArg | null;
    purpose?: OrderByArg | null;
};
export declare type DepotOrderByInput = {
    id?: OrderByArg | null;
    address_1?: OrderByArg | null;
    address_2?: OrderByArg | null;
    city?: OrderByArg | null;
    state?: OrderByArg | null;
    zipcode?: OrderByArg | null;
};
export declare type ToolOrderByInput = {
    id?: OrderByArg | null;
    title?: OrderByArg | null;
    category?: OrderByArg | null;
    description?: OrderByArg | null;
    price?: OrderByArg | null;
};
export declare type ToolPictureOrderByInput = {
    id?: OrderByArg | null;
    image?: OrderByArg | null;
    description?: OrderByArg | null;
};
export declare type RentedToolOrderByInput = {
    id?: OrderByArg | null;
    start_date?: OrderByArg | null;
    end_date?: OrderByArg | null;
};
export declare type RatingOrderByInput = {
    id?: OrderByArg | null;
    point?: OrderByArg | null;
    type?: OrderByArg | null;
    comment?: OrderByArg | null;
};
/**
 * Batch Payload for updateMany & deleteMany
 */
export declare type BatchPayload = {
    count: number;
};
/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
