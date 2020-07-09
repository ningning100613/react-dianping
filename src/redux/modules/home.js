import { combineReducers } from "redux"
import url from "../../utils/url";
import {FETCH_DATA} from "../middleware/api"
import {schema} from "./entities/products"
export const params = {
    PATH_LIKES:'likes',
    PATH_DISCOUNTS:'discounts',
    PATH_SIZE_LIKES:5,
    PATH_SIZE_DISCOUNTS:3
} 

//创建action types
export const types = {
  //获取猜你喜欢请求
  FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST",
  //获取猜你喜欢请求成功
  FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS",
  //获取猜你喜欢请求失败
  FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE",


  //获取超值特惠请求
  FETCH_DISCOUNTS_REQUEST: "HOME/FETCH_DISCOUNTS_REQUEST",
  //获取超值特惠请求成功
  FETCH_DISCOUNTS_SUCCESS: "HOME/FETCH_DISCOUNTS_SUCCESS",
  //获取超值特惠请求失败
  FETCH_DISCOUNTS_FAILURE: "HOME/FETCH_DISCOUNTS_FAILURE",

};

//创建初始state
const initialState = {
    //猜你喜欢
    likes:{
        //是否通过api获取数据
        isFetching:false,
        //当前获取数据的页码
        pageCount:0,
        //每个商品id
        ids:[]
    },
    //超值特惠
    discounts:{
        //是否通过api获取数据
        isFetching:false,
        //每个商品id
        ids:[]
    }
}

//创建actions
export const actions = {
    //加载猜你喜欢数据
    loadLikes:() => {
        return (dispatch,getState) => {
            const {pageCount} = getState().home.likes;
            const rowIndex = pageCount * params.PAGE_SIZE_LIKES;
            const endpoint = url.getProductList(
                params.PATH_LIKES,
                rowIndex,
                params.PATH_SIZE_LIKES
            )
            return dispatch(fetchLikes(endpoint))
        }
    },
    //加载超值特惠
    loadDiscounts:() => {
        return (dispatch,getState) => {
            //数据缓存机制
            const {ids} = getState().home.discounts
            if(ids.length > 0){
                return null
            }


            const endpoint = url.getProductList(
                params.PATH_DISCOUNTS,
                0,
                params.PAGE_SIZE_DISCOUNTS
            )
            return dispatch(fetchDiscounts(endpoint))
        }
    }
}

const fetchLikes = (endpoint) => ({
    [FETCH_DATA]:{
        types:[
            types.FETCH_LIKES_REQUEST,
            types.FETCH_LIKES_SUCCESS,
            types.FETCH_LIKES_FAILURE
        ],
        endpoint,
        schema  //领域实体结构
    }
})

const fetchDiscounts = (endpoint) => ({
    [FETCH_DATA]:{
        types:[
            types.FETCH_DISCOUNTS_REQUEST,
            types.FETCH_DISCOUNTS_SUCCESS,
            types.FETCH_DISCOUNTS_FAILURE
        ],
        endpoint,
        schema  //领域实体结构
    }
})


const likes = (state = initialState.likes,action) => {
    switch (action.type){
        case types.FETCH_LIKES_REQUEST:
            return {...state,isFetching:true};
        case types.FETCH_LIKES_SUCCESS:
            return {
                ...state,
                isFetching:false,
                pageCount:state.pageCount + 1,
                ids:state.ids.concat(action.response.ids)
            };
        case types.FETCH_LIKES_FAILURE:
            return {...state,isFetching:false};
        default:
            return state;
    }
}

const discounts = (state = initialState.likes,action) => {
    switch (action.type){
        case types.FETCH_DISCOUNTS_REQUEST:
            return {...state,isFetching:true};
        case types.FETCH_DISCOUNTS_SUCCESS:
            return {
                ...state,
                isFetching:false,
                ids:state.ids.concat(action.response.ids)
            };
        case types.FETCH_DISCOUNTS_FAILURE:
            return {...state,isFetching:false};
        default:
            return state;
    }
}




const reducer = combineReducers({
    likes,
    discounts
})

export default reducer;


//selectors
//获取猜你喜欢state
export const getLikes = state => {
    return state.home.likes.ids.map(id => {
        return state.entities.products[id]
    })
}

//获取特惠商品state
export const getDiscounts = state => {
    return state.home.discounts.ids.map(id => {
        return state.entities.products[id]
    })
} 

//猜你喜欢当前分页码
export const getPageCountOfLikes = state => {
    return state.home.likes.pageCount
  }

  //猜你喜欢请求状态
export const getIsFetching = state => {
    return state.home.likes.isFetching
  }