import { TableLike } from "./tablelike";


export interface ItemsTableProps{
 
    title:string
    id:number
}

// -> Creating new Postgres table named 'items'
export const ItemsTable = new TableLike<ItemsTableProps>('itemtable')