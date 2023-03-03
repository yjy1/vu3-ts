interface listInt{
    roleName:string,
    roleDesc:string,
}
export interface editInt{
    id:number,
    roleName:string,
    roleDesc:string,
    isShow:boolean,
    formLabelWidth:number,
}
export class rolesData{
    list:listInt[] = []
    editForm:editInt = {
        id:0,
        roleName:'',
        roleDesc:'',
        isShow: false,
        formLabelWidth:80
    }
    addForm:editInt = {
        id:0,
        roleName:'',
        roleDesc:'',
        isShow: false,
        formLabelWidth:80
    }
}