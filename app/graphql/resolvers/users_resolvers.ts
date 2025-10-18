import User from "#models/user";
import { Arg, Query, Resolver } from "@foadonis/graphql";


@Resolver(User)
export default class UserResolver {
    @Query(() => [User]) 
    async Users(){
        return await User.query()
    }

    @Query(() => User) 
    async User(@Arg('id') id: number) {
        return await User.findOrFail(id);
    }
    
}

