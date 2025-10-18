import Booking from "#models/booking";
import { Arg, Query, Resolver } from "@foadonis/graphql";


@Resolver(Booking)
export default class BookingsResolver {
    @Query(() => [Booking]) 
    async Bookings(){
        return await Booking.query()
    }

    @Query(() => Booking) 
    async Booking(@Arg('id') id: number) {
        return await Booking.findOrFail(id);
    }
    
}

