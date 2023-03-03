export interface searchInt {
    query: string,
    pagenum: number,
    pagesize: number,
}

interface listInt{
    id:number,
    username:string,
    mobile:string,
    email:string,
    create_time:boolean,
    mg_state:boolean,
    role_name:string,
}
export interface editInt{
    id:number,
    username:string,
    mobile:string,
    email:string,
    isShow:boolean,
}
// interface activeInt{
//     id:number,
//     username:string,
//     mobile:string,
//     email:string,
// }
export class userData {
    searchData: searchInt = {
        query: '',
        pagenum: 1,
        pagesize: 10,
    }
    list :listInt[] = []
    editForm:editInt={
        id:0,
        username:'',
        mobile:'',
        email:'',
        isShow:false
    }
    
}