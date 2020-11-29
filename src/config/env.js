/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * credential: 跨域
 *
 */

const dev = {
    routerMode: 'history', // hash
    /* beta */
    //baseUrl: `https://yunservice.inca.com.cn/dzsf`, // 正式
     baseUrl: `https://service.he-mingtang.com/`, // 测试
    // baseUrl: `https://dzsf.inca.com.cn`,         // 自定义反向代理 http://192.9.200.178:9380/
    credential: true,
};

const prod = {
    ...dev,
};

export default process.env.NODE_ENV === 'development' ? dev : prod;
