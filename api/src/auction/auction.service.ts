import { Auction } from './entity/Auction';
import { Auction as AuctionInterface } from './interface/Auction';

export const getAll = async () => await Auction.find();

export const getById = async (id: number) => await Auction.findOne({ where: { id }, relations: { state: true, sede: true } });

export const add = async (auction: AuctionInterface) => {
    const newAuction = new Auction();
    newAuction.name = auction.name;
    newAuction.crane_rate = auction.crane_rate;
    newAuction.is_active = auction.is_active ?? true;
    newAuction.state = auction.state;
    newAuction.sede = auction.sede;
    await newAuction.save();
    return newAuction;
};

export const update = async (id: number, auction: AuctionInterface) => await Auction.update({ id: Number(id) }, auction);
