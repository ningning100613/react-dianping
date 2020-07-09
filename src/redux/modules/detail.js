import { combineReducers } from "redux"
import url from "../../utils/url"
import { FETCH_DATA } from "../middleware/api"
import { schema as shopSchema, getShopById } from "./entities/shops"
import { schema as productSchema, getProductDetail, getProductById } from "./entities/products"
//聚合对应页面中的领域实体，包含页面中用到的UI，纯应用前端的状态的维护


//2、创建action types
export const types = {
    //获取产品详情
    FETCH_PRODUCT_DETAIL_REQUEST: "DETAIL/FETCH_PRODUCT_DETAIL_REQUEST",
    FETCH_PRODUCT_DETAIL_SUCCESS: "DETAIL/FETCH_PRODUCT_DETAIL_SUCCESS",
    FETCH_PRODUCT_DETAIL_FAILURE: "DETAIL/FETCH_PRODUCT_DETAIL_FAILURE",

    //获取关联店铺
    FETCH_SHOP_REQUEST: "DETAIL/FETCH_SHOP_REQUEST",
    FETCH_SHOP_SUCCESS: "DETAIL/FETCH_SHOP_SUCCESS",
    FETCH_SHOP_FAILURE: "DETAIL/FETCH_SHOP_FAILURE",
}

//1、创建State
const initialState = {
    product: {
        isFetching: false,
        id: null
    },
    relatedShop: {
        isFetching: false,
        id: null
    }
}

//3、定义具体的action create
export const actions = {
    //获取商品详情
    loadProductDetail: id => {
        return (dispatch, getState) => {

        //缓存机制 
        const product = getProductDetail(getState(), id)
        if (product) {
            //如果有商品数据 返回获取商品详情成功状态
            return dispatch(fetchProductDetailSuccess(id))
        }
        //缓存机制 end


            const endpoint = url.getProductDetail(id);
            return dispatch(fetchProductDetail(endpoint, id));
        }
    },

    // 获取店铺信息
    loadShopById: id => {
        return (dispatch, getState) => {
            const shop = getShopById(getState(), id);
            if (shop) {
                //如果有店铺数据 返回获取店铺详情成功状态
                return dispatch(fetchShopSuccess(id))
            }
            const endpoint = url.getShopById(id);
            return dispatch(fetchShopById(endpoint, id));
        }
    }
}
//4
const fetchProductDetail = (endpoint,id) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_PRODUCT_DETAIL_REQUEST,
            types.FETCH_PRODUCT_DETAIL_SUCCESS,
            types.FETCH_PRODUCT_DETAIL_FAILURE,
        ],
        endpoint,
        schema: productSchema
    },
    id
})
const fetchShopById = (endpoint, id) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_SHOP_REQUEST,
            types.FETCH_SHOP_SUCCESS,
            types.FETCH_SHOP_FAILURE,
        ],
        endpoint,
        schema: shopSchema
    },
    id
})


const fetchProductDetailSuccess = (id) => ({
    type: types.FETCH_PRODUCT_DETAIL_SUCCESS,
    id,
})
const fetchShopSuccess = (id) => ({
    type: types.FETCH_SHOP_SUCCESS,
    id,
})

//5定义reducer
const product = (state = initialState.product, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCT_DETAIL_REQUEST:
            return { ...state, isFetching: true };
        case types.FETCH_PRODUCT_DETAIL_SUCCESS:
            return { ...state, id: action.id, isFetching: false };
        case types.FETCH_PRODUCT_DETAIL_FAILURE:
            return { ...state, isFetching: false, id: null };
        default:
            return state;
    }
}

const relatedShop = (state = initialState.relatedShop, action) => {
    switch (action.type) {
        case types.FETCH_SHOP_REQUEST:
            return { ...state, isFetching: true };
        case types.FETCH_SHOP_SUCCESS:
            return { ...state, id: action.id, isFetching: false };
        case types.FETCH_SHOP_FAILURE:
            return { ...state, isFetching: false, id: null };
        default:
            return state;
    }
}


const reducer = combineReducers({
    product,
    relatedShop
})

export default reducer

//6 selectors
//获取商品详情
export const getProduct = (state, id) => {
    return getProductDetail(state,id)
}

//获取管理的店铺信息
export const getRelatedShop = (state,productId) => {
    const product = getProductById(state,productId);
    let shopId = product ? product.nearestShop : null;
    if(shopId){
        return getShopById(state, shopId) 
    }
    return null
}





