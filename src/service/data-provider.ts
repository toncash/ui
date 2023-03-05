
export default interface DataProvider<T>{
    add(order: T): Promise<T>;
    remove(id: number | string): Promise<T>;
    get(id: number | string): Promise<T>;
    getByUser(userId: number): Promise<T []>
    getByGeo(lat: number, lng: number): Promise<T []>
}