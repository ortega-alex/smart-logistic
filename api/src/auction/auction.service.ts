import { Auction } from './entity/Auction';
import { Auction as AuctionInterface } from './interface/Auction';

export const getAll = async () => await Auction.find({ relations: { state: true, headquarter: true } });

export const getById = async (id: number) => await Auction.findOne({ where: { id }, relations: { state: true, headquarter: true } });

export const add = async (auction: AuctionInterface) => {
    const newAuction = new Auction();
    newAuction.name = auction.name;
    newAuction.crane_rate = auction.crane_rate;
    newAuction.is_active = auction.is_active ?? true;
    newAuction.state = auction.state;
    newAuction.headquarter = auction.headquarter;
    await newAuction.save();
    return newAuction;
};

export const update = async (id: number, auction: AuctionInterface) => await Auction.update({ id: Number(id) }, auction);

export default {
    getAll,
    getById,
    add,
    update
};
