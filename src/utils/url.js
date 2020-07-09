export default {
    //商品列表
    getProductList:(path,rowIndex,pageSize) => `/mock/products/${path}.json?rowIndex=${rowIndex}&pageSize=${pageSize}`,
    //商品详情
    getProductDetail: (id) => `/mock/product_detail/${id}.json`,
    //店铺信息
    getShopById: (id) => `/mock/shops/${id}.json`,
    //获取热门关键词
    getPopularKeywords: () => '/mock/keywords/popular.json',
    //根据输入获取相关关键词
    getRelatedKeywords: (text) => `/mock/keywords/related.json?keyword=${text}`,//根据关键字获取店铺列表
    getRelatedShops: (keyword) => `/mock/shops/related.json?keyword=${keyword}`,
    //获取订单数据
    getOrders: () => `/mock/orders/orders.json`, 

}