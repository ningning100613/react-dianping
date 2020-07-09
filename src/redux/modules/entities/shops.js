import createReducer from '../../../utils/createReducer'
export const schema = {
    name:'shops',
    id:'id'
} 

const reducer = createReducer(schema.name)

export default reducer

// selectors 判断是否包含了店铺详情数据
export const getShopById = (state, id) => {
    const shop = state.entities.shops[id];
    return shop;
  };