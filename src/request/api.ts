import service from '../request'

interface loginData {
    username: string,
    password: string
}
// 登录接口
export function login(data: loginData) {
    return service({
        url: '/login',
        method: 'post',
        data
    })
}
// 商品列表接口
export function getGoodsList(params: {}) {
    return service({
        url: '/goods',
        method: 'get',
        params
    })
}
// 用户列表接口
export function getUserList(params: {}) {
    return service({
        url: '/users',
        method: 'get',
        params
    })
}
// 修改用户接口
export function updateUser(id: number, params:{}) {
    return service({
        url: `users/${id}`,
        method: 'put',
        params
    })
}
export function deleteUser(id: number){
    return service({
        url:`users/${id}`,
        method:'delete'
    })
}
// 查询用户，根据id
export function getUserById(id: number) {
    return service({
        url: `users/${id}`,
    })
}
/*  角色列表 */
export function getRoleList() {
    return service({
        url: '/roles'
    })
}
// 根据id查询角色
export function getRoleById(id:number){
    return service({
        url:`roles/${id}`
    })
}
export function updateRole(id:number,params:{}){
    return service({
        url:`roles/${id}`,
        method:'put',
        params
    })
}
export function deleteRole(id:number){
    return service({
        url:`roles/${id}`,
        method:'delete'
    })
}
export function addRole(params:{}){
    return service({
        url:`roles`,
        method:'post',
        params
    })
}
/* 权限列表 */
export function getRightsList(type:string){
    return service({
        url:`rights/${type}`,
    })
}