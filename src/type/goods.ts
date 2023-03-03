interface searchDataInt {
    query: string,
    pagenum:number,
    pagesize:number,
    total:number,
}
interface listInt{

}
export default class goodsDataClass {
    searchData: searchDataInt = {
        query: '',
        pagenum: 1,
        pagesize: 10,
        total: 0,
    }
    list:listInt[] = []
}