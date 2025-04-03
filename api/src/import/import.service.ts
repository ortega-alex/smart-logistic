import { ImportHistory } from './entity/ImportHistory';
import { ImportState } from './entity/ImportState';
import { ImportHistory as ImportHistoryInterface } from './interface/Import';

export const getAll = async () => await ImportState.find();

export const getImportStateById = async (id: number) => await ImportState.findOneBy({ id });

export const addHistory = async (history: ImportHistoryInterface) => {
    const newHistory = new ImportHistory();
    newHistory.description = history.description;
    newHistory.path = history.path;
    newHistory.is_visible_customer = history.is_visible_customer;
    newHistory.vehicle = history.vehicle;
    newHistory.importState = history.importState;
    if (history.user) newHistory.user = history.user;
    if (history.customer) newHistory.customer = history.customer;
    await newHistory.save();
    return newHistory;
};
