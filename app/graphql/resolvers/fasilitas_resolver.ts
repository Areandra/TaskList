import Fasilitas from "#models/fasilita";
import { Arg, Query, Resolver } from "@foadonis/graphql";


@Resolver(Fasilitas)
export default class FasilitasResolver {
    @Query(() => [Fasilitas]) 
    async semuaFasilitas(){
        return await Fasilitas.query()
    }

    @Query(() => Fasilitas) 
    async fasilitas(@Arg('id') id: number) {
        return await Fasilitas.findOrFail(id);
    }
    
}

