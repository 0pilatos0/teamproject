// const http = require('http')
// const httpProxy = require('http-proxy')

// const addresses = [
//     {
//         host:'localhost',
//         port:3001
//     }
// ]

// module.exports.Proxy = class{
//     #port
//     #proxyServers

//     /**
//      Create new proxy for redirecting clients to different servers
//     **/
//     constructor(port){
//         this.#port = port
//         this.#proxyServers = addresses.map(function (target) {
//             return new httpProxy.createProxyServer({
//                 target: target,
//                 ws: true
//             })
//         })
//     }

//     /**
//      Start the proxy
//      await it for synchronous 
//     **/
//     start(){
//         return new Promise((resolve, reject) => {
//             http.createServer((req, res) => {
//                 let proxy = this.#proxyServers.shift()
//                 proxy.web(req, res)
//                 this.#proxyServers.push(proxy)
//             }).listen(this.#port, () => {
//                 console.log("Proxy is running")
//                 console.log(`Listening on http://localhost:${this.#port}`)
//                 return resolve(true)
//             })
//         })
//     }
// }